package com.ticket;

import com.ticket.main.RazorpayGateway;
import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class RazorpayGatewayTest {

    @Test
    public void verifiesHmacSha256Signature() {
        RazorpayGateway gateway = new RazorpayGateway("rzp_test_key", "key");
        assertTrue(gateway.verifySignature(
            "order_123", "pay_456",
            "779bb8ca28b8ca4e789f71431f8e65384e7c843b32a57625058514aaff6ad9fb"));
    }

    @Test
    public void rejectsModifiedSignaturePayload() {
        RazorpayGateway gateway = new RazorpayGateway("rzp_test_key", "key");
        assertFalse(gateway.verifySignature(
            "order_123", "pay_456",
            "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8"));
    }
}
