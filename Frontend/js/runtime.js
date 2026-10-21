/* GoBus — tiny UI runtime (components, hooks, DOM patching) + inline icon set.
   No external libraries required: works by opening index.html directly. */
(function (global) {
  'use strict';

  /* ---------- virtual nodes ---------- */
  var Fragment = { __fragment: true };
  function normKids(list, out) {
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (Array.isArray(c)) out.push({ type: Fragment, props: {}, key: null, children: normKids(c, []) });
      else if (c === false || c === true || c === undefined) out.push(null);
      else out.push(c);
    }
    return out;
  }
  function createElement(type, props) {
    props = props || {};
    var rest = Array.prototype.slice.call(arguments, 2);
    var kids = rest.length ? rest : (props.children !== undefined ? [props.children] : []);
    var children = normKids(kids, []);
    var p = {};
    for (var k in props) if (k !== 'children') p[k] = props[k];
    if (typeof type === 'function') p.children = children.length === 1 ? children[0] : children;
    return { type: type, props: p, key: props.key != null ? props.key : null, children: children };
  }

  /* ---------- hooks ---------- */
  var current = null, hookIdx = 0, effects = [], scheduled = false, rootRender = null;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    Promise.resolve().then(function () { scheduled = false; if (rootRender) rootRender(); });
  }
  function useState(init) {
    var inst = current, i = hookIdx++;
    if (!(i in inst.hooks)) inst.hooks[i] = { v: typeof init === 'function' ? init() : init };
    var h = inst.hooks[i];
    if (!h.set) h.set = function (nv) {
      var val = typeof nv === 'function' ? nv(h.v) : nv;
      if (!Object.is(val, h.v)) { h.v = val; schedule(); }
    };
    return [h.v, h.set];
  }
  function depsChanged(a, b) {
    if (!a || !b) return true;
    if (a.length !== b.length) return true;
    for (var i = 0; i < a.length; i++) if (!Object.is(a[i], b[i])) return true;
    return false;
  }
  function useEffect(fn, deps) {
    var inst = current, i = hookIdx++;
    var h = inst.hooks[i];
    if (!h) { h = inst.hooks[i] = { deps: undefined, cleanup: null, first: true }; }
    if (h.first || depsChanged(h.deps, deps)) {
      h.first = false; h.deps = deps;
      effects.push(function () { if (h.cleanup) h.cleanup(); var r = fn(); h.cleanup = typeof r === 'function' ? r : null; });
    }
  }
  function useMemo(fn, deps) {
    var inst = current, i = hookIdx++;
    var h = inst.hooks[i];
    if (!h || depsChanged(h.deps, deps)) { h = inst.hooks[i] = { deps: deps, v: fn() }; }
    return h.v;
  }
  function useCallback(fn, deps) { return useMemo(function () { return fn; }, deps); }
  function useRef(init) { var inst = current, i = hookIdx++; if (!(i in inst.hooks)) inst.hooks[i] = { current: init }; return inst.hooks[i]; }

  /* ---------- DOM helpers ---------- */
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var SVG_KEEP = { viewBox: 1, preserveAspectRatio: 1, gradientUnits: 1, gradientTransform: 1, patternUnits: 1, markerWidth: 1, markerHeight: 1, refX: 1, refY: 1, pathLength: 1, stdDeviation: 1 };
  var UNITLESS = { opacity: 1, zIndex: 1, flex: 1, flexGrow: 1, flexShrink: 1, lineHeight: 1, fontWeight: 1, order: 1, zoom: 1 };
  var EVENT_MAP = { onChange: 'input', onDoubleClick: 'dblclick' };

  function setStyle(el, oldS, newS) {
    oldS = oldS || {}; newS = newS || {};
    if (typeof newS === 'string') { el.style.cssText = newS; return; }
    for (var k in oldS) if (!(k in newS)) { if (k.indexOf('--') === 0) el.style.removeProperty(k); else el.style[k] = ''; }
    for (var n in newS) {
      var v = newS[n];
      if (v == null || v === false) v = '';
      else if (typeof v === 'number' && !UNITLESS[n] && n.indexOf('--') !== 0) v = v + 'px';
      if (n.indexOf('--') === 0) el.style.setProperty(n, v); else el.style[n] = v;
    }
  }
  function setProp(el, name, val, oldVal, svg) {
    if (name === 'key' || name === 'children' || name === 'ref') return;
    if (name === 'style') return setStyle(el, oldVal, val);
    if (name.length > 2 && name[0] === 'o' && name[1] === 'n' && name[2] === name[2].toUpperCase()) {
      var ev = EVENT_MAP[name] || name.slice(2).toLowerCase();
      var map = el.__h || (el.__h = {});
      if (!(ev in map)) el.addEventListener(ev, function (e) { var f = el.__h[ev]; if (f) f(e); });
      map[ev] = val;
      return;
    }
    if (name === 'className') { if (svg) el.setAttribute('class', val == null ? '' : val); else el.className = val == null ? '' : val; return; }
    if (name === 'htmlFor') name = 'for';
    if (!svg && (name === 'checked' || name === 'indeterminate')) { el[name] = !!val; return; }
    if (!svg && name === 'defaultChecked') { el.checked = !!val; return; }
    if (!svg && name === 'defaultValue') { el.value = val; return; }
    if (!svg && name === 'value') return; // applied after children
    if (svg && !SVG_KEEP[name]) name = name.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); });
    if (val === false || val == null) el.removeAttribute(name);
    else el.setAttribute(name, val === true ? '' : String(val));
  }
  function applyValue(el, props) {
    if (!('value' in props)) return;
    var v = props.value == null ? '' : String(props.value);
    if (el.tagName === 'SELECT' || el.value !== v) el.value = v;
  }

  /* ---------- instances (mount / patch / unmount) ---------- */
  function sameKind(inst, v) {
    if (typeof v === 'string' || typeof v === 'number') return inst.kind === 'text';
    return inst.kind !== 'text' && inst.vnode.type === v.type && inst.vnode.key === v.key;
  }
  function nodesOf(inst, out) {
    if (!inst) return out;
    if (inst.kind === 'text' || inst.kind === 'el') out.push(inst.dom);
    else for (var i = 0; i < inst.kids.length; i++) nodesOf(inst.kids[i], out);
    return out;
  }
  function syncDom(parent, kids) {
    var want = [];
    for (var i = 0; i < kids.length; i++) nodesOf(kids[i], want);
    var ref = parent.firstChild;
    for (var j = 0; j < want.length; j++) {
      var n = want[j];
      if (n === ref) ref = ref.nextSibling;
      else parent.insertBefore(n, ref);
    }
    while (ref) { var nx = ref.nextSibling; parent.removeChild(ref); ref = nx; }
  }
  function unmount(inst) {
    if (!inst) return;
    if (inst.kind === 'comp') {
      for (var k in inst.hooks) { var h = inst.hooks[k]; if (h && h.cleanup) { try { h.cleanup(); } catch (e) {} } }
    }
    if (inst.kids) for (var i = 0; i < inst.kids.length; i++) unmount(inst.kids[i]);
    if (inst.ref) { if (typeof inst.ref === 'function') inst.ref(null); else inst.ref.current = null; }
  }
  function patchList(oldKids, newV, svg) {
    var keyed = {}, used = [], i, o;
    for (i = 0; i < oldKids.length; i++) { o = oldKids[i]; if (o && o.vnode && o.vnode.key != null) keyed[o.vnode.key] = i; }
    var res = [];
    for (i = 0; i < newV.length; i++) {
      var v = newV[i];
      if (v === null) { res.push(null); continue; }
      var cand = null, ci = -1;
      var key = (typeof v === 'object') ? v.key : null;
      if (key != null) { if (key in keyed) { ci = keyed[key]; cand = oldKids[ci]; } }
      else { o = oldKids[i]; if (o && !used[i] && (!o.vnode || o.vnode.key == null)) { cand = o; ci = i; } }
      if (cand && !used[ci] && sameKind(cand, v)) { used[ci] = true; res.push(patch(cand, v, svg)); }
      else res.push(mount(v, svg));
    }
    for (i = 0; i < oldKids.length; i++) if (oldKids[i] && !used[i]) unmount(oldKids[i]);
    return res;
  }
  function mount(v, svg) {
    if (typeof v === 'string' || typeof v === 'number') return { kind: 'text', dom: document.createTextNode(String(v)), text: String(v) };
    var t = v.type, inst;
    if (typeof t === 'function') {
      inst = { kind: 'comp', vnode: v, hooks: {}, kids: [] };
      return renderComp(inst, v, svg);
    }
    if (t === Fragment) {
      inst = { kind: 'frag', vnode: v, kids: [] };
      inst.kids = patchList([], v.children, svg);
      return inst;
    }
    var isSvg = svg || t === 'svg';
    var el = isSvg ? document.createElementNS(SVG_NS, t) : document.createElement(t);
    inst = { kind: 'el', vnode: v, dom: el, kids: [] };
    for (var p in v.props) setProp(el, p, v.props[p], undefined, isSvg);
    inst.kids = patchList([], v.children, isSvg && t !== 'foreignObject');
    syncDom(el, inst.kids);
    applyValue(el, v.props);
    attachRef(inst, v);
    return inst;
  }
  function attachRef(inst, v) {
    var r = v.props.ref;
    if (r) { inst.ref = r; if (typeof r === 'function') r(inst.dom); else r.current = inst.dom; }
  }
  function renderComp(inst, v, svg) {
    var prevC = current, prevI = hookIdx;
    current = inst; hookIdx = 0;
    var out;
    try { out = v.type(v.props); } finally { current = prevC; hookIdx = prevI; }
    inst.vnode = v;
    var kids = normKids([out === undefined ? null : out], []);
    inst.kids = patchList(inst.kids, kids, svg);
    return inst;
  }
  function patch(inst, v, svg) {
    if (inst.kind === 'text') {
      var s = String(v);
      if (inst.text !== s) { inst.dom.nodeValue = s; inst.text = s; }
      return inst;
    }
    if (inst.kind === 'comp') return renderComp(inst, v, svg);
    if (inst.kind === 'frag') { inst.vnode = v; inst.kids = patchList(inst.kids, v.children, svg); return inst; }
    var el = inst.dom, isSvg = svg || v.type === 'svg', op = inst.vnode.props, np = v.props, k;
    for (k in op) if (!(k in np) && k !== 'style' && k !== 'children' && k !== 'key') {
      if (k.length > 2 && k.slice(0, 2) === 'on') { var ev = EVENT_MAP[k] || k.slice(2).toLowerCase(); if (el.__h) el.__h[ev] = null; }
      else if (k === 'className') setProp(el, k, '', op[k], isSvg);
      else if (k !== 'value' && k !== 'ref') el.removeAttribute(k === 'htmlFor' ? 'for' : k);
    }
    if (op.style && !np.style) setStyle(el, op.style, {});
    for (k in np) {
      if (k === 'style') { if (np.style !== op.style || typeof np.style === 'object') setStyle(el, op.style, np.style); }
      else if (np[k] !== op[k] || k === 'checked' || k === 'value') setProp(el, k, np[k], op[k], isSvg);
    }
    inst.vnode = v;
    inst.kids = patchList(inst.kids, v.children, isSvg && v.type !== 'foreignObject');
    syncDom(el, inst.kids);
    applyValue(el, np);
    return inst;
  }

  /* ---------- root ---------- */
  function createRoot(container) {
    var rootInst = null, rootVnode = null;
    function run() {
      var guard = 0;
      do {
        effects = [];
        rootInst = rootInst ? patch(rootInst, rootVnode, false) : mount(rootVnode, false);
        syncDom(container, [rootInst]);
        var q = effects; effects = [];
        for (var i = 0; i < q.length; i++) q[i]();
      } while (0);
    }
    return { render: function (vnode) { rootVnode = vnode; rootRender = run; run(); } };
  }

  global.React = {
    createElement: createElement, Fragment: Fragment, useState: useState, useEffect: useEffect,
    useMemo: useMemo, useCallback: useCallback, useRef: useRef
  };
  global.GoBusDOM = { createRoot: createRoot };

  /* ---------- icons (24x24 line icons) ---------- */
  var h = createElement;
  function icon(name, nodes) {
    return function (props) {
      props = props || {};
      var size = props.size || 24;
      var a = {
        xmlns: SVG_NS, width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        stroke: props.color || 'currentColor', strokeWidth: props.strokeWidth || 2,
        strokeLinecap: 'round', strokeLinejoin: 'round',
        className: 'lucide lucide-' + name + (props.className ? ' ' + props.className : '')
      };
      for (var k in props) if (k !== 'size' && k !== 'color' && k !== 'strokeWidth' && k !== 'className' && k !== 'children') a[k] = props[k];
      return h.apply(null, ['svg', a].concat(nodes.map(function (n) { return h(n[0], n[1]); })));
    };
  }
  var P = function (d) { return ['path', { d: d }]; };
  var C = function (cx, cy, r) { return ['circle', { cx: cx, cy: cy, r: r }]; };
  var R = function (x, y, w, hh, rx) { var o = { x: x, y: y, width: w, height: hh }; if (rx) o.rx = rx; return ['rect', o]; };
  var L = function (x1, y1, x2, y2) { return ['line', { x1: x1, y1: y1, x2: x2, y2: y2 }]; };
  var PL = function (p) { return ['polyline', { points: p }]; };
  var shield = 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z';
  global.Lucide = {
    AlertCircle: icon('circle-alert', [C(12, 12, 10), L(12, 8, 12, 12), L(12, 16, 12.01, 16)]),
    AlertTriangle: icon('triangle-alert', [P('m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'), P('M12 9v4'), P('M12 17h.01')]),
    ArrowLeft: icon('arrow-left', [P('m12 19-7-7 7-7'), P('M19 12H5')]),
    ArrowRight: icon('arrow-right', [P('M5 12h14'), P('m12 5 7 7-7 7')]),
    Award: icon('award', [C(12, 8, 6), P('M15.477 12.89 17 22l-5-3-5 3 1.523-9.11')]),
    BookOpen: icon('book-open', [P('M12 7v14'), P('M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z')]),
    Building: icon('building', [R(4, 2, 16, 20, 2), P('M9 22v-4h6v4'), P('M8 6h.01'), P('M16 6h.01'), P('M12 6h.01'), P('M12 10h.01'), P('M12 14h.01'), P('M16 10h.01'), P('M16 14h.01'), P('M8 10h.01'), P('M8 14h.01')]),
    Bus: icon('bus', [P('M8 6v6'), P('M15 6v6'), P('M2 12h19.6'), P('M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3'), C(7, 18, 2), P('M9 18h5'), C(16, 18, 2)]),
    Calendar: icon('calendar', [P('M8 2v4'), P('M16 2v4'), R(3, 4, 18, 18, 2), P('M3 10h18')]),
    Check: icon('check', [P('M20 6 9 17l-5-5')]),
    CheckCircle: icon('circle-check-big', [P('M21.801 10A10 10 0 1 1 17 3.335'), P('m9 11 3 3L22 4')]),
    Clock: icon('clock', [C(12, 12, 10), PL('12 6 12 12 16 14')]),
    Code: icon('code', [PL('16 18 22 12 16 6'), PL('8 6 2 12 8 18')]),
    Copy: icon('copy', [R(8, 8, 14, 14, 2), P('M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2')]),
    CreditCard: icon('credit-card', [R(2, 5, 20, 14, 2), L(2, 10, 22, 10)]),
    Database: icon('database', [['ellipse', { cx: 12, cy: 5, rx: 9, ry: 3 }], P('M3 5V19A9 3 0 0 0 21 19V5'), P('M3 12A9 3 0 0 0 21 12')]),
    DollarSign: icon('dollar-sign', [L(12, 2, 12, 22), P('M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6')]),
    Download: icon('download', [P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'), PL('7 10 12 15 17 10'), L(12, 15, 12, 3)]),
    ExternalLink: icon('external-link', [P('M15 3h6v6'), P('M10 14 21 3'), P('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6')]),
    FileCode: icon('file-code', [P('M10 12.5 8 15l2 2.5'), P('m14 12.5 2 2.5-2 2.5'), P('M14 2v4a2 2 0 0 0 2 2h4'), P('M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z')]),
    Filter: icon('funnel', [['polygon', { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' }]]),
    Folder: icon('folder', [P('M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z')]),
    Home: icon('house', [P('M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8'), P('M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z')]),
    Info: icon('info', [C(12, 12, 10), P('M12 16v-4'), P('M12 8h.01')]),
    Lock: icon('lock', [R(3, 11, 18, 11, 2), P('M7 11V7a5 5 0 0 1 10 0v4')]),
    Mail: icon('mail', [R(2, 4, 20, 16, 2), P('m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7')]),
    MapPin: icon('map-pin', [P('M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'), C(12, 10, 3)]),
    Phone: icon('phone', [P('M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z')]),
    Plus: icon('plus', [P('M5 12h14'), P('M12 5v14')]),
    Printer: icon('printer', [P('M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'), P('M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6'), R(6, 14, 12, 8, 1)]),
    QrCode: icon('qr-code', [R(3, 3, 5, 5, 1), R(16, 3, 5, 5, 1), R(3, 16, 5, 5, 1), P('M21 16h-3a2 2 0 0 0-2 2v3'), P('M21 21v.01'), P('M12 7v3a2 2 0 0 1-2 2H7'), P('M3 12h.01'), P('M12 3h.01'), P('M12 16v.01'), P('M16 12h1'), P('M21 12v.01'), P('M12 21v-1')]),
    Route: icon('route', [C(6, 19, 3), P('M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15'), C(18, 5, 3)]),
    Search: icon('search', [C(11, 11, 8), P('m21 21-4.3-4.3')]),
    Server: icon('server', [R(2, 2, 20, 8, 2), R(2, 14, 20, 8, 2), L(6, 6, 6.01, 6), L(6, 18, 6.01, 18)]),
    Shield: icon('shield', [P(shield)]),
    ShieldAlert: icon('shield-alert', [P(shield), P('M12 8v4'), P('M12 16h.01')]),
    ShieldCheck: icon('shield-check', [P(shield), P('m9 12 2 2 4-4')]),
    Star: icon('star', [['polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' }]]),
    Terminal: icon('terminal', [PL('4 17 10 11 4 5'), L(12, 19, 20, 19)]),
    Ticket: icon('ticket', [P('M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'), P('M13 5v2'), P('M13 17v2'), P('M13 11v2')]),
    TrendingUp: icon('trending-up', [PL('22 7 13.5 15.5 8.5 10.5 2 17'), PL('16 7 22 7 22 13')]),
    User: icon('user', [P('M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'), C(12, 7, 4)]),
    Users: icon('users', [P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'), C(9, 7, 4), P('M22 21v-2a4 4 0 0 0-3-3.87'), P('M16 3.13a4 4 0 0 1 0 7.75')]),
    Wifi: icon('wifi', [P('M12 20h.01'), P('M2 8.82a15 15 0 0 1 20 0'), P('M5 12.859a10 10 0 0 1 14 0'), P('M8.5 16.429a5 5 0 0 1 7 0')]),
    X: icon('x', [P('M18 6 6 18'), P('m6 6 12 12')]),
    XCircle: icon('circle-x', [C(12, 12, 10), P('m15 9-6 6'), P('m9 9 6 6')]),
    Zap: icon('zap', [P('M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z')])
  };

  /* ---------- tiny module registry used by app.js ---------- */
  var defs = {}, cache = {};
  global.__define = function (name, fn) { defs[name] = fn; };
  global.__require = function (name) {
    if (name === 'lucide-react') return global.Lucide;
    if (cache[name]) return cache[name];
    if (!defs[name]) throw new Error('Unknown module ' + name);
    var ex = cache[name] = {};
    defs[name](ex, global.__require);
    return ex;
  };
  global.__requireLucide = function () { return global.Lucide; };
})(window);
