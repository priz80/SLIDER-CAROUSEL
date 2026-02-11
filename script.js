const Slider = document.querySelector('.slider-container');
const Left = document.getElementById('left');
const Right = document.getElementById('right');
let offset = -1174;
const step = 590;
let stepTime = 0.7;

// Устанавливаем начальное положение
Slider.style.transform = `translateX(${offset}px)`;

Left.addEventListener('click', () => {
    offset += step;
    Slider.style.transition = `${stepTime}s`;
    Slider.style.transform = `translateX(${offset}px)`;

    // Если достигли начального "края", мгновенно прыгаем в конец
    if (offset == 6) {
        Slider.style.transition = '0s'; // мгновенно
        offset = -4714;
        Slider.style.transform = `translateX(${offset}px)`;

        // Следующий кадр: включаем анимацию
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
    console.log(offset);
    // Если достигли конца, мгновенно прыгаем в начало
    if (offset == -5304) {
        Slider.style.transition = '0s'; // мгновенно, без анимации
        offset = -584; // "невидимый" прыжок назад
        Slider.style.transform = `translateX(${offset}px)`;

        // После прыжка включаем плавность и делаем шаг
        requestAnimationFrame(() => {
            Slider.style.transition = '0.7s';
            offset -= step;
            Slider.style.transform = `translateX(${offset}px)`;
        });
        return;
    }
});