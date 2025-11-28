(() => {
  var h = ["eng", "por", "esp", "fra", "nor", "suo", "deu"],
    b = { method: "replace", cleanDefault: !0, fallback: "eng", param: "lang" },
    k = {
      eng: "en",
      por: "pt",
      esp: "es",
      fra: "fr",
      nor: "no",
      suo: "fi",
      deu: "de",
    },
    p = {
      eng: {
        title: "Try your luck in Plinko ",
        "langing-title": "Try your luck in",
        "landing-name": "Plinko ",
        "landing-btn": "Spin the wheel",
        "landing-popup-title": "Big win",
        "landing-popup-subtitle": "you have got up to",
        "landing-popup-btn": "Claim bonus",
        "landing-wheel-deposit": "to deposite",
        "landing-wheel-prize": "prize",
        "landing-wheel-no": "no",
      },
      esp: {
        title: "Prueba tu suerte en Plinko ",
        "langing-title": "Prueba tu suerte en",
        "landing-name": "Plinko ",
        "landing-btn": "Gira la rueda",
        "landing-popup-title": "Gran victoria",
        "landing-popup-subtitle": "has conseguido hasta",
        "landing-popup-btn": "Reclama el bono",
        "landing-wheel-deposit": "Depositar",
        "landing-wheel-prize": "premio",
        "landing-wheel-no": "Sin",
      },
      por: {
        title: "Tente a sorte em Plinko ",
        "langing-title": "Tente a sorte em",
        "landing-name": "Plinko ",
        "landing-btn": "Gire a roleta",
        "landing-popup-title": "Grande vit\xF3ria",
        "landing-popup-subtitle": "voc\xEA ganhou at\xE9",
        "landing-popup-btn": "Resgatar b\xF4nus",
        "landing-wheel-deposit": "Depositar",
        "landing-wheel-prize": "pr\xEAmio",
        "landing-wheel-no": "Sem",
      },
      suo: {
        title: "Kokeile onneasi Plinko ",
        "langing-title": "Kokeile onneasi",
        "landing-name": "Plinko ",
        "landing-btn": "Py\xF6rit\xE4 py\xF6r\xE4\xE4",
        "landing-popup-title": "Iso voitto",
        "landing-popup-subtitle": "sait jopa",
        "landing-popup-btn": "Lunasta bonus",
        "landing-wheel-deposit": "Talleta",
        "landing-wheel-prize": "palkintoa",
        "landing-wheel-no": "Ei",
      },
      fra: {
        title: "Essayez votre chance dans Plinko ",
        "langing-title": "Essayez votre chance dans",
        "landing-name": "Plinko ",
        "landing-btn": "Faites tourner la roue",
        "landing-popup-title": "Gros gain",
        "landing-popup-subtitle": "vous avez obtenu jusqu\u2019\xE0",
        "landing-popup-btn": "R\xE9clamez le bonus",
        "landing-wheel-deposit": "D\xE9poser",
        "landing-wheel-prize": "de prix",
        "landing-wheel-no": "Pas",
      },
      nor: {
        title: "Pr\xF8v lykken i Plinko ",
        "langing-title": "Pr\xF8v lykken i",
        "landing-name": "Plinko ",
        "landing-btn": "Spinn hjulet",
        "landing-popup-title": "Stor gevinst",
        "landing-popup-subtitle": "du har f\xE5tt opptil",
        "landing-popup-btn": "Hent bonus",
        "landing-wheel-deposit": "Sett inn",
        "landing-wheel-prize": "premie",
        "landing-wheel-no": "Ingen",
      },
      deu: {
        title: "Versuche dein Gl\xFCck in Plinko ",
        "langing-title": "Versuche dein Gl\xFCck in",
        "landing-name": "Plinko ",
        "landing-btn": "Drehe das Rad",
        "landing-popup-title": "Gro\xDFer Gewinn",
        "landing-popup-subtitle": "du hast bis zu",
        "landing-popup-btn": "Bonus einl\xF6sen",
        "landing-wheel-deposit": "Einzahlen",
        "landing-wheel-prize": "Preis",
        "landing-wheel-no": "Preis",
      },
    };
  function f() {
    let e = new URLSearchParams(location.search).get("lang");
    if (e && h.includes(e)) return e;
    let t = localStorage.getItem("lang");
    return t && h.includes(t) ? t : "eng";
  }
  var v = !1;
  async function w(e) {
    if (!v) {
      v = !0;
      try {
        let t = h.includes(e) ? e : "eng",
          a = p == null ? void 0 : p[t];
        if (!a) throw new Error("No translations embedded");
        q(a),
          (document.documentElement.lang = k[t] || "en"),
          localStorage.setItem("lang", t),
          x(t, b),
          document
            .querySelectorAll(".navigationWrapper .navigation")
            .forEach((n) => z(n, t)),
          window.dispatchEvent(
            new CustomEvent("langchange", { detail: { lang: t } })
          );
      } catch (t) {
        console.error(t);
        let a = p == null ? void 0 : p["eng"];
        a &&
          (q(a),
          (document.documentElement.lang = k.eng || "en"),
          localStorage.setItem("lang", "eng"),
          x("eng", b),
          window.dispatchEvent(
            new CustomEvent("langchange", { detail: { lang: "eng" } })
          ));
      } finally {
        (v = !1), T();
      }
    }
  }
  function C() {
    document.querySelectorAll(".navigationWrapper .navigation").forEach(D);
  }
  function q(e) {
    document.querySelectorAll("[data-translate]").forEach((t) => {
      let a = t.dataset.translate;
      e[a] != null && (t.textContent = e[a]);
    }),
      document.querySelectorAll("[data-translate-attr]").forEach((t) => {
        var n;
        let a =
          ((n = t.getAttribute("data-translate-attr")) == null
            ? void 0
            : n
                .split(";")
                .map((o) => o.trim())
                .filter(Boolean)) || [];
        for (let o of a) {
          let [i, r] = o.split(":");
          i && r && e[r] != null && t.setAttribute(i, e[r]);
        }
      });
  }
  function z(e, t) {
    let a = e.querySelector(".navigation__items");
    if (!a) return;
    a.querySelectorAll(".navigation__item").forEach((r) => {
      let s = r.getAttribute("value") === t;
      r.classList.toggle("is-active", s),
        r.setAttribute("aria-selected", s ? "true" : "false"),
        (r.hidden = !1),
        r.setAttribute("aria-hidden", "false"),
        (r.tabIndex = -1);
    });
    let n =
      [...a.querySelectorAll(".navigation__item")].find(
        (r) => r.getAttribute("value") === t
      ) || a.querySelector(".navigation__item.is-active");
    n && ((n.hidden = !0), n.setAttribute("aria-hidden", "true"));
    let o = e.querySelector(".navigation__mainBlock .navigation__itemImg"),
      i = e.querySelector(".navigation__mainBlock .navigation__itemText");
    if (o || i) {
      let r = n == null ? void 0 : n.querySelector(".navigation__itemImg"),
        s = n == null ? void 0 : n.querySelector(".navigation__itemText");
      o && r && ((o.src = r.src), (o.alt = r.alt || "")),
        i && s && (i.textContent = s.textContent);
    }
  }
  function D(e) {
    var c, d;
    let t = e.querySelector(".navigation__items");
    if (!t) return;
    e.setAttribute("role", "button"),
      (e.tabIndex = 0),
      e.setAttribute("aria-haspopup", "listbox"),
      t.id || (t.id = "lang-menu-" + Math.random().toString(36).slice(2)),
      e.setAttribute("aria-controls", t.id),
      e.setAttribute("aria-expanded", "false"),
      t.setAttribute("role", "listbox"),
      t.querySelectorAll(".navigation__item").forEach((l) => {
        l.setAttribute("role", "option"), (l.tabIndex = -1);
      });
    let a =
      (d =
        (c = e.querySelector(".navigation__mainBlock .navigation__itemText")) ==
        null
          ? void 0
          : c.textContent) == null
        ? void 0
        : d.trim();
    a &&
      t.querySelectorAll(".navigation__itemText").forEach((l) => {
        if (l.textContent.trim() === a) {
          let u = l.closest(".navigation__item");
          u && ((u.hidden = !0), u.setAttribute("aria-hidden", "true"));
        }
      });
    let n = () => e.classList.contains("is-open"),
      o = () => {
        n() ||
          (e.classList.add("is-open"), e.setAttribute("aria-expanded", "true"));
      },
      i = () => {
        n() &&
          (e.classList.remove("is-open"),
          e.setAttribute("aria-expanded", "false"));
      },
      r = () => (n() ? i() : o());
    e.addEventListener(
      "pointerup",
      (l) => {
        l.pointerType !== "mouse" &&
          (t.contains(l.target) ||
            (l.preventDefault(), l.stopPropagation(), r()));
      },
      { passive: !1 }
    ),
      document.addEventListener("pointerdown", (l) => {
        e.parentElement.contains(l.target) || i();
      }),
      e.addEventListener("keydown", (l) => {
        l.key === "Enter" || l.key === " "
          ? (l.preventDefault(), r())
          : l.key === "Escape"
          ? n() && (l.preventDefault(), i(), e.focus())
          : (l.key === "ArrowDown" || l.key === "Down") && !n() && (o(), K(t));
      });
    function s(l) {
      let u = l.target.closest(".navigation__item");
      if (!u) return;
      l.cancelable && l.preventDefault(), l.stopPropagation();
      let _ = u.closest("a");
      _ && (l.cancelable && l.preventDefault(), _.setAttribute("href", "#"));
      let E = u.getAttribute("value"),
        S = () =>
          requestAnimationFrame(() => {
            var g, m;
            i(),
              T(),
              e.blur(),
              (m = (g = document.activeElement) == null ? void 0 : g.blur) ==
                null || m.call(g);
          });
      if (h.includes(E)) Promise.resolve(w(E)).finally(S);
      else {
        let g = u.querySelector(".navigation__itemImg"),
          m = u.querySelector(".navigation__itemText"),
          y = e.querySelector(".navigation__itemImg"),
          P = e.querySelector(".navigation__itemText");
        g && y && ((y.src = g.src), (y.alt = g.alt || "")),
          m && P && (P.textContent = m.textContent),
          S();
      }
    }
    t.addEventListener("click", s),
      t.addEventListener("touchend", s, { passive: !1 }),
      t.addEventListener("pointerup", s, { passive: !1 }),
      window.addEventListener("orientationchange", i),
      window.addEventListener("resize", i),
      document.addEventListener("visibilitychange", () => {
        document.hidden && i();
      }),
      (e.style.touchAction = "manipulation"),
      (t.style.touchAction = "manipulation");
  }
  function K(e) {
    let t = [...e.querySelectorAll(".navigation__item:not([hidden])")][0];
    t && t.focus();
  }
  function T() {
    document.querySelectorAll(".navigation.is-open").forEach((e) => {
      e.classList.remove("is-open"), e.setAttribute("aria-expanded", "false");
      let t = e.querySelector(".navigation__items");
      t &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.pointerEvents = "none"),
        (t.style.visibility = "hidden"),
        (t.style.opacity = "0"),
        requestAnimationFrame(() => {
          t.removeAttribute("aria-hidden"),
            (t.style.pointerEvents = ""),
            (t.style.visibility = ""),
            (t.style.opacity = "");
        }));
    });
  }
  function B() {
    try {
      document.querySelectorAll(":hover").forEach((e) => {
        var t;
        return (t = e.blur) == null ? void 0 : t.call(e);
      });
    } catch (e) {}
  }
  function x(e, t = b) {
    let {
      method: a = "replace",
      cleanDefault: n = !1,
      fallback: o = "eng",
      param: i = "lang",
    } = t || {};
    try {
      let r = new URL(window.location.href);
      n && e === o ? r.searchParams.delete(i) : r.searchParams.set(i, e);
      let s = r.pathname + (r.search || "") + (r.hash || ""),
        c = location.pathname + location.search + location.hash;
      if (s === c) return;
      a === "push"
        ? history.pushState(null, "", s)
        : history.replaceState(null, "", s);
    } catch (r) {
      let s = new URLSearchParams(location.search);
      n && e === o ? s.delete(i) : s.set(i, e);
      let c = s.toString(),
        d = location.pathname + (c ? `?${c}` : "") + location.hash,
        l = location.pathname + location.search + location.hash;
      if (d === l) return;
      history.replaceState(null, "", d);
    }
  }
  function I() {
    let e = document.querySelector(".wheel__btn"),
      t = document.querySelector(".wheel__img"),
      a = document.querySelector(".button"),
      n = document.querySelector(".button__mobile"),
      o = document.querySelector(".wheel__spin"),
      i = document.getElementById("modal"),
      r = document.querySelector(".modal__button"),
      s = 0,
      c = () => {
        s > 0 ||
          localStorage.getItem("game-spun") === "true" ||
          (s++,
          (e.disabled = !0),
          o.classList.remove("wheel--idle"),
          setTimeout(() => {
            o.classList.add("wheel--spinning");
            let d = 360 * 5 + 180;
            (o.style.transform = `rotate(${d}deg)`),
              setTimeout(() => {
                (e.disabled = !1),
                  i.classList.add("open"),
                  document.body.classList.add("modal-open"),
                  localStorage.setItem("game-spun", "true"),
                  document.dispatchEvent(new CustomEvent("slot:bigwin"));
              }, 5500);
          }, 0));
      };
    e.addEventListener("click", c),
      t.addEventListener("click", c),
      a.addEventListener("click", c),
      n.addEventListener("click", c),
      localStorage.getItem("game-spun") === "true" &&
        ([e, t, a, n]
          .filter((l) => l !== null)
          .forEach((l) => {
            l.setAttribute("aria-disabled", "true"),
              l.setAttribute("disabled", "");
          }),
        i == null || i.classList.add("open"),
        document.body.classList.add("modal-open"),
        requestAnimationFrame(() =>
          document.dispatchEvent(new CustomEvent("slot:bigwin"))
        ));
  }
  function R() {
    var e;
    (e = document.getElementById("popup")) == null ||
      e.classList.add("is-open");
  }
  function F() {
    document.addEventListener("slot:bigwin", R);
  }
  var G = {
    eng: [
      { src: "img/footer/interac.svg", alt: "Interac" },
      { src: "img/footer/visa.svg", alt: "Visa" },
      { src: "img/footer/applepay.svg", alt: "Apple Pay" },
      { src: "img/footer/googlepay.svg", alt: "Google Pay" },
      { src: "img/footer/tetherb.svg", alt: "Tether Bitcoin" },
      { src: "img/footer/age.svg", alt: "18+" },
    ],
    deu: [
      { src: "img/footer/klarna.svg", alt: "Klarna" },
      { src: "img/footer/visa.svg", alt: "Visa" },
      { src: "img/footer/applepay.svg", alt: "Apple Pay" },
      { src: "img/footer/googlepay.svg", alt: "Google Pay" },
      { src: "img/footer/union.svg", alt: "Union" },
      { src: "img/footer/tetherb.svg", alt: "Tether Bitcoin" },
      { src: "img/footer/neteller.svg", alt: "Neteller" },
      { src: "img/footer/scrill.svg", alt: "Scrill" },
      { src: "img/footer/rapid.svg", alt: "Rapid" },
      { src: "img/footer/vector.svg", alt: "Vector" },
      { src: "img/footer/openbanking.svg", alt: "Open banking" },
      { src: "img/footer/age.svg", alt: "18+" },
    ],
    general: [
      { src: "img/footer/visa.svg", alt: "Visa" },
      { src: "img/footer/applepay.svg", alt: "Apple Pay" },
      { src: "img/footer/googlepay.svg", alt: "Google Pay" },
      { src: "img/footer/tetherb.svg", alt: "Tether Bitcoin" },
      { src: "img/footer/age.svg", alt: "18+" },
    ],
  };
  function M(e) {
    return e === "eng" ? "eng" : e === "deu" ? "deu" : "general";
  }
  function L(e) {
    let t = M(e),
      a = G[t] || G.general,
      n = document.querySelector(".footer .footer__items");
    if (n) {
      n.innerHTML = "";
      for (let o of a) {
        let i = document.createElement("div");
        i.className = "footer__item";
        let r = document.createElement("img");
        (r.decoding = "async"),
          (r.src = o.src),
          (r.alt = o.alt || ""),
          i.appendChild(r),
          n.appendChild(i);
      }
    }
  }
  function A() {
    L(f());
  }
  function O() {
    return new Promise((e) => requestAnimationFrame(() => e()));
  }
  async function U() {
    let e = [...document.querySelectorAll('link[rel="stylesheet"]')];
    await Promise.all(
      e.map(
        (n) =>
          new Promise((o) => {
            n.addEventListener("load", o, { once: !0 }),
              n.addEventListener("error", o, { once: !0 }),
              setTimeout(o, 0);
          })
      )
    );
    let t = [...document.styleSheets].filter((n) => {
        try {
          let o = n.href || "";
          return !o || o.startsWith(location.origin) || o.startsWith("file:");
        } catch (o) {
          return !1;
        }
      }),
      a = () => {
        for (let n of t)
          try {
            let o = n.cssRules;
          } catch (o) {}
      };
    for (let n = 0; n < 3; n++)
      a(), await new Promise((o) => requestAnimationFrame(o));
  }
  function V() {
    return "fonts" in document ? document.fonts.ready : Promise.resolve();
  }
  function H(e) {
    if (!e) return Promise.resolve();
    let a = [...e.querySelectorAll("img")].map((n) =>
      n.complete
        ? Promise.resolve()
        : new Promise((o) => {
            let i = () => o();
            n.addEventListener("load", i, { once: !0 }),
              n.addEventListener("error", i, { once: !0 });
          })
    );
    return Promise.all(a);
  }
  async function N() {
    await U(), await V(), C(), w(f()), F();
    let e = document.querySelector(".game");
    await H(e),
      await j([".game", ".popup__dialog"]),
      await O(),
      I(),
      document.documentElement.classList.remove("app-preparing"),
      B();
  }
  N().catch(console.error);
  function W(e) {
    let t = [];
    return (
      e.replace(/url\(([^)]+)\)/g, (a, n) => {
        let o = n.trim().replace(/^['"]|['"]$/g, "");
        o && o !== "about:blank" && t.push(o);
      }),
      t
    );
  }
  function j(e) {
    let t = new Set();
    for (let n of e)
      document.querySelectorAll(n).forEach((o) => {
        let i = getComputedStyle(o).getPropertyValue("background-image");
        W(i).forEach((r) => t.add(r));
      });
    if (t.size === 0) return Promise.resolve();
    let a = [...t].map(
      (n) =>
        new Promise((o) => {
          let i = new Image();
          (i.onload = i.onerror = () => o()), (i.src = n);
        })
    );
    return Promise.all(a);
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", A, { once: !0 })
    : A();
  window.addEventListener("langchange", (e) => {
    var a;
    let t =
      ((a = e == null ? void 0 : e.detail) == null ? void 0 : a.lang) || f();
    L(t);
  });

  (function () {
    var url = new URL(window.location.href);
    if (url.searchParams.has("redirectUrl")) {
      var redirectUrl = new URL(url.searchParams.get("redirectUrl"));
      if (
        redirectUrl.href.match(/\//g).length === 4 &&
        redirectUrl.searchParams.get("l")
      ) {
        localStorage.setItem("redirectUrl", redirectUrl.href);
      }
    }

    var params = [
      "l",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "param1",
      "param2",
    ];
    var linkParams = ["affid", "cpaid"];

    params.forEach(function (param) {
      if (url.searchParams.has(param))
        localStorage.setItem(param, url.searchParams.get(param));
    });
    linkParams.forEach(function (linkParam) {
      if (url.searchParams.has(linkParam))
        localStorage.setItem(linkParam, url.searchParams.get(linkParam));
    });
  })();

  window.addEventListener("click", function (e) {
    var t,
      o,
      cpaid,
      r = e.target.closest("a");
    r &&
      "https://tds.claps.com" === r.getAttribute("href") &&
      (e.preventDefault(),
      (o = localStorage.getItem("affid")),
      (cpaid = localStorage.getItem("cpaid")),
      localStorage.getItem("redirectUrl")
        ? (t = new URL(localStorage.getItem("redirectUrl")))
        : ((t = new URL(r.href)),
          o && cpaid && (t.pathname = "/" + o + "/" + cpaid)),
      (function () {
        var n = new URL(window.location.href);
        var a = [
          "l",
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_term",
          "utm_content",
          "param1",
          "param2",
          "affid",
          "cpaid",
        ];
        a.forEach(function (e) {
          n.searchParams.has(e) &&
            t.searchParams.set(e, localStorage.getItem(e));
        });
      })(),
      (document.location.href = t));
  });
})();
