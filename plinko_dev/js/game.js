/**
 * Публічний API гри.
 * Всередині готує каскад <picture>, чіпляє хендлери, штовхає анімацію і шле подію "slot:bigwin".
 */
export function initGame() {
  const spinBtn = document.querySelector(".wheel__btn");
  const spinImg = document.querySelector(".wheel__img");
  const btn = document.querySelector(".button");
  const btn_mobile = document.querySelector(".button__mobile");

  const wheel = document.querySelector(".wheel__spin");
  const modal = document.getElementById("modal");

  const modalButton = document.querySelector(".modal__button");

  let spinCount = 0;

  const spinWheel = () => {
    // Дополнительная проверка на game-spun, чтобы предотвратить запуск
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

        // Открытие модалки после окончания анимации
        modal.classList.add("open");
        document.body.classList.add("modal-open");

        // Запись в localStorage
        localStorage.setItem("game-spun", "true");
        document.dispatchEvent(new CustomEvent("slot:bigwin"));
      }, 5500);
    }, 0);
  };

  spinBtn.addEventListener("click", spinWheel);
  spinImg.addEventListener("click", spinWheel);
  btn.addEventListener("click", spinWheel);
  btn_mobile.addEventListener("click", spinWheel);

  // --- ИЗМЕНЕННЫЙ БЛОК ПРОВЕРКИ ---
  if (localStorage.getItem("game-spun") === "true") {
    // Блокируем все кнопки и элементы запуска, чтобы предотвратить повторный спин
    const launchElements = [spinBtn, spinImg, btn, btn_mobile].filter(
      (el) => el !== null
    );
    launchElements.forEach((element) => {
      element.setAttribute("aria-disabled", "true");
      element.setAttribute("disabled", "");
    });

    // Немедленно открываем модальное окно
    modal?.classList.add("open");
    document.body.classList.add("modal-open");

    // Отправляем событие
    requestAnimationFrame(() =>
      document.dispatchEvent(new CustomEvent("slot:bigwin"))
    );
  }
}
