// Элементы
const slider = document.querySelector('.slider');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

// Параметры слайдера
const slideWidth = 567;
const gap = 104;
const step = slideWidth + gap; // 671px
const totalUniqueSlides = 8;   // slide1 ... slide7
const trackLength = totalUniqueSlides * step; // 7 * 671 = 4697px

let offset = -step; // начальное смещение (один слайд влево)

const transitionTime = 0.7; // секунды

// Установка начального положения (без анимации)
slider.style.transition = '0s';
slider.style.transform = `translateX(${offset}px)`;

// Логика движения
function moveSlider(direction) {
  // direction: +1 ← (назад), -1 → (вперёд)
  offset -= direction * step;

  // Анимация прокрутки
  slider.style.transition = `${transitionTime}s`;
  slider.style.transform = `translateX(${offset}px)`;

  console.log('Current offset:', offset);

  // Бесконечная прокрутка — проверяем границы

  // Если ушли слишком влево: offset <= -trackLength (-4697)
  if (offset <= -trackLength) {
    setTimeout(() => {
      slider.style.transition = '0s'; // мгновенно
      offset = -step; // прыгаем в "начало" (видимый цикл)
      slider.style.transform = `translateX(${offset}px)`;
    }, transitionTime * 1000);
  }

  // Если ушли вправо: offset >= 0
  else if (offset >= 0) {
    setTimeout(() => {
      slider.style.transition = '0s'; // мгновенно
      offset = -trackLength + step; // прыгаем в "конец" (-4697 + 671 = -4026)
      slider.style.transform = `translateX(${offset}px)`;
    }, transitionTime * 1000);
  }
}

// Обработчики кликов
btnLeft.addEventListener('click', () => moveSlider(1));  // ← Назад
btnRight.addEventListener('click', () => moveSlider(-1)); // → Вперёд