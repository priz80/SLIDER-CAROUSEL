// Элементы
const slider = document.querySelector('.slider');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

let slideWidth, gap, step, totalUniqueSlides, trackLength, offset;
const transitionTime = 0.7; // секунды
let isAnimating = false;
// Количество уникальных слайдов (slide1 ... slide7)
totalUniqueSlides = 8;

// Функция: обновить конфигурацию под текущий размер экрана
function updateConfig() {
  const innerWidth = window.innerWidth;

  if (innerWidth >= 992) {
    slideWidth = 567;
    gap = 104;
  } else {
    slideWidth = 258;
    gap = 37;
  }

  step = slideWidth + gap;
  trackLength = totalUniqueSlides * step;
  offset = -step; // начальное смещение — один слайд влево

  // Применяем без анимации
  slider.style.transition = '0s';
  slider.style.transform = `translateX(${offset}px)`;

  console.log(`[Config] Width: ${innerWidth}, Slide: ${slideWidth}, Gap: ${gap}, Step: ${step}`);
}

// Логика движения
function moveSlider(direction) {
    if (isAnimating) return;
    isAnimating = true;
  // direction: +1 ←, -1 →
  offset -= direction * step;

  slider.style.transition = `${transitionTime}s`;
  slider.style.transform = `translateX(${offset}px)`;

  console.log('Current offset:', offset);

  // Бесконечная прокрутка

  // Если ушли слишком влево
  if (offset <= -trackLength) {
    setTimeout(() => {
      slider.style.transition = '0s';
      offset = -step;
      slider.style.transform = `translateX(${offset}px)`;
    }, transitionTime * 1000);
  }

  // Если ушли вправо (до 0 или больше)
  else if (offset >= 0) {
    setTimeout(() => {
      slider.style.transition = '0s';
      offset = -trackLength + step; // = -trackLength + step
      slider.style.transform = `translateX(${offset}px)`;
    }, transitionTime * 1000);
  }

   setTimeout(() => {
        isAnimating = false;
    }, 700); // ← ставь сюда длительность анимации из CSS/JS

}

// Обработчики кликов
btnLeft.addEventListener('click', () => moveSlider(1));  // ← Назад
btnRight.addEventListener('click', () => moveSlider(-1)); // → Вперёд

// Инициализация при загрузке
updateConfig();

// Пересчёт при изменении размера окна
window.addEventListener('resize', () => {
  // Добавляем задержку, чтобы избежать множества вызовов
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    updateConfig();
    console.log('Окно изменено. Конфиг обновлён.');
  }, 100);
});