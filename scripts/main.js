"use strict";
// Быстро скрываем прелоадер при загрузке DOM с задержкой 1 секунда
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000); // 1 секунда
    }
});
// Функция для генерации карточек
function generateCards(cards) {
    const container = document.getElementById('features-container');
    if (!container) {
        console.error('Элемент с id "features-container" не найден');
        return;
    }
    cards.forEach(card => {
        var _a;
        const cardHTML = `
      <div class="feature" onclick="updateImage('${(_a = card.image) !== null && _a !== void 0 ? _a : ''}')">
        <hr class="thick-line">
        <h3>${card.card_name}</h3>
        <p>${card.card_text}</p>
      </div>
    `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}
// Получение данных и вызов генерации карточек
fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')
    .then(response => response.json())
    .then((json) => {
    const cards = json.map((comment, index) => ({
        card_name: `Комментарий от ${comment.name}`,
        card_text: comment.body,
        // image: можно добавить, если появится поле
    }));
    generateCards(cards);
});
// Класс для управления слайдером
class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-image');
        this.totalSlides = this.slides.length;
        this.init();
    }
    init() {
        // Показываем первый слайд
        this.showSlide(this.currentSlide);
        // Устанавливаем интервал для автоматического переключения слайдов
        setInterval(() => this.autoChangeSlide(), 3000);
        // Добавляем обработчики для кнопок навигации
        const prevButton = document.querySelector('button.prev');
        const nextButton = document.querySelector('button.next');
        if (prevButton) {
            prevButton.addEventListener('click', () => this.changeSlide(-1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => this.changeSlide(1));
        }
    }
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    changeSlide(direction) {
        this.currentSlide += direction;
        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        else if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }
        this.showSlide(this.currentSlide);
    }
    autoChangeSlide() {
        this.changeSlide(1);
    }
}
// Инициализация слайдера при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});
//# sourceMappingURL=main.js.map