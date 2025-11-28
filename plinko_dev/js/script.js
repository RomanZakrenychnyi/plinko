(() => {
  function initLanguageMenus() {
    document
      .querySelectorAll(".navigationWrapper .navigation")
      .forEach(setupOneMenu);
  }

  function setupOneMenu(nav) {
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

    const currentText = nav
      .querySelector(".navigation__mainBlock .navigation__itemText")
      ?.textContent?.trim();

    if (currentText) {
      menu.querySelectorAll(".navigation__itemText").forEach((t) => {
        if (t.textContent.trim() === currentText) {
          const item = t.closest(".navigation__item");
          if (item) {
            item.hidden = true;
            item.setAttribute("aria-hidden", "true");
          }
        }
      });
    }

    const isOpen = () => nav.classList.contains("is-open");
    const open = () => {
      if (isOpen()) return;
      nav.classList.add("is-open");
      nav.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      if (!isOpen()) return;
      nav.classList.remove("is-open");
      nav.setAttribute("aria-expanded", "false");
    };
    const toggle = () => (isOpen() ? close() : open());

    const onPointerUp = (e) => {
      if (e.pointerType === "mouse") return;
      if (menu.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      toggle();
    };

    nav.addEventListener("pointerup", onPointerUp, { passive: false });

    const onDocPointerDown = (e) => {
      if (!nav.parentElement.contains(e.target)) close();
    };
    document.addEventListener("pointerdown", onDocPointerDown);

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

    menu.addEventListener("click", (e) => {
      const item = e.target.closest(".navigation__item");
      if (!item) return;

      const a = item.closest("a");
      if (a && a.getAttribute("href") === "#") e.preventDefault();

      const newImg = item.querySelector(".navigation__itemImg");
      const newText = item.querySelector(".navigation__itemText");
      const headImg = nav.querySelector(".navigation__itemImg");
      const headText = nav.querySelector(".navigation__itemText");
      if (newImg && headImg) {
        headImg.src = newImg.src;
        headImg.alt = newImg.alt || "";
      }
      if (newText && headText) headText.textContent = newText.textContent;

      close();
    });

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
      ...menu.querySelectorAll(".navigation__item:not([hidden])"),
    ][0];
    if (first) first.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageMenus);
  } else {
    initLanguageMenus();
  }
})();

const spinBtn = document.querySelector(".wheel__btn");
const spinImg = document.querySelector(".wheel__img");
const btn = document.querySelector(".button");
const btn_mobile = document.querySelector(".button__mobile");

const wheel = document.querySelector(".wheel__spin");
const modal = document.getElementById("modal");

const modalButton = document.querySelector(".modal__button");

let spinCount = 0;

const spinWheel = () => {
  if (spinCount > 0) {
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
    }, 5500);
  }, 0);
};

spinBtn.addEventListener("click", spinWheel);
spinImg.addEventListener("click", spinWheel);
btn.addEventListener("click", spinWheel);
btn_mobile.addEventListener("click", spinWheel);
