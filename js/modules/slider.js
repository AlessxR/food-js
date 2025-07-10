function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
        prevArrow = document.querySelector('.offer__slider-prev'),
        nextArrow = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        currentBlock = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector('.offer__slider');


    let slideIndex = 1,
        offset = 0;

    function setCurrentSlideInfo() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            currentBlock.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            currentBlock.textContent = slideIndex;
        }
    };

    function nextSlideIndex() {
        if (slideIndex >= slides.length) {
            slideIndex = 1;
        } else {
            slideIndex += 1;
        }
    };

    function prevSlideIndex() {
        if (slideIndex <= 1) {
            slideIndex = slides.length;
        } else {
            slideIndex -= 1;
        }
    };

    function updateDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    setCurrentSlideInfo();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    nextArrow.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        nextSlideIndex();
        setCurrentSlideInfo();
        updateDots();
    });

    prevArrow.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        prevSlideIndex();
        setCurrentSlideInfo();
        updateDots();
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentSlideInfo();
            updateDots();
        });
    });
}

module.exports = slider;