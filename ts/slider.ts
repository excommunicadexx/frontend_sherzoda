// Класс для управления слайдером
class Slider {
    private currentSlide: number = 0;
    private slides: NodeListOf<Element>;
    private totalSlides: number;

    constructor() {
        this.slides = document.querySelectorAll('.hero-image');
        this.totalSlides = this.slides.length;
        this.init();
    }

    private init(): void {
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

    private showSlide(index: number): void {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    private changeSlide(direction: number): void {
        this.currentSlide += direction;

        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        } else if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }

        this.showSlide(this.currentSlide);
    }

    private autoChangeSlide(): void {
        this.changeSlide(1);
    }
}

// Инициализация слайдера при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
}); 