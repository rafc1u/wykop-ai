// ==UserScript==
// @name         wykop-ai - nieoficjalny klient wykop.pl
// @namespace    https://github.com/rafc1u/wykop-ai
// @version      0.1.0
// @description  Lekki, mobilny interfejs dla wykop.pl. Nieoficjalny, niepowiązany z Wykop sp. z o.o. Rozmawia wyłącznie z API wykop.pl, używając sesji przeglądarki.
// @license      MIT
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9IiMxZjZmNWMiLz48dGV4dCB4PSIzMiIgeT0iNDIiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj53YTwvdGV4dD48L3N2Zz4=
// @homepageURL  https://github.com/rafc1u/wykop-ai
// @supportURL   https://github.com/rafc1u/wykop-ai/issues
// @downloadURL  https://raw.githubusercontent.com/rafc1u/wykop-ai/build/wykop-ai.user.js
// @updateURL    https://raw.githubusercontent.com/rafc1u/wykop-ai/build/wykop-ai.meta.js
// @match        https://wykop.pl/*
// @match        https://www.wykop.pl/*
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var n;
	var t$1;
	var u$2;
	var i$1;
	var f$2;
	var o$2;
	var e$1;
	var l$1;
	var c$1;
	var a$2;
	var h$1 = Symbol.for("pv");
	var p$1 = {};
	var y$1 = [];
	var v$1 = /^m(i|n|o|s|text|space)$/;
	var w$1 = Array.isArray;
	var d$1 = y$1.slice;
	var _$1 = Object.assign;
	function g$1(n) {
		n && n.parentNode && n.remove();
	}
	function m$1(r, u, i, f, o) {
		var e = {
			type: r,
			props: u,
			key: i,
			ref: f,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: h$1,
			__v: o || ++t$1,
			__i: -1,
			__u: 0
		};
		return !o && n.vnode && n.vnode(e), e;
	}
	function $(n) {
		return n.children;
	}
	function x(n, t) {
		this.props = n, this.context = t, this.__g = 0;
	}
	function S(n, t) {
		if (null == t) return n.__ && S(n.__, n.__i + 1);
		for (var r; t < n.__k.length; t++) if ((r = n.__k[t]) && r.__e) return r.__e;
		return "function" != typeof n.type || n.props.__P ? null : S(n);
	}
	function C$1(t) {
		var r, u = t.__v, i = u.__e, f = [], o = [], e = t.__P;
		e && ((r = _$1({ constructor: h$1 }, u)).__v = u.__v + 1, n.vnode && n.vnode(r), z$1(e, r, u, t.__n, e.namespaceURI, 32 & u.__u ? [i] : null, f, i || S(u), 32 & u.__u, o), r.__v = u.__v, r.__.__k[r.__i] = r, E$1(f, r, o), u.__ = u.__e = null, r.__e != i && j(r));
	}
	function j(n) {
		if ((n = n.__) && n.__c && !n.props.__P) return n.__e = null, n.__k.some(function(t) {
			return t && (n.__e = t.__e);
		}), j(n);
	}
	function L(t) {
		(8 & t.__g || (t.__g |= 8, u$2.push(t), f$2++)) && i$1 == n.debounceRendering || ((i$1 = n.debounceRendering) || queueMicrotask)(H);
	}
	function H() {
		try {
			for (var n, t = 1; u$2.length;) u$2.length > t && u$2.sort(o$2), n = u$2.shift(), t = u$2.length, 8 & n.__g && C$1(n);
		} finally {
			(f$2 = u$2.length) && (i$1 || queueMicrotask)(H);
		}
	}
	function I(n, t, r, u, i, f, o, e, l, c, a) {
		var s, h, v, w, d, _, g = u.__k || y$1, k = t.length;
		for (l = q(r, t, g, l, k), s = 0; s < k; s++) null != (v = r.__k[s]) && (h = ~v.__i && g[v.__i] || p$1, v.__i = s, _ = z$1(n, v, h, i, f, o, e, l, c, a), w = v.__e, (h.ref != v.ref || 8 & h.__u) && (h.ref && G$1(h.ref, null, v, h), v.ref && a.push(v.ref, v.__c || w, v)), d = d || w, 4 & v.__u ? (l = A$1(v, l, n, !h.__v), h.__e && (h.__e = null)) : "function" == typeof v.type && void 0 !== _ ? l = _ : w && (l = w.nextSibling), v.__u &= -21);
		return r.__e = d, l;
	}
	function q(n, t, r, u, i) {
		var f, o, e, l, c, a, s, p, y, v = r.length, d = v, _ = 0, g = 0, k = n.__k = Array(i);
		for (f = 0; f < i; f++) null != (o = t[f]) && "boolean" != typeof o && "function" != typeof o ? ("object" != typeof o || o.constructor === String ? o = k[f] = m$1(null, o) : w$1(o) ? o = k[f] = m$1($, { children: o }) : o.constructor === h$1 && o.__b ? o = k[f] = m$1(o.type, o.props, o.key, o.ref, o.__v) : k[f] = o, l = f + _, o.__ = n, o.__b = n.__b + 1, e = null, ~(c = o.__i = P(o, r, l, d)) && (d--, (e = r[c]) && (e.__u |= 2)), e && e.__v ? (o.__u |= 16, c == l - 1 ? _-- : c == l + 1 ? _++ : c != l && (c > l ? _-- : _++, g = 1)) : (~c || (i > v ? _-- : i < v && _++), "function" != typeof o.type && (o.__u |= 4))) : k[f] = null;
		if (g) {
			for (a = [], s = [], f = 0; f < i; f++) if ((o = k[f]) && 16 & o.__u) {
				for (_ = 0, p = a.length; _ < p;) a[y = _ + p >> 1] < o.__i ? _ = y + 1 : p = y;
				a[_] = o.__i, s[f] = _ + 1;
			}
			for (_ = a.length; f--;) s[f] && (s[f] == _ ? _-- : k[f].__u |= 4);
		}
		if (d) for (f = 0; f < v; f++) !(e = r[f]) || 2 & e.__u || (e.__e == u && (u = S(e)), J(e, e));
		return u;
	}
	function A$1(n, t, r, u) {
		var i, f, o, e;
		if ("function" == typeof n.type) {
			if (n.props.__P) return t;
			if (i = n.__k) for (f = 0; f < i.length; f++) i[f] && (i[f].__ = n, t = A$1(i[f], t, r, !1));
			return t;
		}
		for (t && !t.parentNode && (t = S(n)) && !t.parentNode && (t = null), o = n.__e, e = t; e && 8 == e.nodeType;) e = e.nextSibling;
		for (o != e && (!u && r.moveBefore && o.parentNode ? r.moveBefore(o, t) : r.insertBefore(o, t || null)), t = o; (t = t && t.nextSibling) && 8 == t.nodeType && !t.data.startsWith("$s"););
		return t;
	}
	function P(n, t, r, u) {
		var i, f = n.key, o = n.type, e = t[r], l = e && !(2 & e.__u);
		if (null === e && null == f || l && f == e.key && o == e.type) return r;
		if (u > (l ? 1 : 0)) {
			for (i = r - 1; i >= 0; i--) if ((e = t[i]) && !(2 & e.__u) && f == e.key && o == e.type) return i;
			for (i = r + 1; i < t.length; i++) if ((e = t[i]) && !(2 & e.__u) && f == e.key && o == e.type) return i;
		}
		return -1;
	}
	function T$1(n, t, r) {
		r ??= "", "-" == t[0] ? n.setProperty(t, r) : n[t] = r;
	}
	function N(n, t, r, u, i) {
		var f, o;
		if ("style" == t) if ("string" == typeof r) n.style.cssText = r;
		else {
			if ("string" == typeof u && (n.style.cssText = u = ""), u) for (t in u) r && t in r || T$1(n.style, t);
			if (r) for (t in r) u && r[t] == u[t] || T$1(n.style, t, r[t]);
		}
		else if ("o" == t[0] && "n" == t[1]) "function" != typeof r && (r = null), "function" != typeof u && (u = null), (n.__e || (n.__e = {}))[t] = r, r && u || (o = a$2[t] || (a$2[t] = V(t)), (n.__a || (n.__a = {}))[t] = c$1, f = t != (t = t.replace(l$1, "$1")), (t = t.slice(2))[0] < "a" && (t = t.toLowerCase()), r ? n.addEventListener(t, o, f) : n.removeEventListener(t, o, f));
		else {
			if ("http://www.w3.org/2000/svg" == i) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
			else if ("width" != t && "height" != t && "href" != t && "list" != t && "form" != t && "tabIndex" != t && "download" != t && "rowSpan" != t && "colSpan" != t && "role" != t && "popover" != t && t in n) try {
				n[t] = null == r ? "" : r;
				return;
			} catch (n) {}
			if ("function" == typeof r) return;
			null == r || !1 === r && "-" != t[4] ? n.removeAttribute(t) : n.setAttribute(t, "popover" == t && 1 == r ? "" : r);
		}
	}
	function V(t) {
		return function(r) {
			var u = this.__e;
			if (u) {
				if (u = u[t], null == r[e$1]) r[e$1] = c$1++;
				else if (r[e$1] < this.__a[t]) return;
				return u(n.event ? n.event(r) : r);
			}
		};
	}
	function z$1(t, r, u, i, f, o, e, l, c, a) {
		var s, p, v, d, k, b, m, M, C, j, L, H, q, A, O, P, T, N, V = r.type;
		if (r.constructor !== h$1) return null;
		128 & u.__u && (c = 32 & u.__u, s = u.__c.__z) && (r.__u |= c, p = o = [], 8 == s.nodeType ? l = B$1(s, o) : o.push(s), l = o[0] || l), (s = n.__b) && s(r);
		n: if ("function" == typeof V) {
			v = e.length;
			try {
				if (M = r.props, C = (s = V.prototype) && s.render, j = (s = V.contextType) && i[s.__c], L = s ? j ? j.props.value : s.__ : i, (d = u.__c) ? (r.__c = d, 2 & d.__g && (d.__g |= 1)) : (C ? r.__c = d = new V(M, L) : (r.__c = d = new x(M, L), d.constructor = V, d.render = K), j && j.sub(d), d.state || (d.state = {}), d.__n = i, d.__g |= 8, d.__h = [], d.__k = []), C && (d.__s || (d.__s = d.state), V.getDerivedStateFromProps && (d.__s == d.state && (d.__s = _$1({}, d.__s)), _$1(d.__s, V.getDerivedStateFromProps(M, d.__s)))), k = d.props, b = d.state, d.__v = r, u.__c) {
					if (M !== k && C && !V.getDerivedStateFromProps && d.componentWillReceiveProps && d.componentWillReceiveProps(M, L), r.__v == u.__v && !(8 & d.__g) || !(4 & d.__g) && d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(M, d.__s, L)) {
						r.__v != u.__v && (d.props = M, d.state = d.__s, d.__g &= -9), r.__e = u.__e, r.__k = u.__k, r.__k.some(function(n) {
							n && (n.__ = r);
						}), y$1.push.apply(d.__h, d.__k), d.__k = [], d.__h.length && e.push(d), l = S(u);
						break n;
					}
					d.componentWillUpdate && d.componentWillUpdate(M, d.__s, L), C && d.componentDidUpdate && d.__h.push(function() {
						d.componentDidUpdate(k, b, m);
					});
				} else C && !V.getDerivedStateFromProps && d.componentWillMount && d.componentWillMount(), C && d.componentDidMount && d.__h.push(d.componentDidMount);
				d.context = L, d.props = M, d.__P = t, d.__g &= -5, H = n.__r, q = C ? 25 : 0;
				do
					d.__g &= -9, H && H(r), s = d.render(d.props, d.state = d.__s, d.context);
				while (8 & d.__g && ++q < 25);
				C && (y$1.push.apply(d.__h, d.__k), d.__k = []), d.state = d.__s, d.getChildContext && (i = _$1({}, i, d.getChildContext())), C && u.__c && d.getSnapshotBeforeUpdate && (m = d.getSnapshotBeforeUpdate(k, b)), A = s && s.type === $ && null == s.key ? s.props.children : s, M.__P && (s = l, f = (t = M.__P).namespaceURI, c = o = null, u.props && u.props.__P != t && (u.__k.some(function(n) {
					n && J(n, n);
				}), u.__k = null), l = u.__k ? S(u, 0) : null), l = I(t, w$1(A) ? A : [A], r, u, i, f, o, e, l, c, a), M.__P && (r.__e = null, l = s), r.__u &= -161, p && p.some(g$1), d.__h.length && e.push(d), 1 & d.__g && (d.__g &= -4);
			} catch (t) {
				if (e.length = v, r.__v = null, c || o) if (t && t.then) {
					if (r.__u |= 128 | c, o) {
						for (~(T = o.indexOf(l || void 0)) || (T = o.length); (N = o[T - 1]) && 8 == N.nodeType;) T--;
						for (; T < o.length; T++) if (N = o[T]) if (o[T] = null, O) {
							if (N == P) break;
						} else {
							if (8 != N.nodeType) break;
							N.data.startsWith("$s") && (P = B$1(O = N));
						}
					}
					if (!O) {
						for (; l && 8 == l.nodeType && l.nextSibling;) l = l.nextSibling;
						O = l;
					}
					(s = B$1(O = r.__c.__z || (r.__c.__z = O))) ? (r.__e = O, l = s) : r.__e = l, l = l && l.nextSibling;
				} else o && o.some(g$1);
				else r.__e = u.__e;
				r.__k || (r.__k = u.__k || []), t && t.then || D$1(r), n.__e(t, r, u);
			}
		} else l = r.__e = F(u.__e, r, u, i, f, o, e, c, a, t);
		return (s = n.diffed) && s(r), l;
	}
	function B$1(n, t) {
		if (n && 8 == n.nodeType && n.data.startsWith("$s")) for (var r = 1; n = n.nextSibling;) {
			if (8 == n.nodeType) {
				if (n.data.startsWith("$s")) r++;
				else if (n.data.startsWith("/$s") && !--r) return n;
			}
			t && t.push(n);
		}
	}
	function D$1(n) {
		n && (n.__c && (n.__c.__g |= 4), n.__k && n.__k.some(D$1));
	}
	function E$1(t, r, u) {
		for (var i = 0; i < u.length;) G$1(u[i++], u[i++], u[i++]);
		n.__c && n.__c(r, t), t.some(function(r) {
			try {
				t = r.__h, r.__h = [], t.some(function(n) {
					n.call(r);
				});
			} catch (t) {
				n.__e(t, r.__v);
			}
		});
	}
	function F(t, r, u, i, f, o, e, l, c, a) {
		var s, h, y, _, k, b, m, M, $ = u.props || p$1, x = r.props, C = r.type;
		if ("svg" == C ? f = "http://www.w3.org/2000/svg" : "math" == C ? f = "http://www.w3.org/1998/Math/MathML" : f || (f = "http://www.w3.org/1999/xhtml"), o) {
			for (s = 0; s < o.length; s++) if ((k = o[s]) && (C ? k.localName == C : 3 == k.nodeType)) {
				t = k, o[s] = null;
				break;
			}
		}
		if (!t) {
			if (M = a.ownerDocument || document, !C) return M.createTextNode(x);
			t = M.createElementNS(f, C, x.is ? x : a), l && (n.__m && n.__m(r, o), l = !1), o = null;
		}
		if (C) {
			if (a = "template" == C && t.content || t, o = "textarea" == C && null != x.defaultValue ? null : o && d$1.call(a.childNodes), !l && o) for ($ = {}, s = 0; s < t.attributes.length; s++) $[(k = t.attributes[s]).name] = k.value;
			for (s in $) k = $[s], "dangerouslySetInnerHTML" == s ? y = k : "children" == s || s in x || "value" == s && "defaultValue" in x || "checked" == s && "defaultChecked" in x || N(t, s, null, k, f);
			for (s in x) k = x[s], "children" == s ? _ = k : "dangerouslySetInnerHTML" == s ? h = k : "value" == s ? b = k : "checked" == s ? m = k : l && "function" != typeof k || $[s] === k || N(t, s, k, $[s], f);
			h ? (l || y && (h.__html == y.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), r.__k = []) : (y && (t.textContent = ""), ("foreignObject" == C || "http://www.w3.org/1998/Math/MathML" == f && v$1.test(C)) && (f = "http://www.w3.org/1999/xhtml"), I(a, w$1(_) ? _ : [_], r, u, i, f, o, e, o ? o[0] : u.__k && S(u, 0), l, c), o && o.some(g$1)), l && "textarea" != C || (s = "value", "progress" == C && null == b ? t.removeAttribute(s) : null == b || b === t[s] && ("progress" != C || b) || N(t, s, b, $[s], f), s = "checked", null != m && m != t[s] && N(t, s, m, $[s], f));
		} else $ === x || l && t.data == x || (t.data = x);
		return t;
	}
	function G$1(t, r, u, i) {
		try {
			"function" == typeof t ? r ? r.__x = t(r) || 1 : i && (i = i.__c || i.__e) && (r = i.__x) && (i.__x = null, "function" == typeof r ? r() : t(null)) : t.current = r;
		} catch (t) {
			n.__e(t, u);
		}
	}
	function J(t, r, u) {
		var i, f, o, e;
		if (n.unmount && n.unmount(t), !(i = t.ref) || i.current && i.current != t.__e || G$1(i, null, r, t), i = t.__c) {
			if (i.componentWillUnmount) try {
				i.componentWillUnmount();
			} catch (t) {
				n.__e(t, r);
			}
			i.__P = i.__n = null;
		}
		if (i = t.__k) for (e = 0; e < i.length; e++) i[e] && J(i[e], r, "function" != typeof t.type || u && !t.props.__P);
		!u && (i = t.__c) && (i = i.__z) && (f = B$1(i, o = [])) && (i == t.__e && o.some(g$1), g$1(f), g$1(i)), u || g$1(t.__e), t.__e = t.__c = t.__ = null;
	}
	function K(n, t, r) {
		return this.constructor(n, r);
	}
	function Q(t, r) {
		var u, i, f, o;
		n.__ && n.__(t, r), 9 == r.nodeType && (r = r.documentElement), i = (u = t && 32 & t.__u) ? null : r.__k, r.__k = m$1($, { children: [t] }), f = [], o = [], z$1(r, r.__k, i || p$1, p$1, r.namespaceURI, i ? null : r.firstChild ? d$1.call(r.childNodes) : null, f, i ? i.__e : r.firstChild, u, o), E$1(f, r.__k, o), r.__k.props.children = null;
	}
	n = { __e: function(n, t, r, u) {
		for (var i, o, e; t = t.__;) if ((i = t.__c) && !(1 & i.__g)) {
			i.__g |= 4;
			try {
				if ((e = (o = i.constructor) && o.getDerivedStateFromError) && i.setState(o.getDerivedStateFromError(n)), i.componentDidCatch && (i.componentDidCatch(n, u || {}), e = 1), e && 8 & i.__g) return void (i.__g |= 2);
			} catch (t) {
				n = t;
			}
		}
		throw f$2 = 0, n;
	} }, t$1 = 0, x.prototype.setState = function(n, t) {
		var r = this.__s;
		r && r != this.state || (r = this.__s = _$1({}, this.state)), "function" == typeof n && (n = n(_$1({}, r), this.props)), n && (_$1(r, n), this.__v && (t && this.__k.push(t), L(this)));
	}, x.prototype.forceUpdate = function(n) {
		this.__v && (this.__g |= 4, n && this.__h.push(n), L(this));
	}, x.prototype.render = $, u$2 = [], f$2 = 0, o$2 = function(n, t) {
		return n.__v.__b - t.__v.__b;
	}, e$1 = Symbol(), l$1 = /(PointerCapture)$|Capture$/i, c$1 = 0, a$2 = {};
	var t;
	var r;
	var u$1;
	var i;
	var o$1 = Object.is;
	var f$1 = 0;
	var c = [];
	var e = [];
	var a$1 = n;
	var v = a$1.__b;
	var l = a$1.__r;
	var m = a$1.diffed;
	var h = a$1.__c;
	var s = a$1.unmount;
	var p = a$1.__;
	function y(n, t) {
		a$1.__h && a$1.__h(r, n, f$1 || t), f$1 = 0;
		var u = r.__H || (r.__H = {
			__: [],
			__h: []
		});
		return n >= u.__.length && u.__.push({}), u.__[n];
	}
	function d(n) {
		return f$1 = 1, _(G, n);
	}
	function _(n, u, i) {
		var f = y(t++, 2);
		if (f.t = n, !f.__c && (f.__ = [i ? i(u) : G(void 0, u), function(n) {
			var t = (f.__N || f.__)[0], r = f.t(t, n);
			o$1(t, r) || (f.__N = [r, f.__[1]], f.__c.setState({}));
		}], f.__c = r, !r.__f)) {
			r.__f = !0;
			var c = r.shouldComponentUpdate;
			r.shouldComponentUpdate = function(n, t, r) {
				var u = this.__H;
				if (!u) return !0;
				var i = !1, f = this.props != n;
				if (u.__.some(function(n) {
					n.__N && (i = !0, o$1(n.__[0], n.__N[0]) || (f = !0));
				}), c) {
					var e = c.call(this, n, t, r);
					return i ? e || f : e;
				}
				return !i || f;
			};
		}
		return f.__;
	}
	function A(n, u) {
		var i = y(t++, 3);
		!a$1.__s && E(i.__H, u) && (i.__P = !0, i.__ = n, i.u = u, r.__H.__h.push(i));
	}
	function T(n) {
		return f$1 = 5, w(function() {
			return { current: n };
		}, []);
	}
	function w(n, r) {
		var u = y(t++, 7);
		return E(u.__H, r) && (u.__ = n(), u.__H = r), u.__;
	}
	function b(n, t) {
		return f$1 = 8, w(function() {
			return n;
		}, t);
	}
	function g() {
		var n;
		do {
			for (; n = e.shift();) try {
				C(n);
			} catch (t) {
				a$1.__e(t, { __: (n = n.__P) && n.__v });
			}
			for (; n = c.shift();) {
				var t = n.__H;
				if (n.__P && t) try {
					t.__h.some(C), t.__h.some(D), t.__h = [];
				} catch (r) {
					t.__h = [], a$1.__e(r, n.__v);
				}
			}
		} while (e.length);
	}
	a$1.__b = function(n) {
		r = null, v && v(n);
	}, a$1.__ = function(n, t) {
		n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
	}, a$1.__r = function(n) {
		l && l(n), t = 0;
		var i = (r = n.__c).__H;
		i && (u$1 == r ? r.__h = [] : (i.__h.some(C), i.__h.some(D), t = 0), i.__h = [], i.__.some(function(n) {
			n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
		})), u$1 = r;
	}, a$1.diffed = function(n) {
		m && m(n);
		var t = n.__c;
		t && t.__H && (t.__H.__h.length && B(c.push(t)), t.__H.__.some(function(n) {
			n.u && (n.__H = n.u);
		})), u$1 = r = null;
	}, a$1.__c = function(n, t) {
		t.some(function(n) {
			try {
				n.__h.some(C), n.__h = n.__h.filter(function(n) {
					return !n.__ || D(n);
				});
			} catch (t) {
				n.__h = [function() {
					throw t;
				}];
			}
		}), h && h(n, t);
	}, a$1.unmount = function(n) {
		s && s(n);
		var t, r, u = n.__c;
		u && u.__H && (u.__H.__.some(function(u) {
			try {
				if (u.__P && u.__c) {
					if (void 0 === r) {
						for (r = n.__; r && (!r.__c || !r.__c.__P);) r = r.__;
						r = r && r.__c;
					}
					u.__P = r, B(e.push(u));
				} else C(u);
			} catch (n) {
				t = n;
			}
		}), u.__H = void 0, t && a$1.__e(t, u.__v));
	};
	var k = "function" == typeof requestAnimationFrame;
	function z(n) {
		var t, r = function() {
			clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
		}, u = setTimeout(r, 35);
		k && (t = requestAnimationFrame(r));
	}
	function B(n) {
		1 != n && i == a$1.requestAnimationFrame || ((i = a$1.requestAnimationFrame) || z)(g);
	}
	function C(n) {
		var t = r, u = n.__c;
		"function" == typeof u && (n.__c = void 0, u()), r = t;
	}
	function D(n) {
		var t = r;
		n.__c = n.__(), r = t;
	}
	function E(n, t) {
		return !n || n.length != t.length || t.some(function(t, r) {
			return !o$1(t, n[r]);
		});
	}
	function G(n, t) {
		return "function" == typeof t ? t(n) : t;
	}
	function parseRoute(pathname, search = "") {
		const q = new URLSearchParams(search);
		if (q.get("wl") === "diag") return { name: "diag" };
		const [a, b] = pathname.split("/").filter(Boolean).map(decodeURIComponent);
		if (!a) return {
			name: "home",
			type: "homepage"
		};
		if (a === "wykopalisko") return {
			name: "home",
			type: "upcoming"
		};
		if (a === "mikroblog") {
			const sort = q.get("sort");
			if (sort === "newest" || sort === "active") return {
				name: "mikroblog",
				sort
			};
			if (b === "najnowsze") return {
				name: "mikroblog",
				sort: "newest"
			};
			if (b === "aktywne") return {
				name: "mikroblog",
				sort: "active"
			};
			return {
				name: "mikroblog",
				sort: "hot"
			};
		}
		if (a === "wpis" && b && /^\d+$/.test(b)) return {
			name: "entry",
			id: b
		};
		if (a === "link" && b && /^\d+$/.test(b)) return {
			name: "link",
			id: b
		};
		if (a === "tag" && b) return {
			name: "tag",
			tag: b
		};
		return {
			name: "unsupported",
			path: pathname + search
		};
	}
	var listeners = new Set();
	var scrollPositions = new Map();
	function navigate(href, replace = false) {
		const key = location.pathname + location.search;
		scrollPositions.set(key, window.scrollY);
		if (replace) history.replaceState(history.state, "", href);
		else history.pushState({ wl: true }, "", href);
		listeners.forEach((l) => l());
		window.scrollTo(0, 0);
	}
	function useLocation() {
		const [loc, setLoc] = d(location.pathname + location.search);
		A(() => {
			const update = () => setLoc(location.pathname + location.search);
			listeners.add(update);
			window.addEventListener("popstate", update);
			return () => {
				listeners.delete(update);
				window.removeEventListener("popstate", update);
			};
		}, []);
		return loc;
	}
	var f = Symbol.for("pv");
	var o = 0;
	Array.isArray;
	function a(t, e, n$1, u, a, i) {
		e || (e = {});
		var c, l, p = e;
		if ("ref" in p && "function" != typeof t) for (l in p = {}, e) "ref" == l ? c = e[l] : p[l] = e[l];
		var s = {
			type: t,
			props: p,
			key: n$1,
			ref: c,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: f,
			__v: --o,
			__i: -1,
			__u: 0
		};
		return (a || i) && (s.__source = a, s.__self = i), n.vnode && n.vnode(s), s;
	}
	function Link(props) {
		return a("a", {
			href: props.href,
			class: props.class,
			onClick: (e) => {
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
				e.preventDefault();
				navigate(props.href);
			},
			children: props.children
		});
	}
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	var API_BASE = "/api/v3";
	var ApiError = class extends Error {
		constructor(message, status, path, body) {
			super(message);
			_defineProperty(this, "status", void 0);
			_defineProperty(this, "path", void 0);
			_defineProperty(this, "body", void 0);
			this.status = status;
			this.path = path;
			this.body = body;
			this.name = "ApiError";
		}
	};
	var defaultDeps = () => ({
		fetch: (...args) => fetch(...args),
		storage: localStorage,
		sleep: (ms) => new Promise((r) => setTimeout(r, ms))
	});
	function readToken(storage) {
		try {
			const t = storage.getItem("token");
			if (!t) return null;
			if (t.startsWith("\"") && t.endsWith("\"")) return JSON.parse(t);
			return t;
		} catch {
			return null;
		}
	}
	function buildUrl(path, params) {
		const qs = new URLSearchParams();
		for (const [k, v] of Object.entries(params ?? {})) {
			if (v === null || v === void 0 || v === "") continue;
			qs.set(k, String(v));
		}
		const q = qs.toString();
		return API_BASE + path + (q ? "?" + q : "");
	}
	function createClient(deps = defaultDeps()) {
		async function once(url, token, signal) {
			const headers = { Accept: "application/json" };
			if (token) headers.Authorization = "Bearer " + token;
			const res = await deps.fetch(url, {
				method: "GET",
				headers,
				credentials: "same-origin",
				signal
			});
			let body = null;
			const text = await res.text();
			if (text) try {
				body = JSON.parse(text);
			} catch {
				body = text.slice(0, 500);
			}
			return {
				status: res.status,
				body
			};
		}
		async function get(path, params, opts = {}) {
			const url = buildUrl(path, params);
			let token = opts.anonymous ? null : readToken(deps.storage);
			let r = await once(url, token, opts.signal);
			for (let i = 0, wait = 500; r.status === 429 && i < 3; i++, wait *= 2) {
				await deps.sleep(wait);
				r = await once(url, token, opts.signal);
			}
			if ((r.status === 401 || r.status === 403) && token) {
				await deps.sleep(1500);
				const fresh = readToken(deps.storage);
				if (fresh && fresh !== token) {
					token = fresh;
					r = await once(url, token, opts.signal);
				}
				if (r.status === 401 || r.status === 403) r = await once(url, null, opts.signal);
			}
			if (r.status < 200 || r.status >= 300) throw new ApiError(errorMessage(r.status, r.body), r.status, path, r.body);
			const body = r.body ?? {};
			return {
				data: body.data,
				pagination: body.pagination,
				raw: r.body
			};
		}
		return { get };
	}
	function errorMessage(status, body) {
		const err = body?.error;
		const msg = typeof err?.message === "string" ? err.message : "";
		if (status === 401 || status === 403) return "Brak dost\u0119pu (" + status + ")" + (msg ? ": " + msg : "");
		if (status === 404) return "Nie znaleziono";
		if (status === 429) return "Za du\u017co zapyta\u0144, spr\u00f3buj za chwil\u0119";
		return "B\u0142\u0105d API " + status + (msg ? ": " + msg : "");
	}
	function nextPage(current, pagination, itemsOnPage) {
		if (itemsOnPage === 0) return null;
		if (pagination) {
			if (typeof pagination.next === "string" && pagination.next) return pagination.next;
			if ("next" in pagination && !pagination.next && !("per_page" in pagination)) return null;
			if (typeof pagination.per_page === "number" && typeof pagination.total === "number") {
				const n = typeof current === "number" ? current : 1;
				return n * pagination.per_page < pagination.total ? n + 1 : null;
			}
		}
		const n = typeof current === "number" ? current : 1;
		return n < 50 ? n + 1 : null;
	}
	var api = createClient();
	var isObj = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
	var str = (v) => typeof v === "string" && v ? v : typeof v === "number" ? String(v) : void 0;
	var num = (v) => typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v.trim() !== "" && !isNaN(Number(v)) ? Number(v) : void 0;
	var get = (o, path) => {
		let cur = o;
		for (const k of path.split(".")) {
			if (!isObj(cur)) return void 0;
			cur = cur[k];
		}
		return cur;
	};
	var first = (o, paths, f) => {
		for (const p of paths) {
			const v = f(get(o, p));
			if (v !== void 0) return v;
		}
	};
	function toAuthor(v) {
		if (!isObj(v)) return void 0;
		const username = first(v, [
			"username",
			"login",
			"name"
		], str);
		if (!username) return void 0;
		return {
			username,
			avatar: first(v, [
				"avatar",
				"avatar.url",
				"photo"
			], str),
			color: first(v, ["color", "color.hex"], str)
		};
	}
	function toMedia(o) {
		return {
			photo: first(o, [
				"media.photo.url",
				"media.photo.src",
				"media.photo",
				"photo.url"
			], str),
			embedUrl: first(o, ["media.embed.url", "media.embed.source"], str),
			embedThumb: first(o, [
				"media.embed.thumbnail",
				"media.embed.thumb",
				"media.embed.preview"
			], str),
			adult: get(o, "adult") === true
		};
	}
	var tagsOf = (o) => {
		const t = get(o, "tags");
		if (!Array.isArray(t)) return [];
		return t.map((x) => typeof x === "string" ? x : str(get(x, "name"))).filter((x) => !!x);
	};
	var content = (o) => first(o, [
		"content",
		"body",
		"text"
	], (v) => typeof v === "string" ? v : void 0) ?? "";
	var votes = (o) => first(o, [
		"votes.up",
		"votes.count",
		"votes"
	], num);
	var created = (o) => first(o, [
		"created_at",
		"createdAt",
		"date"
	], str);
	var idOf = (o) => first(o, ["id"], str) ?? "";
	function toComment(o) {
		const items = get(o, "comments.items");
		return {
			kind: "comment",
			id: idOf(o),
			author: toAuthor(get(o, "author")),
			content: content(o),
			createdAt: created(o),
			votes: votes(o),
			media: toMedia(o),
			replies: Array.isArray(items) ? items.map(toComment) : [],
			repliesCount: first(o, ["comments.count"], num)
		};
	}
	function toEntry(o) {
		const items = get(o, "comments.items");
		return {
			kind: "entry",
			id: idOf(o),
			author: toAuthor(get(o, "author")),
			content: content(o),
			createdAt: created(o),
			votes: votes(o),
			commentsCount: first(o, ["comments.count"], num),
			comments: Array.isArray(items) ? items.map(toComment) : [],
			media: toMedia(o),
			tags: tagsOf(o),
			adult: get(o, "adult") === true
		};
	}
	function toLink(o) {
		return {
			kind: "link",
			id: idOf(o),
			title: first(o, ["title"], str) ?? "(bez tytu\u0142u)",
			description: first(o, ["description"], (v) => typeof v === "string" ? v : void 0) ?? "",
			slug: first(o, ["slug"], str),
			sourceUrl: first(o, ["source.url", "url"], str),
			sourceLabel: first(o, [
				"source.label",
				"source.domain",
				"domain"
			], str),
			author: toAuthor(get(o, "author")),
			createdAt: first(o, ["published_at", "created_at"], str),
			votes: votes(o),
			commentsCount: first(o, ["comments.count"], num),
			media: toMedia(o),
			tags: tagsOf(o),
			adult: get(o, "adult") === true,
			hot: get(o, "hot") === true
		};
	}
	function toItem(o) {
		const resource = str(get(o, "resource"));
		if (resource === "link" || !resource && str(get(o, "title"))) return toLink(o);
		if (resource === "entry" || !resource && get(o, "content") !== void 0) return toEntry(o);
		return {
			kind: "unknown",
			id: idOf(o),
			resource
		};
	}
	function asArray(data) {
		if (Array.isArray(data)) return data;
		if (isObj(data) && Array.isArray(data.items)) return data.items;
		return [];
	}
	function sourceHost(url) {
		if (!url) return void 0;
		try {
			return new URL(url).hostname.replace(/^www\./, "");
		} catch {
			return;
		}
	}
	function safeUrl(url) {
		if (!url) return void 0;
		try {
			const u = new URL(url, "https://wykop.pl");
			return u.protocol === "https:" || u.protocol === "http:" ? u.href : void 0;
		} catch {
			return;
		}
	}
	var INLINE = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)|\\*\\*([^*\\n]+?)\\*\\*|(?<![\\p{L}\\p{N}_])_([^_\\n]+?)_(?![\\p{L}\\p{N}_])|(https?:\\/\\/[^\\s<>\"]+[^\\s<>\".,;:!?)\\]'])|(?<![\\p{L}\\p{N}_&/#])#([\\p{L}\\p{N}_]+)|(?<![\\p{L}\\p{N}_/@.])@([A-Za-z0-9_-]+)", "gu");
	function parseInline(s, depth = 0) {
		const out = [];
		const pushText = (v) => {
			if (!v) return;
			v.split("\n").forEach((p, i) => {
				if (i > 0) out.push({ t: "br" });
				if (p) out.push({
					t: "text",
					v: p
				});
			});
		};
		if (depth > 3) {
			pushText(s);
			return out;
		}
		let last = 0;
		INLINE.lastIndex = 0;
		const re = new RegExp(INLINE.source, INLINE.flags);
		let m;
		while (m = re.exec(s)) {
			pushText(s.slice(last, m.index));
			last = m.index + m[0].length;
			if (m[1] !== void 0) out.push({
				t: "code",
				v: m[1]
			});
			else if (m[2] !== void 0) out.push({
				t: "link",
				href: m[3],
				c: parseInline(m[2], depth + 1)
			});
			else if (m[4] !== void 0) out.push({
				t: "bold",
				c: parseInline(m[4], depth + 1)
			});
			else if (m[5] !== void 0) out.push({
				t: "italic",
				c: parseInline(m[5], depth + 1)
			});
			else if (m[6] !== void 0) out.push({
				t: "link",
				href: m[6],
				c: [{
					t: "text",
					v: shortUrl(m[6])
				}]
			});
			else if (m[7] !== void 0) out.push({
				t: "tag",
				v: m[7]
			});
			else if (m[8] !== void 0) out.push({
				t: "user",
				v: m[8]
			});
		}
		pushText(s.slice(last));
		return out;
	}
	function shortUrl(u) {
		const s = u.replace(/^https?:\/\/(www\.)?/, "");
		return s.length > 48 ? s.slice(0, 45) + "\u2026" : s;
	}
	function parseBlocks(src, depth = 0) {
		const lines = src.replace(/\r\n?/g, "\n").split("\n");
		const blocks = [];
		let para = [];
		const flush = () => {
			const text = para.join("\n").trim();
			if (text) blocks.push({
				t: "p",
				c: parseInline(text)
			});
			para = [];
		};
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (line.trim().startsWith("```")) {
				flush();
				const buf = [];
				i++;
				while (i < lines.length && !lines[i].trim().startsWith("```")) buf.push(lines[i++]);
				blocks.push({
					t: "pre",
					v: buf.join("\n")
				});
				continue;
			}
			const q = /^\s*>\s?(.*)$/.exec(line);
			const sp = /^\s*!\s?(.*)$/.exec(line);
			if ((q || sp) && depth < 3) {
				flush();
				const kind = q ? "quote" : "spoiler";
				const rx = q ? /^\s*>\s?(.*)$/ : /^\s*!\s?(.*)$/;
				const buf = [];
				while (i < lines.length) {
					const mm = rx.exec(lines[i]);
					if (!mm) break;
					buf.push(mm[1]);
					i++;
				}
				i--;
				blocks.push({
					t: kind,
					c: parseBlocks(buf.join("\n"), depth + 1)
				});
				continue;
			}
			if (!line.trim()) flush();
			else para.push(line);
		}
		flush();
		return blocks;
	}
	function renderInline(nodes) {
		return nodes.map((n, i) => {
			switch (n.t) {
				case "text": return n.v;
				case "br": return a("br", {}, i);
				case "bold": return a("strong", { children: renderInline(n.c) }, i);
				case "italic": return a("em", { children: renderInline(n.c) }, i);
				case "code": return a("code", { children: n.v }, i);
				case "tag": return a(Link, {
					href: "/tag/" + encodeURIComponent(n.v),
					class: "tag",
					children: ["#", n.v]
				}, i);
				case "user": return a(Link, {
					href: "/ludzie/" + encodeURIComponent(n.v),
					class: "user",
					children: ["@", n.v]
				}, i);
				case "link": {
					const href = safeUrl(n.href);
					if (!href) return renderInline(n.c);
					if (/^https?:\/\/(www\.)?wykop\.pl\//.test(href)) return a(Link, {
						href: new URL(href).pathname,
						children: renderInline(n.c)
					}, i);
					return a("a", {
						href,
						target: "_blank",
						rel: "noopener noreferrer nofollow",
						children: renderInline(n.c)
					}, i);
				}
			}
		});
	}
	function renderBlocks(blocks) {
		return blocks.map((b, i) => {
			switch (b.t) {
				case "p": return a("p", { children: renderInline(b.c) }, i);
				case "pre": return a("pre", { children: a("code", { children: b.v }) }, i);
				case "quote": return a("blockquote", { children: renderBlocks(b.c) }, i);
				case "spoiler": return a("details", {
					class: "spoiler",
					children: [a("summary", { children: "poka\u017c spoiler" }), renderBlocks(b.c)]
				}, i);
			}
		});
	}
	function Content({ text }) {
		if (!text) return null;
		return a("div", {
			class: "content",
			children: renderBlocks(parseBlocks(text))
		});
	}
	function useFeed(key, fetchPage, map, idOf) {
		const [items, setItems] = d([]);
		const [loading, setLoading] = d(false);
		const [error, setError] = d(null);
		const [done, setDone] = d(false);
		const page = T(void 0);
		const busy = T(false);
		const gen = T(0);
		const seen = T(new Set());
		const load = b(async (reset) => {
			if (busy.current && !reset) return;
			const my = reset ? ++gen.current : gen.current;
			if (reset) {
				page.current = void 0;
				seen.current = new Set();
				setItems([]);
				setDone(false);
			}
			busy.current = true;
			setLoading(true);
			setError(null);
			try {
				const res = await fetchPage(page.current);
				if (my !== gen.current) return;
				const raw = asArray(res.data);
				const mapped = raw.map(map).filter((it) => {
					const id = idOf(it);
					if (!id || seen.current.has(id)) return !id;
					seen.current.add(id);
					return true;
				});
				setItems((prev) => reset ? mapped : [...prev, ...mapped]);
				const np = nextPage(page.current, res.pagination, raw.length);
				page.current = np ?? void 0;
				if (np === null) setDone(true);
			} catch (e) {
				if (my === gen.current) setError(e instanceof Error ? e.message : String(e));
			} finally {
				if (my === gen.current) {
					busy.current = false;
					setLoading(false);
				}
			}
		}, [key]);
		A(() => {
			load(true);
		}, [load]);
		return {
			items,
			loading,
			error,
			done,
			loadMore: () => {
				if (!done && !busy.current) load(false);
			},
			reload: () => load(true)
		};
	}
	function useSentinel(onVisible) {
		const ref = T(null);
		const cb = T(onVisible);
		cb.current = onVisible;
		A(() => {
			const el = ref.current;
			if (!el) return;
			const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && cb.current(), { rootMargin: "800px 0px" });
			io.observe(el);
			return () => io.disconnect();
		}, []);
		return ref;
	}
	function timeAgo(s) {
		if (!s) return "";
		const t = Date.parse(s.includes("T") ? s : s.replace(" ", "T"));
		if (isNaN(t)) return s;
		const d = Math.max(0, (Date.now() - t) / 1e3);
		if (d < 60) return "teraz";
		if (d < 3600) return Math.floor(d / 60) + " min";
		if (d < 86400) return Math.floor(d / 3600) + " godz.";
		if (d < 2592e3) return Math.floor(d / 86400) + " dn.";
		return new Date(t).toLocaleDateString("pl-PL");
	}
	function AuthorLine({ author, createdAt, href }) {
		const avatar = safeUrl(author?.avatar);
		return a("div", {
			class: "author",
			children: [
				avatar ? a("img", {
					class: "avatar",
					src: avatar,
					alt: "",
					loading: "lazy"
				}) : a("span", { class: "avatar ph" }),
				author ? a(Link, {
					href: "/ludzie/" + encodeURIComponent(author.username),
					class: "nick",
					children: author.username
				}) : a("span", {
					class: "nick",
					children: "?"
				}),
				createdAt && (href ? a(Link, {
					href,
					class: "muted",
					children: " \u00b7 " + timeAgo(createdAt)
				}) : a("span", {
					class: "muted",
					children: [" \u00b7 ", timeAgo(createdAt)]
				}))
			]
		});
	}
	function MediaView({ media, adult }) {
		const [shown, setShown] = d(!adult);
		const photo = safeUrl(media.photo);
		const embed = safeUrl(media.embedUrl);
		const thumb = safeUrl(media.embedThumb);
		if (!photo && !embed) return null;
		if (!shown) return a("button", {
			class: "adult",
			onClick: () => setShown(true),
			children: "Tre\u015b\u0107 18+ \u00b7 poka\u017c"
		});
		return a("div", {
			class: "media",
			children: [photo && a("a", {
				href: photo,
				target: "_blank",
				rel: "noopener noreferrer",
				children: a("img", {
					src: photo,
					alt: "",
					loading: "lazy"
				})
			}), !photo && embed && a("a", {
				class: "embed",
				href: embed,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				children: [thumb && a("img", {
					src: thumb,
					alt: "",
					loading: "lazy"
				}), a("span", { children: ["\u25b6 ", sourceHost(embed) ?? "otw\u00f3rz"] })]
			})]
		});
	}
	var fmt = (n) => n === void 0 ? "" : n >= 1e3 ? (n / 1e3).toFixed(1).replace(".0", "") + " tys." : String(n);
	function EntryCard({ entry, full }) {
		const [open, setOpen] = d(full ?? false);
		const long = !full && entry.content.length > 700;
		return a("article", {
			class: "card",
			children: [
				a(AuthorLine, {
					author: entry.author,
					createdAt: entry.createdAt,
					href: full ? void 0 : "/wpis/" + entry.id
				}),
				a("div", {
					class: "body" + (long && !open ? " clamp" : ""),
					children: a(Content, { text: entry.content })
				}),
				long && !open && a("button", {
					class: "more",
					onClick: () => setOpen(true),
					children: "rozwi\u0144"
				}),
				a(MediaView, {
					media: entry.media,
					adult: entry.adult
				}),
				a("footer", { children: [a("span", {
					class: "votes",
					children: ["+", fmt(entry.votes ?? 0)]
				}), !full && a(Link, {
					href: "/wpis/" + entry.id,
					class: "comments",
					children: ["\ud83d\udcac ", fmt(entry.commentsCount ?? entry.comments.length)]
				})] })
			]
		});
	}
	function LinkCard({ link }) {
		const photo = safeUrl(link.media.photo);
		const host = link.sourceLabel ?? sourceHost(link.sourceUrl);
		return a("article", {
			class: "card link",
			children: [a(Link, {
				href: "/link/" + link.id + (link.slug ? "/" + link.slug : ""),
				class: "link-main",
				children: [photo && !link.adult && a("img", {
					class: "thumb",
					src: photo,
					alt: "",
					loading: "lazy"
				}), a("div", { children: [a("h2", { children: link.title }), a("div", {
					class: "muted small",
					children: [host, link.createdAt && " \u00b7 " + timeAgo(link.createdAt)]
				})] })]
			}), a("footer", { children: [a("span", {
				class: "votes",
				children: ["\u25b2 ", fmt(link.votes ?? 0)]
			}), a("span", {
				class: "comments",
				children: ["\ud83d\udcac ", fmt(link.commentsCount ?? 0)]
			})] })]
		});
	}
	function CommentView({ c, depth = 0 }) {
		return a("div", {
			class: "comment" + (depth ? " reply" : ""),
			children: [
				a(AuthorLine, {
					author: c.author,
					createdAt: c.createdAt
				}),
				a(Content, { text: c.content }),
				a(MediaView, {
					media: c.media,
					adult: c.media.adult
				}),
				a("div", {
					class: "muted small",
					children: ["+", fmt(c.votes ?? 0)]
				}),
				c.replies.map((r) => a(CommentView, {
					c: r,
					depth: depth + 1
				}, r.id))
			]
		});
	}
	function Status({ loading, error, done, onRetry, empty }) {
		if (error) return a("div", {
			class: "status error",
			children: [
				a("p", { children: error }),
				a("button", {
					onClick: onRetry,
					children: "Spr\u00f3buj ponownie"
				}),
				a("p", {
					class: "small",
					children: [
						"Nie dzia\u0142a? Otw\u00f3rz ",
						a(Link, {
							href: "?wl=diag",
							children: "diagnostyk\u0119"
						}),
						"."
					]
				})
			]
		});
		if (loading) return a("div", {
			class: "status muted",
			children: "\u0141adowanie\u2026"
		});
		if (done && empty) return a("div", {
			class: "status muted",
			children: "Nic tu nie ma."
		});
		if (done) return a("div", {
			class: "status muted",
			children: "To ju\u017c wszystko."
		});
		return null;
	}
	function useOne(key, load) {
		const [state, setState] = d({ loading: true });
		const [n, setN] = d(0);
		A(() => {
			let alive = true;
			setState({ loading: true });
			load().then((data) => alive && setState({
				data,
				loading: false
			}), (e) => alive && setState({
				error: e instanceof Error ? e.message : String(e),
				loading: false
			}));
			return () => {
				alive = false;
			};
		}, [key, n]);
		return {
			...state,
			retry: () => setN((x) => x + 1)
		};
	}
	function Comments({ path, sort }) {
		const feed = useFeed(path + (sort ?? ""), (page) => api.get(path, {
			page,
			sort
		}), toComment, (c) => c.id);
		const ref = useSentinel(feed.loadMore);
		return a("section", {
			class: "comments-list",
			children: [
				feed.items.map((c) => a(CommentView, { c }, c.id)),
				a(Status, {
					...feed,
					onRetry: feed.reload,
					empty: !feed.items.length
				}),
				!feed.done && !feed.error && a("div", {
					ref,
					class: "sentinel"
				})
			]
		});
	}
	function EntryView({ id }) {
		const one = useOne("entry:" + id, () => api.get("/entries/" + id).then((r) => toEntry(r.data)));
		if (!one.data) return a(Status, {
			loading: one.loading,
			error: one.error ?? null,
			done: false,
			onRetry: one.retry
		});
		return a("div", { children: [
			a(EntryCard, {
				entry: one.data,
				full: true
			}),
			a("h3", {
				class: "section",
				children: ["Komentarze ", one.data.commentsCount ? "(" + one.data.commentsCount + ")" : ""]
			}),
			a(Comments, { path: "/entries/" + id + "/comments" })
		] });
	}
	function LinkView({ id }) {
		const one = useOne("link:" + id, () => api.get("/links/" + id).then((r) => toLink(r.data)));
		const [sort, setSort] = d("best");
		if (!one.data) return a(Status, {
			loading: one.loading,
			error: one.error ?? null,
			done: false,
			onRetry: one.retry
		});
		const l = one.data;
		const src = safeUrl(l.sourceUrl);
		return a("div", { children: [
			a("article", {
				class: "card",
				children: [
					a(MediaView, {
						media: l.media,
						adult: l.adult
					}),
					a("h1", {
						class: "link-title",
						children: l.title
					}),
					a("div", {
						class: "muted small",
						children: [
							l.sourceLabel ?? sourceHost(l.sourceUrl),
							l.author && " \u00b7 doda\u0142 " + l.author.username,
							l.createdAt && " \u00b7 " + timeAgo(l.createdAt)
						]
					}),
					a(Content, { text: l.description }),
					src && a("a", {
						class: "button",
						href: src,
						target: "_blank",
						rel: "noopener noreferrer nofollow",
						children: "Otw\u00f3rz \u017ar\u00f3d\u0142o \u2197"
					}),
					a("footer", { children: [a("span", {
						class: "votes",
						children: ["\u25b2 ", l.votes ?? 0]
					}), a("span", {
						class: "muted",
						children: l.tags.map((t) => "#" + t).join(" ")
					})] })
				]
			}),
			a("h3", {
				class: "section",
				children: [
					"Komentarze ",
					l.commentsCount ? "(" + l.commentsCount + ")" : "",
					a("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						children: [
							a("option", {
								value: "best",
								children: "najlepsze"
							}),
							a("option", {
								value: "newest",
								children: "najnowsze"
							}),
							a("option", {
								value: "oldest",
								children: "najstarsze"
							})
						]
					})
				]
			}),
			a(Comments, {
				path: "/links/" + id + "/comments",
				sort
			})
		] });
	}
	var SECRET = /token|secret|password|passwd|^key$|hash|email|phone/i;
	function describe(v, depth = 0, key = "") {
		if (SECRET.test(key) && v !== null && v !== void 0 && typeof v !== "boolean") return "[ukryte:" + typeof v + "]";
		if (v === null) return null;
		if (Array.isArray(v)) {
			if (depth > 5) return "[array " + v.length + "]";
			return v.length ? ["len=" + v.length, describe(v[0], depth + 1)] : [];
		}
		if (typeof v === "object") {
			if (depth > 5) return "{\u2026}";
			const out = {};
			for (const [k, val] of Object.entries(v)) out[k] = describe(val, depth + 1, k);
			return out;
		}
		if (typeof v === "string") return v.length > 60 ? v.slice(0, 60) + "\u2026(" + v.length + ")" : v;
		return v;
	}
	function jwtInfo(t) {
		if (!t) return { present: false };
		const parts = t.split(".");
		if (parts.length !== 3) return {
			present: true,
			jwt: false,
			length: t.length
		};
		try {
			const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
			const exp = typeof payload.exp === "number" ? payload.exp : void 0;
			return {
				present: true,
				jwt: true,
				claims: Object.keys(payload),
				roles: payload.roles,
				expiresInMin: exp ? Math.round((exp * 1e3 - Date.now()) / 6e4) : void 0
			};
		} catch {
			return {
				present: true,
				jwt: "nieczytelny"
			};
		}
	}
	async function runProbe(p, anonymous) {
		const t0 = performance.now();
		try {
			const r = await api.get(p.path, p.params, { anonymous });
			const items = asArray(r.data);
			return {
				ok: true,
				ms: Math.round(performance.now() - t0),
				topKeys: Object.keys(r.raw ?? {}),
				pagination: r.pagination ? describe(r.pagination) : void 0,
				count: Array.isArray(r.data) ? items.length : void 0,
				shape: describe(Array.isArray(r.data) ? r.data[0] : r.data),
				_first: Array.isArray(r.data) ? r.data[0] : r.data
			};
		} catch (e) {
			const err = e;
			return {
				ok: false,
				ms: Math.round(performance.now() - t0),
				status: err.status,
				error: err.message,
				body: describe(err.body)
			};
		}
	}
	function Diag() {
		const [report, setReport] = d("");
		const [running, setRunning] = d(false);
		const [copied, setCopied] = d(false);
		async function run() {
			setRunning(true);
			setCopied(false);
			const results = {};
			const log = () => setReport(JSON.stringify({
				meta,
				results
			}, (k, v) => k === "_first" ? void 0 : v, 1));
			const meta = {
				version: "0.1.0",
				ua: navigator.userAgent,
				url: location.href,
				time: new Date().toISOString(),
				localStorageKeys: Object.keys(localStorage).sort(),
				token: jwtInfo(readToken(localStorage)),
				userKeep: { present: !!localStorage.getItem("userKeep") }
			};
			log();
			const probes = [
				{
					name: "links_homepage",
					path: "/links",
					params: { type: "homepage" }
				},
				{
					name: "links_upcoming",
					path: "/links",
					params: { type: "upcoming" }
				},
				{
					name: "entries_hot",
					path: "/entries",
					params: {
						sort: "hot",
						last_update: 12
					}
				},
				{
					name: "entries_newest",
					path: "/entries",
					params: { sort: "newest" }
				},
				{
					name: "tag_stream",
					path: "/tags/heheszki/stream",
					params: {
						sort: "all",
						type: "all"
					}
				},
				{
					name: "profile_short",
					path: "/profile/short"
				},
				{
					name: "notifications_status",
					path: "/notifications/status"
				}
			];
			let firstEntry;
			let firstLink;
			for (const p of probes) {
				const withToken = await runProbe(p, false);
				const r = {
					path: p.path,
					params: p.params,
					withToken
				};
				if (!withToken.ok) r.anonymous = await runProbe(p, true);
				const first = (withToken.ok ? withToken : r.anonymous)?._first;
				if (p.name === "entries_hot" && first?.id) firstEntry = String(first.id);
				if (p.name === "links_homepage" && first?.id) firstLink = String(first.id);
				results[p.name] = r;
				log();
			}
			const detail = [];
			if (firstEntry) detail.push({
				name: "entry",
				path: "/entries/" + firstEntry
			}, {
				name: "entry_comments",
				path: "/entries/" + firstEntry + "/comments"
			});
			if (firstLink) detail.push({
				name: "link",
				path: "/links/" + firstLink
			}, {
				name: "link_comments",
				path: "/links/" + firstLink + "/comments",
				params: { sort: "best" }
			});
			for (const p of detail) {
				results[p.name] = {
					path: p.path,
					params: p.params,
					withToken: await runProbe(p, false)
				};
				log();
			}
			setRunning(false);
		}
		async function copy() {
			try {
				await navigator.clipboard.writeText(report);
				setCopied(true);
			} catch {
				(document.querySelector("wykop-ai")?.shadowRoot?.querySelector("textarea"))?.select();
			}
		}
		return a("div", {
			class: "diag",
			children: [
				a("h1", {
					class: "page-title",
					children: "Diagnostyka"
				}),
				a("p", {
					class: "small",
					children: "Sprawdza kilka zapyta\u0144 do API i zapisuje ich struktur\u0119. Raport nie zawiera token\u00f3w. Skopiuj go i wklej w rozmowie z Claude."
				}),
				a("div", {
					class: "row",
					children: [a("button", {
						onClick: run,
						disabled: running,
						children: running ? "Sprawdzam\u2026" : "Uruchom test"
					}), a("button", {
						onClick: copy,
						disabled: !report || running,
						children: copied ? "Skopiowano \u2713" : "Kopiuj raport"
					})]
				}),
				report && a("textarea", {
					readOnly: true,
					value: report,
					rows: 20
				})
			]
		});
	}
	function Sentinel({ onVisible }) {
		return a("div", {
			ref: useSentinel(onVisible),
			class: "sentinel"
		});
	}
	function LinksList({ type }) {
		const feed = useFeed("links:" + type, (page) => api.get("/links", {
			type,
			page
		}), toLink, (l) => l.id);
		return a("div", { children: [
			feed.items.map((l) => a(LinkCard, { link: l }, l.id)),
			a(Status, {
				...feed,
				onRetry: feed.reload,
				empty: !feed.items.length
			}),
			!feed.done && !feed.error && a(Sentinel, { onVisible: feed.loadMore })
		] });
	}
	var SORTS = [
		["hot", "Gor\u0105ce"],
		["newest", "Najnowsze"],
		["active", "Aktywne"]
	];
	function Mikroblog({ sort }) {
		const feed = useFeed("entries:" + sort, (page) => api.get("/entries", {
			sort,
			page,
			last_update: sort === "hot" ? 12 : void 0
		}), toEntry, (e) => e.id);
		return a("div", { children: [
			a("nav", {
				class: "subnav",
				children: SORTS.map(([s, label]) => a(Link, {
					href: s === "hot" ? "/mikroblog" : "/mikroblog?sort=" + s,
					class: s === sort ? "on" : "",
					children: label
				}, s))
			}),
			feed.items.map((e) => a(EntryCard, { entry: e }, e.id)),
			a(Status, {
				...feed,
				onRetry: feed.reload,
				empty: !feed.items.length
			}),
			!feed.done && !feed.error && a(Sentinel, { onVisible: feed.loadMore })
		] });
	}
	function TagView({ tag }) {
		const feed = useFeed("tag:" + tag, (page) => api.get("/tags/" + encodeURIComponent(tag) + "/stream", {
			page,
			sort: "all",
			type: "all"
		}), toItem, (i) => i.kind + i.id);
		return a("div", { children: [
			a("h1", {
				class: "page-title",
				children: ["#", tag]
			}),
			feed.items.map((i) => i.kind === "link" ? a(LinkCard, { link: i }, "l" + i.id) : i.kind === "entry" ? a(EntryCard, { entry: i }, "e" + i.id) : null),
			a(Status, {
				...feed,
				onRetry: feed.reload,
				empty: !feed.items.length
			}),
			!feed.done && !feed.error && a(Sentinel, { onVisible: feed.loadMore })
		] });
	}
	var OFF_KEY = "wl:off";
	function openOriginal() {
		try {
			sessionStorage.setItem(OFF_KEY, "1");
		} catch {}
		location.reload();
	}
	function View({ route }) {
		switch (route.name) {
			case "home": return a(LinksList, { type: route.type }, route.type);
			case "mikroblog": return a(Mikroblog, { sort: route.sort }, route.sort);
			case "entry": return a(EntryView, { id: route.id }, route.id);
			case "link": return a(LinkView, { id: route.id }, route.id);
			case "tag": return a(TagView, { tag: route.tag }, route.tag);
			case "diag": return a(Diag, {});
			case "unsupported": return a("div", {
				class: "status",
				children: [a("p", { children: "Ten widok nie jest jeszcze obs\u0142ugiwany." }), a("button", {
					onClick: openOriginal,
					children: "Poka\u017c w oryginalnym Wykopie"
				})]
			});
		}
	}
	function App() {
		const loc = useLocation();
		const url = new URL(loc, location.origin);
		const route = parseRoute(url.pathname, url.search);
		const [menu, setMenu] = d(false);
		const tab = route.name === "home" ? route.type : route.name;
		return a("div", {
			class: "app",
			children: [
				a("header", {
					class: "top",
					children: [a("nav", {
						class: "tabs",
						children: [
							a(Link, {
								href: "/",
								class: tab === "homepage" ? "on" : "",
								children: "G\u0142\u00f3wna"
							}),
							a(Link, {
								href: "/wykopalisko",
								class: tab === "upcoming" ? "on" : "",
								children: "Wykopalisko"
							}),
							a(Link, {
								href: "/mikroblog",
								class: tab === "mikroblog" ? "on" : "",
								children: "Mikroblog"
							})
						]
					}), a("button", {
						class: "menu-btn",
						"aria-label": "Menu",
						onClick: () => setMenu(!menu),
						children: "\u22ef"
					})]
				}),
				menu && a("div", {
					class: "menu",
					onClick: () => setMenu(false),
					children: [
						a(Link, {
							href: "?wl=diag",
							children: "Diagnostyka"
						}),
						a("button", {
							onClick: openOriginal,
							children: "Oryginalny Wykop (ta karta)"
						}),
						a("a", {
							href: "https://github.com/rafc1u/wykop-ai",
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["O projekcie \u00b7 v", "0.1.0"]
						})
					]
				}),
				a("main", { children: a(View, { route }) }),
				a("footer", {
					class: "foot small muted",
					children: "Nieoficjalny klient. Niepowi\u0105zany z Wykop sp. z o.o."
				})
			]
		});
	}
	var CSS = `
:host { all: initial; display: block; }
* { box-sizing: border-box; }
.app {
  --bg: #f4f5f7; --card: #fff; --ink: #16181d; --muted: #6b7280; --line: #e5e7eb;
  --accent: #1f6f5c; --accent-ink: #fff; --tag: #1d5fa8;
  font: 16px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--ink); background: var(--bg); min-height: 100vh;
  -webkit-text-size-adjust: 100%;
  padding-bottom: env(safe-area-inset-bottom);
}
@media (prefers-color-scheme: dark) {
  .app { --bg: #0f1115; --card: #181b21; --ink: #e8eaed; --muted: #9aa0a6; --line: #2a2e36; --accent: #3fa58a; --tag: #7cb3f0; }
}
a { color: inherit; text-decoration: none; }
button, select { font: inherit; color: inherit; }
button {
  background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 8px 14px; cursor: pointer;
}
button:disabled { opacity: .5; }
.top {
  position: sticky; top: 0; z-index: 10; display: flex; align-items: center;
  background: var(--card); border-bottom: 1px solid var(--line);
  padding: env(safe-area-inset-top) 4px 0 4px;
}
.tabs { display: flex; flex: 1; overflow-x: auto; }
.tabs a, .subnav a { padding: 12px 12px; color: var(--muted); font-weight: 600; white-space: nowrap; }
.tabs a.on, .subnav a.on { color: var(--accent); box-shadow: inset 0 -2px 0 var(--accent); }
.menu-btn { border: 0; background: none; font-size: 22px; padding: 6px 12px; }
.menu {
  position: fixed; right: 8px; top: calc(52px + env(safe-area-inset-top)); z-index: 20;
  background: var(--card); border: 1px solid var(--line); border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column; min-width: 240px; box-shadow: 0 8px 24px rgba(0,0,0,.18);
}
.menu a, .menu button { padding: 14px 16px; border: 0; border-radius: 0; text-align: left; background: none; border-bottom: 1px solid var(--line); }
.subnav { display: flex; gap: 4px; padding: 0 8px; background: var(--card); border-bottom: 1px solid var(--line); }
main { max-width: 720px; margin: 0 auto; padding: 8px 0; }
.card { background: var(--card); margin: 8px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); }
.card footer { display: flex; gap: 16px; align-items: center; margin-top: 10px; color: var(--muted); font-size: 14px; }
.votes { color: var(--accent); font-weight: 700; }
.author { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 14px; }
.avatar { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; flex: none; background: var(--line); }
.nick { font-weight: 700; }
.muted { color: var(--muted); }
.small { font-size: 13px; }
.content p { margin: 0 0 8px; overflow-wrap: anywhere; }
.content p:last-child { margin-bottom: 0; }
.content a { color: var(--tag); }
.content .user { font-weight: 600; }
.content blockquote { margin: 6px 0; padding: 4px 10px; border-left: 3px solid var(--line); color: var(--muted); }
.content code { font: 14px ui-monospace, Menlo, monospace; background: var(--bg); padding: 1px 4px; border-radius: 4px; }
.content pre { overflow-x: auto; background: var(--bg); padding: 8px; border-radius: 8px; }
.spoiler summary { color: var(--muted); cursor: pointer; }
.body.clamp { max-height: 14em; overflow: hidden; -webkit-mask-image: linear-gradient(#000 70%, transparent); }
.more { margin-top: 4px; padding: 4px 10px; font-size: 14px; }
.media { margin-top: 8px; }
.media img { display: block; max-width: 100%; max-height: 70vh; border-radius: 10px; }
.embed { display: block; position: relative; }
.embed span { display: inline-block; margin-top: 6px; color: var(--tag); }
.adult { margin-top: 8px; }
.link .link-main { display: flex; gap: 12px; align-items: flex-start; }
.thumb { width: 96px; height: 72px; object-fit: cover; border-radius: 10px; flex: none; background: var(--line); }
.link h2 { font-size: 16px; line-height: 1.3; margin: 0 0 4px; }
.link-title { font-size: 20px; line-height: 1.25; margin: 10px 0 4px; }
.button { display: inline-block; margin-top: 10px; padding: 8px 14px; border-radius: 10px; background: var(--accent); color: var(--accent-ink); font-weight: 600; }
.section { display: flex; justify-content: space-between; align-items: center; margin: 16px 14px 4px; font-size: 15px; }
.section select { font-size: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 4px; }
.comments-list { margin: 0 8px; }
.comment { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; margin: 8px 0; }
.comment.reply { border: 0; border-left: 2px solid var(--line); border-radius: 0; padding: 6px 0 6px 10px; margin: 8px 0 0 4px; }
.status { text-align: center; padding: 24px 16px; }
.status.error p { color: #c0392b; }
.page-title { font-size: 20px; margin: 12px 14px 4px; }
.sentinel { height: 1px; }
.foot { text-align: center; padding: 16px; }
.diag { padding: 0 14px; }
.diag .row { display: flex; gap: 8px; margin: 12px 0; }
.diag textarea { width: 100%; font: 12px ui-monospace, Menlo, monospace; background: var(--card); color: var(--ink); border: 1px solid var(--line); border-radius: 8px; }
`;
	var PASSTHROUGH = /^\/(logowanie|rejestracja|connect|zaloguj|wyloguj|api|ustawienia|reset-hasla)(\/|$)/;
	function isOff() {
		const q = new URLSearchParams(location.search);
		try {
			if (q.get("oryginal") === "1") sessionStorage.setItem(OFF_KEY, "1");
			if (q.get("oryginal") === "0") sessionStorage.removeItem(OFF_KEY);
			return sessionStorage.getItem(OFF_KEY) === "1";
		} catch {
			return q.get("oryginal") === "1";
		}
	}
	function onReady(fn) {
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
		else fn();
	}
	function backButton() {
		onReady(() => {
			const b = document.createElement("button");
			b.textContent = "wykop-ai";
			b.setAttribute("aria-label", "Wr\u00f3\u0107 do wykop-ai");
			Object.assign(b.style, {
				position: "fixed",
				right: "12px",
				bottom: "calc(12px + env(safe-area-inset-bottom))",
				zIndex: "2147483647",
				padding: "8px 12px",
				borderRadius: "18px",
				border: "0",
				background: "#1f6f5c",
				color: "#fff",
				font: "600 13px -apple-system, sans-serif",
				boxShadow: "0 4px 12px rgba(0,0,0,.25)",
				opacity: "0.85"
			});
			b.onclick = () => {
				try {
					sessionStorage.removeItem(OFF_KEY);
				} catch {}
				location.reload();
			};
			document.body.appendChild(b);
		});
	}
	function start() {
		if (window.top !== window.self) return;
		if (PASSTHROUGH.test(location.pathname)) return;
		if (isOff()) {
			backButton();
			return;
		}
		const hide = document.createElement("style");
		hide.textContent = "html > body { display: none !important; } html { overflow: auto !important; height: auto !important; background: #f4f5f7; }@media (prefers-color-scheme: dark) { html { background: #0f1115; } }";
		if (document.documentElement) document.documentElement.appendChild(hide);
		else onReady(() => document.documentElement.appendChild(hide));
		onReady(() => {
			const host = document.createElement("wykop-ai");
			const root = host.attachShadow({ mode: "open" });
			const style = document.createElement("style");
			style.textContent = CSS;
			const mount = document.createElement("div");
			root.append(style, mount);
			document.documentElement.appendChild(host);
			Q(a(App, {}), mount);
			new MutationObserver(() => {
				if (!host.isConnected) document.documentElement.appendChild(host);
				if (!hide.isConnected) document.documentElement.appendChild(hide);
			}).observe(document.documentElement, { childList: true });
		});
	}
	start();
})();
