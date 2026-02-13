// Элементы
const slider = document.querySelector('.slider');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

// Конфигурация
const config = {
  totalUniqueSlides: 8,
  transitionTime: 0.7, // секунды
};

let slideWidth, gap, step, trackLength, offset;
let isAnimating = false;

// Настройки под размер экрана
const getBreakpointConfig = () => {
  const innerWidth = window.innerWidth;
  return innerWidth >= 992
    ? { slideWidth: 567, gap: 104 }
    : { slideWidth: 258, gap: 37 };
};

// Обновление параметров слайдера
function updateConfig() {
  const { slideWidth: width, gap: gapSize } = getBreakpointConfig();
  slideWidth = width;
  gap = gapSize;
  step = slideWidth + gap;
  trackLength = config.totalUniqueSlides * step;
  offset = -step; // начальное смещение

  // Применяем без анимации
  slider.style.transition = '0s';
  slider.style.transform = `translateX(${offset}px)`;
}

// Перемещение слайдера
function moveSlider(direction) {
  if (isAnimating) return;
  isAnimating = true;

  // direction: +1 ←, -1 →
  offset -= direction * step;

  // Анимация
  slider.style.transition = `${config.transitionTime}s`;
  slider.style.transform = `translateX(${offset}px)`;

  // Бесконечная прокрутка — коррекция после анимации
  const handleInfiniteScroll = () => {
    if (offset <= -trackLength) {
      // Сброс влево
      offset = -step;
    } else if (offset >= 0) {
      // Сброс вправо
      offset = -trackLength + step;
    } else {
      return; // Не требуется коррекция
    }

    // Мгновенный переход без анимации
    slider.style.transition = '0s';
    slider.style.transform = `translateX(${offset}px)`;
  };

  // Ожидание окончания анимации
  setTimeout(() => {
    handleInfiniteScroll();
    isAnimating = false;
  }, config.transitionTime * 1000);
}

// Обработчики кликов
btnLeft.addEventListener('click', () => moveSlider(1));  // ← Назад
btnRight.addEventListener('click', () => moveSlider(-1)); // → Вперёд

// Инициализация
updateConfig();

// Ресайз с оптимизацией
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    updateConfig();
    console.log('Окно изменено. Конфиг обновлён.');
  }, 100);
});