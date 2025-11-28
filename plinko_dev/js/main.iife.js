(() => {
  // js/lang.js
  var FALLBACK = "eng";
  var SUPPORTED = ["eng", "por", "esp", "fra", "nor", "suo", "deu"];
  var URL_LANG_OPTIONS = {
    method: "replace",
    // або "push"
    cleanDefault: true,
    // якщо lang === fallback -> прибираємо ?lang
    fallback: FALLBACK,
    // що вважається дефолтною мовою
    param: "lang"
    // ім'я query-параметра
  };
  var HTML_LANG = {
    eng: "en",
    por: "pt",
    esp: "es",
    fra: "fr",
    nor: "no",
    suo: "fi",
    deu: "de"
  };
  var TRANSLATIONS = {
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
      "landing-wheel-no": "no"
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
      "landing-wheel-no": "Sin"
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
      "landing-wheel-no": "Sem"
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
      "landing-wheel-no": "Ei"
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
      "landing-wheel-no": "Pas"
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
      "landing-wheel-no": "Ingen"
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
      "landing-wheel-no": "Preis"
    }
  };
  function detectLang() {
    const urlLang = new URLSearchParams(location.search).get("lang");
    if (urlLang && SUPPORTED.includes(urlLang)) return urlLang;
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) return saved;
    return FALLBACK;
  }
  var SETTING_LANG = false;
  async function setLang(lang) {
    if (SETTING_LANG) return;
    SETTING_LANG = true;
    try {
      const effective = SUPPORTED.includes(lang) ? lang : FALLBACK;
      const dict = TRANSLATIONS == null ? void 0 : TRANSLATIONS[effective];
      if (!dict) throw new Error("No translations embedded");
      applyTranslations(dict);
      document.documentElement.lang = HTML_LANG[effective] || "en";
      localStorage.setItem("lang", effective);
      updateLangInUrl(effective, URL_LANG_OPTIONS);
      document.querySelectorAll(".navigationWrapper .navigation").forEach((nav) => syncOneMenuUI(nav, effective));
      window.dispatchEvent(
        new CustomEvent("langchange", { detail: { lang: effective } })
      );
    } catch (e) {
      console.error(e);
      const dictFB = TRANSLATIONS == null ? void 0 : TRANSLATIONS[FALLBACK];
      if (dictFB) {
        applyTranslations(dictFB);
        document.documentElement.lang = HTML_LANG[FALLBACK] || "en";
        localStorage.setItem("lang", FALLBACK);
        updateLangInUrl(FALLBACK, URL_LANG_OPTIONS);
        window.dispatchEvent(
          new CustomEvent("langchange", { detail: { lang: FALLBACK } })
        );
      }
    } finally {
      SETTING_LANG = false;
      closeAllNavs();
    }
  }
  function initLanguageMenus() {
    document.querySelectorAll(".navigationWrapper .navigation").forEach(setupOneMenu);
  }
  function applyTranslations(dict) {
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.dataset.translate;
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-translate-attr]").forEach((el) => {
      var _a;
      const pairs = ((_a = el.getAttribute("data-translate-attr")) == null ? void 0 : _a.split(";").map((s) => s.trim()).filter(Boolean)) || [];
      for (const pair of pairs) {
        const [attr, key] = pair.split(":");
        if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
      }
    });
  }
  function syncOneMenuUI(nav, lang) {
    const menu = nav.querySelector(".navigation__items");
    if (!menu) return;
    menu.querySelectorAll(".navigation__item").forEach((item) => {
      const isActive = item.getAttribute("value") === lang;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
      item.hidden = false;
      item.setAttribute("aria-hidden", "false");
      item.tabIndex = -1;
    });
    const activeItem = [...menu.querySelectorAll(".navigation__item")].find(
      (el) => el.getAttribute("value") === lang
    ) || menu.querySelector(".navigation__item.is-active");
    if (activeItem) {
      activeItem.hidden = true;
      activeItem.setAttribute("aria-hidden", "true");
    }
    const headImg = nav.querySelector(
      ".navigation__mainBlock .navigation__itemImg"
    );
    const headText = nav.querySelector(
      ".navigation__mainBlock .navigation__itemText"
    );
    if (headImg || headText) {
      const srcImg = activeItem == null ? void 0 : activeItem.querySelector(".navigation__itemImg");
      const srcTxt = activeItem == null ? void 0 : activeItem.querySelector(".navigation__itemText");
      if (headImg && srcImg) {
        headImg.src = srcImg.src;
        headImg.alt = srcImg.alt || "";
      }
      if (headText && srcTxt) headText.textContent = srcTxt.textContent;
    }
  }
  function setupOneMenu(nav) {
    var _a, _b;
    const menu = nav.querySelector(".navigation__items");
    if (!menu) return;
    nav.setAttribute("role", "button");
    nav.tabIndex = 0;
    nav.setAttribute("aria-haspopup", "listbox");
    if (!menu.id) menu.id = "lang-menu-" + Math.random().toString(36).slice(2);
    nav.setAttribute("aria-controls", menu.id);
    nav.setAttribute("aria-expanded", "false");
    menu.setAttribute("role", "listbox");
    menu.querySelectorAll(".navigation__item").forEach((item) => {
      item.setAttribute("role", "option");
      item.tabIndex = -1;
    });
    const currentText = (_b = (_a = nav.querySelector(".navigation__mainBlock .navigation__itemText")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim();
    if (currentText)
      menu.querySelectorAll(".navigation__itemText").forEach((t) => {
        if (t.textContent.trim() === currentText) {
          const item = t.closest(".navigation__item");
          if (item) {
            item.hidden = true;
            item.setAttribute("aria-hidden", "true");
          }
        }
      });
    const isOpen = () => nav.classList.contains("is-open");
    const open = () => {
      if (!isOpen()) {
        nav.classList.add("is-open");
        nav.setAttribute("aria-expanded", "true");
      }
    };
    const close = () => {
      if (isOpen()) {
        nav.classList.remove("is-open");
        nav.setAttribute("aria-expanded", "false");
      }
    };
    const toggle = () => isOpen() ? close() : open();
    nav.addEventListener(
      "pointerup",
      (e) => {
        if (e.pointerType === "mouse") return;
        if (menu.contains(e.target)) return;
        e.preventDefault();
        e.stopPropagation();
        toggle();
      },
      { passive: false }
    );
    document.addEventListener("pointerdown", (e) => {
      if (!nav.parentElement.contains(e.target)) close();
    });
    nav.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape") {
        if (isOpen()) {
          e.preventDefault();
          close();
          nav.focus();
        }
      } else if ((e.key === "ArrowDown" || e.key === "Down") && !isOpen()) {
        open();
        focusFirstItem(menu);
      }
    });
    function handleChooseLang(e) {
      const item = e.target.closest(".navigation__item");
      if (!item) return;
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      const a = item.closest("a");
      if (a) {
        if (e.cancelable) e.preventDefault();
        a.setAttribute("href", "#");
      }
      const code = item.getAttribute("value");
      const finish = () => requestAnimationFrame(() => {
        var _a2, _b2;
        close();
        closeAllNavs();
        nav.blur();
        (_b2 = (_a2 = document.activeElement) == null ? void 0 : _a2.blur) == null ? void 0 : _b2.call(_a2);
      });
      if (SUPPORTED.includes(code))
        Promise.resolve(setLang(code)).finally(finish);
      else {
        const newImg = item.querySelector(".navigation__itemImg");
        const newText = item.querySelector(".navigation__itemText");
        const headImg = nav.querySelector(".navigation__itemImg");
        const headTxt = nav.querySelector(".navigation__itemText");
        if (newImg && headImg) {
          headImg.src = newImg.src;
          headImg.alt = newImg.alt || "";
        }
        if (newText && headTxt) headTxt.textContent = newText.textContent;
        finish();
      }
    }
    menu.addEventListener("click", handleChooseLang);
    menu.addEventListener("touchend", handleChooseLang, { passive: false });
    menu.addEventListener("pointerup", handleChooseLang, { passive: false });
    window.addEventListener("orientationchange", close);
    window.addEventListener("resize", close);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) close();
    });
    nav.style.touchAction = "manipulation";
    menu.style.touchAction = "manipulation";
  }
  function focusFirstItem(menu) {
    const first = [
      ...menu.querySelectorAll(".navigation__item:not([hidden])")
    ][0];
    if (first) first.focus();
  }
  function closeAllNavs() {
    document.querySelectorAll(".navigation.is-open").forEach((nav) => {
      nav.classList.remove("is-open");
      nav.setAttribute("aria-expanded", "false");
      const menu = nav.querySelector(".navigation__items");
      if (menu) {
        menu.setAttribute("aria-hidden", "true");
        menu.style.pointerEvents = "none";
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
        requestAnimationFrame(() => {
          menu.removeAttribute("aria-hidden");
          menu.style.pointerEvents = "";
          menu.style.visibility = "";
          menu.style.opacity = "";
        });
      }
    });
  }
  function killAllHovers() {
    try {
      document.querySelectorAll(":hover").forEach((el) => {
        var _a;
        return (_a = el.blur) == null ? void 0 : _a.call(el);
      });
    } catch (_) {
    }
  }
  function updateLangInUrl(lang, opts = URL_LANG_OPTIONS) {
    const {
      method = "replace",
      cleanDefault = false,
      fallback = FALLBACK,
      param = "lang"
    } = opts || {};
    try {
      const url = new URL(window.location.href);
      if (cleanDefault && lang === fallback) {
        url.searchParams.delete(param);
      } else {
        url.searchParams.set(param, lang);
      }
      const next = url.pathname + (url.search || "") + (url.hash || "");
      const current = location.pathname + location.search + location.hash;
      if (next === current) return;
      if (method === "push") {
        history.pushState(null, "", next);
      } else {
        history.replaceState(null, "", next);
      }
    } catch (e) {
      const params = new URLSearchParams(location.search);
      if (cleanDefault && lang === fallback) {
        params.delete(param);
      } else {
        params.set(param, lang);
      }
      const q = params.toString();
      const next = location.pathname + (q ? `?${q}` : "") + location.hash;
      const current = location.pathname + location.search + location.hash;
      if (next === current) return;
      history.replaceState(null, "", next);
    }
  }

  // js/game.js
  function initGame() {
    const spinBtn = document.querySelector(".wheel__btn");
    const spinImg = document.querySelector(".wheel__img");
    const btn = document.querySelector(".button");
    const btn_mobile = document.querySelector(".button__mobile");
    const wheel = document.querySelector(".wheel__spin");
    const modal = document.getElementById("modal");
    const modalButton = document.querySelector(".modal__button");
    let spinCount = 0;
    const spinWheel = () => {
      if (spinCount > 0 || localStorage.getItem("game-spun") === "true") {
        return;
      }
      spinCount++;
      spinBtn.disabled = true;
      wheel.classList.remove("wheel--idle");
      setTimeout(() => {
        wheel.classList.add("wheel--spinning");
        const totalRotation = 360 * 5 + 180;
        wheel.style.transform = `rotate(${totalRotation}deg)`;
        setTimeout(() => {
          spinBtn.disabled = false;
          modal.classList.add("open");
          document.body.classList.add("modal-open");
          localStorage.setItem("game-spun", "true");
          document.dispatchEvent(new CustomEvent("slot:bigwin"));
        }, 5500);
      }, 0);
    };
    spinBtn.addEventListener("click", spinWheel);
    spinImg.addEventListener("click", spinWheel);
    btn.addEventListener("click", spinWheel);
    btn_mobile.addEventListener("click", spinWheel);
    if (localStorage.getItem("game-spun") === "true") {
      const launchElements = [spinBtn, spinImg, btn, btn_mobile].filter(
        (el) => el !== null
      );
      launchElements.forEach((element) => {
        element.setAttribute("aria-disabled", "true");
        element.setAttribute("disabled", "");
      });
      modal == null ? void 0 : modal.classList.add("open");
      document.body.classList.add("modal-open");
      requestAnimationFrame(
        () => document.dispatchEvent(new CustomEvent("slot:bigwin"))
      );
    }
  }

  // js/popup.js
  function openPopup() {
    var _a;
    (_a = document.getElementById("popup")) == null ? void 0 : _a.classList.add("is-open");
  }
  function initPopup() {
    document.addEventListener("slot:bigwin", openPopup);
  }

  // js/payment.js
  var PAYMENT_SETS = {
    eng: [
      { src: "img/footer/interac.svg", alt: "Interac" },
      { src: "img/footer/visa.svg", alt: "Visa" },
      { src: "img/footer/applepay.svg", alt: "Apple Pay" },
      { src: "img/footer/googlepay.svg", alt: "Google Pay" },
      { src: "img/footer/tetherb.svg", alt: "Tether Bitcoin" },
      { src: "img/footer/age.svg", alt: "18+" }
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
      { src: "img/footer/age.svg", alt: "18+" }
    ],
    general: [
      { src: "img/footer/visa.svg", alt: "Visa" },
      { src: "img/footer/applepay.svg", alt: "Apple Pay" },
      { src: "img/footer/googlepay.svg", alt: "Google Pay" },
      { src: "img/footer/tetherb.svg", alt: "Tether Bitcoin" },
      { src: "img/footer/age.svg", alt: "18+" }
    ]
  };
  function pickSetKey(lang) {
    if (lang === "eng") return "eng";
    if (lang === "deu") return "deu";
    return "general";
  }
  function renderFooterPayments(lang) {
    const setKey = pickSetKey(lang);
    const items = PAYMENT_SETS[setKey] || PAYMENT_SETS.general;
    const container = document.querySelector(".footer .footer__items");
    if (!container) return;
    container.innerHTML = "";
    for (const p of items) {
      const wrap = document.createElement("div");
      wrap.className = "footer__item";
      const img = document.createElement("img");
      img.decoding = "async";
      img.src = p.src;
      img.alt = p.alt || "";
      wrap.appendChild(img);
      container.appendChild(wrap);
    }
  }
  function initPaymentsOnce() {
    renderFooterPayments(detectLang());
  }

  // js/main.js
  function waitNextFrame() {
    return new Promise((r) => requestAnimationFrame(() => r()));
  }
  async function whenAllStylesLoaded() {
    const links = [...document.querySelectorAll('link[rel="stylesheet"]')];
    await Promise.all(
      links.map(
        (link) => new Promise((res) => {
          link.addEventListener("load", res, { once: true });
          link.addEventListener("error", res, { once: true });
          setTimeout(res, 0);
        })
      )
    );
    const sameOriginSheets = [...document.styleSheets].filter((s) => {
      try {
        const href = s.href || "";
        return !href || href.startsWith(location.origin) || href.startsWith("file:");
      } catch (e) {
        return false;
      }
    });
    const pollOnce = () => {
      for (const sheet of sameOriginSheets) {
        try {
          const _ = sheet.cssRules;
        } catch (e) {
        }
      }
    };
    for (let i = 0; i < 3; i++) {
      pollOnce();
      await new Promise((r) => requestAnimationFrame(r));
    }
  }
  function waitForFonts() {
    return "fonts" in document ? document.fonts.ready : Promise.resolve();
  }
  function waitImagesIn(el) {
    if (!el) return Promise.resolve();
    const imgs = [...el.querySelectorAll("img")];
    const promises = imgs.map(
      (img) => img.complete ? Promise.resolve() : new Promise((res) => {
        const cb = () => res();
        img.addEventListener("load", cb, { once: true });
        img.addEventListener("error", cb, { once: true });
      })
    );
    return Promise.all(promises);
  }
  async function bootstrap() {
    await whenAllStylesLoaded();
    await waitForFonts();
    initLanguageMenus();
    setLang(detectLang());
    initPopup();
    const gameRoot = document.querySelector(".game");
    await waitImagesIn(gameRoot);
    await waitCssBackgrounds([".game", ".popup__dialog"]);
    await waitNextFrame();
    initGame();
    document.documentElement.classList.remove("app-preparing");
    killAllHovers();
  }
  bootstrap().catch(console.error);
  function parseCssUrls(value) {
    const urls = [];
    value.replace(/url\(([^)]+)\)/g, (_, raw) => {
      const u = raw.trim().replace(/^['"]|['"]$/g, "");
      if (u && u !== "about:blank") urls.push(u);
    });
    return urls;
  }
  function waitCssBackgrounds(selectors) {
    const urls = /* @__PURE__ */ new Set();
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        const bg = getComputedStyle(el).getPropertyValue("background-image");
        parseCssUrls(bg).forEach((u) => urls.add(u));
      });
    }
    if (urls.size === 0) return Promise.resolve();
    const tasks = [...urls].map(
      (src) => new Promise((res) => {
        const img = new Image();
        img.onload = img.onerror = () => res();
        img.src = src;
      })
    );
    return Promise.all(tasks);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPaymentsOnce, {
      once: true
    });
  } else {
    initPaymentsOnce();
  }
  window.addEventListener("langchange", (e) => {
    var _a;
    const lang = ((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.lang) || detectLang();
    renderFooterPayments(lang);
  });

  
})();
