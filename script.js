const Slider = document.querySelector('.slider');
const Left = document.getElementById('left');
const Right = document.getElementById('right');
// Начальное позиция слайдера
let offset = -672;
// Шаг смещения слайдера при клике
const step = 674;
// Время аннимации при прокрутке
let stepTime = 0.7;
//Сброс аннимации при масштабировании
Slider.style.transition = '0s';
// Устанавливаем начальное положение
Slider.style.transform = `translateX(${offset}px)`;
console.log(offset)
// Обрабатываем клик в лево
Left.addEventListener('click', () => {
    offset += step;
    Slider.style.transition = `${stepTime}s`;
    Slider.style.transform = `translateX(${offset}px)`;
console.log(offset)
    // Если достигли начального "края", мгновенно прыгаем в конец
    if (offset == 2) {
        Slider.style.transition = '0s'; // без анимации
        offset = -5390;
        Slider.style.transform = `translateX(${offset}px)`;

        // включаем анимацию и делаем шаг в лево
        requestAnimationFrame(() => {
            Slider.style.transition = `${stepTime}s`;
            offset += step;
            Slider.style.transform = `translateX(${offset}px)`;
        });
        return;
    }
});

Right.addEventListener('click', () => {
    offset -= step;
    Slider.style.transition = '0.7s';
    Slider.style.transform = `translateX(${offset}px)`;
console.log(offset)
    // Если достигли конца, мгновенно прыгаем в начало
    if (offset == -5390) {
        Slider.style.transition = '0s'; // без анимации
        offset = 2;
        Slider.style.transform = `translateX(${offset}px)`;

        // После прыжка включаем аннимацию и делаем шаг вправо
        requestAnimationFrame(() => {
            Slider.style.transition = '0.7s';
            offset -= step;
            Slider.style.transform = `translateX(${offset}px)`;
        });
        return;
    }
});