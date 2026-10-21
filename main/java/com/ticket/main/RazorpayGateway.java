package com.ticket.main;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public final class RazorpayGateway {

    private static final String API_URL = "https://api.razorpay.com/v1";
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private final String keyId;
    private final String keySecret;

    RazorpayGateway() {
        this(System.getenv("RAZORPAY_KEY_ID"),
            System.getenv("RAZORPAY_KEY_SECRET"));
    }

    public RazorpayGateway(String keyId, String keySecret) {
        this.keyId = keyId == null ? "" : keyId.trim();
        this.keySecret = keySecret == null ? "" : keySecret.trim();
    }

    boolean isConfigured() {
        return !keyId.isEmpty() && !keySecret.isEmpty();
    }

    String getKeyId() {
        return keyId;
    }

    JsonNode createOrder(long amountPaise, String receipt)
            throws PaymentGatewayException {
        requireConfigured();
        JsonNode body = MAPPER.createObjectNode()
            .put("amount", amountPaise)
            .put("currency", "INR")
            .put("receipt", receipt);
        return call("POST", "/orders", body);
    }

    JsonNode fetchPayment(String paymentId) throws PaymentGatewayException {
        requireConfigured();
        return call("GET", "/payments/" + paymentId, null);
    }

    public boolean verifySignature(
            String orderId, String paymentId, String signature) {
        if (!isConfigured() || orderId == null || paymentId == null
                || signature == null) {
            return false;
        }
        try {
            String payload = orderId + "|" + paymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(
                keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] digest = mac.doFinal(
                payload.getBytes(StandardCharsets.UTF_8));
            StringBuilder expected = new StringBuilder(digest.length * 2);
            for (byte value : digest) {
                expected.append(String.format("%02x", value & 0xff));
            }
            return MessageDigest.isEqual(
                expected.toString().getBytes(StandardCharsets.US_ASCII),
                signature.toLowerCase(java.util.Locale.ROOT)
                    .getBytes(StandardCharsets.US_ASCII));
        } catch (Exception e) {
            throw new IllegalStateException(
                "Could not verify the Razorpay payment signature.", e);
        }
    }

    private JsonNode call(String method, String path, JsonNode body)
            throws PaymentGatewayException {
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) URI.create(API_URL + path)
                .toURL().openConnection();
            connection.setRequestMethod(method);
            connection.setConnectTimeout(8000);
            connection.setReadTimeout(12000);
            String credentials = keyId + ":" + keySecret;
            connection.setRequestProperty("Authorization", "Basic "
                + Base64.getEncoder().encodeToString(
                    credentials.getBytes(StandardCharsets.UTF_8)));
            connection.setRequestProperty("Content-Type", "application/json");
            if (body != null) {
                connection.setDoOutput(true);
                byte[] bytes = MAPPER.writeValueAsBytes(body);
                try (OutputStream output = connection.getOutputStream()) {
                    output.write(bytes);
                }
            }
            int status = connection.getResponseCode();
            InputStream stream = status >= 200 && status < 300
                ? connection.getInputStream() : connection.getErrorStream();
            byte[] response = readFully(stream);
            JsonNode result = MAPPER.readTree(response);
            if (status < 200 || status >= 300) {
                JsonNode description = result.path("error").path("description");
                String message = description.isTextual()
                    ? description.asText()
                    : "Razorpay rejected the payment request.";
                throw new PaymentGatewayException(message);
            }
            return result;
        } catch (PaymentGatewayException e) {
            throw e;
        } catch (Exception e) {
            throw new PaymentGatewayException(
                "Razorpay could not be reached. The reservation remains pending.",
                e);
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private static byte[] readFully(InputStream stream) throws IOException {
        if (stream == null) return new byte[0];
        try (InputStream input = stream;
             ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096];
            int count;
            while ((count = input.read(buffer)) != -1) {
                output.write(buffer, 0, count);
            }
            return output.toByteArray();
        }
    }

    private void requireConfigured() throws PaymentGatewayException {
        if (!isConfigured()) {
            throw new PaymentGatewayException(
                "Razorpay is not configured. Set RAZORPAY_KEY_ID and "
                + "RAZORPAY_KEY_SECRET on the Java API server.");
        }
    }
}
