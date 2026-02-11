// Элементы
const slider = document.querySelector('.slider');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

// Параметры
const slideWidth = 567;
const gap = 104;
const step = slideWidth + gap; // 671px
let offset = -step; // начальное положение

// Время анимации
const transitionTime = 0.7;

// Установка начального положения
slider.style.transition = '0s';
slider.style.transform = `translateX(${offset}px)`;

// Логика движения
function moveSlider(direction) {
  // direction: -1 (вправо), +1 (влево)
  offset -= direction * step;
  slider.style.transition = `${transitionTime}s`;
  slider.style.transform = `translateX(${offset}px)`;
console.log(offset)
  // Бесконечная прокрутка
  if (offset == -5368) {
    // Прыжок в начало (без анимации)
    setTimeout(() => {
      slider.style.transition = '0s';
      offset = -671;
      slider.style.transform = `translateX(${offset}px)`;
    }, transitionTime * 1000);
  } else if (offset == 0) {
    // Прыжок в конец
    setTimeout(() => {
      slider.style.transition = '0s';
      offset = -4697;
      slider.style.transform = `translateX(${offset}px)`;
    }, transitionTime * 1000);
  }
}

// Обработчики кликов
btnLeft.addEventListener('click', () => moveSlider(1));  // ←
btnRight.addEventListener('click', () => moveSlider(-1)); // →

