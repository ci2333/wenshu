var window={}

var pos;

e='-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCm1MThivLr5bOB2Cdc+4U1xh85\n3eraFD2EiaLwZWdSW1G3tse5JokoRwQiSZKa0ts\/b4SopNB2piPytCAAmiV6vfTQ\nYFdGy\/LJN1fGmar69WA1j122iTv5wX3pAJt8lY9H5iY4uK6gAgzsnMDeNrAawEY3\n1Gz3Rhgs9LDyQGBJIQIDAQAB\n-----END PUBLIC KEY-----\n';

var t, n = {};
n.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;

function t1(e, n) {
    // e instanceof t1 ? (this.enc = e.enc,
    //     this.pos = e.pos) : (this.enc = e,
    //     this.pos = n)

    e instanceof t1 ? (this.enc = e.enc,
        pos = e.pos) : (this.enc = e,
        pos = n)
}
function eget(t) {
    if (t === e && (t = pos++),
    t >= this.enc.length)
        throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
    return this.enc[t]
}
n.hasContent = function(e, i, s) {
    if (32 & e)
        return !0;
    if (3 > e || e > 4)
        return !1;
    var o = new t(s);
    3 == e && o.get();
    var r = o.get();
    if (r >> 6 & 1)
        return !1;
    try {
        var a = n.decodeLength(o);
        return o.pos - s.pos + a == i
    } catch (c) {
        return !1
    }
}
n.decode=function(n) {
    var i;
    // if (t === e) {
    if (true){
        var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
            , o = "= \f\n\r	 \u2028\u2029";
        for (t = [],
                 i = 0; 64 > i; ++i)
            t[s.charAt(i)] = i;
        for (i = 0; i < o.length; ++i)
            t[o.charAt(i)] = -1
    }
    var r = []
        , a = 0
        , c = 0;
    for (i = 0; i < n.length; ++i) {
        var l = n.charAt(i);
        if ("=" == l)
            break;
        if (l = t[l],
            // if(false,
        -1 != l) {
            if (l === e)
                throw "Illegal character at offset " + i;
            a |= l,
                ++c >= 4 ? (r[r.length] = a >> 16,
                    r[r.length] = a >> 8 & 255,
                    r[r.length] = 255 & a,
                    a = 0,
                    c = 0) : a <<= 6
        }
    }
    switch (c) {
        case 1:
            throw "Base64 encoding incomplete: at least 2 bits missing";
        case 2:
            r[r.length] = a >> 10;
            break;
        case 3:
            r[r.length] = a >> 16,
                r[r.length] = a >> 8 & 255
    }
    return r
};
function decode(n) {
    var i;
    if (t === e) {
        var s = "0123456789ABCDEF"
            , o = " \f\n\r	 \u2028\u2029";
        for (t = [],
                 i = 0; 16 > i; ++i)
            t[s.charAt(i)] = i;
        for (s = s.toLowerCase(),
                 i = 10; 16 > i; ++i)
            t[s.charAt(i)] = i;
        for (i = 0; i < o.length; ++i)
            t[o.charAt(i)] = -1
    }
    var r = []
        , a = 0
        , c = 0;
    for (i = 0; i < n.length; ++i) {
        var l = n.charAt(i);
        if ("=" == l)
            break;
        if (l = t[l],
        -1 != l) {
            if (l === e)
                throw "Illegal character at offset " + i;
            a |= l,
                ++c >= 2 ? (r[r.length] = a,
                    a = 0,
                    c = 0) : a <<= 4
        }
    }
    // if (c)
    //     throw "Hex encoding incomplete: 4 bits missing";
    return r
}
function decode1(e) {
    e instanceof t1 || (e = new t1(e,0));
    var i = new t1(e)
        // , s = e.get()
        , s = eget()//稍后处理暂给定
        , o = n.decodeLength(e)
    , r = e.pos - i.pos
        , a = null;
    if (n.hasContent(s, o, e)) {

        var c = e.pos;
        if (3 == s && e.get(),//暂定6
        // if (3 == s && 6,
            a = [],
        o >= 0) {
            for (var l = c + o; e.pos < l; )
                a[a.length] = n.decode(e);

            if (e.pos != l)
                throw "Content size is not correct for container starting at offset " + c
        } else
            try {
                for (; ; ) {
                    var d = n.decode(e);
                    if (0 === d.tag)
                        break;
                    a[a.length] = d
                }
                o = c - e.pos
            } catch (u) {
                throw "Exception while decoding undefined length content: " + u
            }
    } else
        e.pos += o;
    return new n(i,r,o,s,a)
}
function unarmor(e) {
    var t = n.re.exec(e);
    if (t)
        if (t[1])
            e = t[1];
        else {
            if (!t[2])
                throw "RegExp out of sync";
            e = t[2]
        }
    return n.decode(e)
}
function parseKey(e) {
    try {
        var t = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
            // , n = t.test(e) ? Hex.decode(e) : Base64.unarmor(e)
            , n = t.test(e) ? decode(e) : unarmor(e)
            // , i = ASN1.decode(n);
            , i = decode1(n);
        if (9 === i.sub.length) {
            var s = i.sub[1].getHexStringValue();
            this.n = dn(s, 16);
            var o = i.sub[2].getHexStringValue();
            this.e = parseInt(o, 16);
            var r = i.sub[3].getHexStringValue();
            this.d = dn(r, 16);
            var a = i.sub[4].getHexStringValue();
            this.p = dn(a, 16);
            var c = i.sub[5].getHexStringValue();
            this.q = dn(c, 16);
            var l = i.sub[6].getHexStringValue();
            this.dmp1 = dn(l, 16);
            var d = i.sub[7].getHexStringValue();
            this.dmq1 = dn(d, 16);
            var u = i.sub[8].getHexStringValue();
            this.coeff = dn(u, 16)
        } else {
            if (2 !== i.sub.length)
                return !1;
            var p = i.sub[1]
                , g = p.sub[0]
                , s = g.sub[0].getHexStringValue();
            this.n = dn(s, 16);
            var o = g.sub[1].getHexStringValue();
            this.e = parseInt(o, 16)
        }
        return !0
    } catch (m) {
        return !1
    }
}
function hasPrivateKeyProperty(e) {
    return e = e || {},
    e.hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
}
function hasPublicKeyProperty(e) {
    return e = e || {},
    e.hasOwnProperty("n") && e.hasOwnProperty("e")
}
function parsePropertiesFrom(e) {
    this.n = e.n,
        this.e = e.e,
    e.hasOwnProperty("d") && (this.d = e.d,
        this.p = e.p,
        this.q = e.q,
        this.dmp1 = e.dmp1,
        this.dmq1 = e.dmq1,
        this.coeff = e.coeff)
}

var Jn = function(e) {
    // debugger;
    // pn.call(this),
    // e && ("string" == typeof e ? this.parseKey(e) : (this.hasPrivateKeyProperty(e) || this.hasPublicKeyProperty(e)) && this.parsePropertiesFrom(e))
    e && ("string" == typeof e ? parseKey(e) : (hasPrivateKeyProperty(e) || hasPublicKeyProperty(e)) && parsePropertiesFrom(e))


};
cc=Jn(e);
