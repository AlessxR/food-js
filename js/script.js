"use strict";

// Получаем элементы
const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

const modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]'),
    modalTimerId = setTimeout(toggleModal, 5000);

const forms = document.querySelectorAll('form'),
    formsMessage = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

const slides = document.querySelectorAll('.offer__slide'),
    prevArrow = document.querySelector('.offer__slider-prev'),
    nextArrow = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    currentBlock = document.querySelector('#current');

let slideIndex = 1;


const menuItem = document.querySelectorAll('.menu__item');
const deadline = '2025-07-12';

// Скрытие контента
function hideTabContent() {

    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
};

function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');
};


hideTabContent();
showTabContent();


tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    // Клик по элементу с классом tabheader__item
    if (target && target.classList.contains('tabheader__item')) {

        tabs.forEach((item, index) => {
            if (target == item) {
                hideTabContent();
                showTabContent(index);
            }
        });
    }
});

// Timer
function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
        days = hours = minutes = seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 * 60) % 24));
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
        t,
        days,
        hours,
        minutes,
        seconds
    };
};

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t <= 0) {
            clearInterval(timeInterval);
        }
    };
};

setClock('.timer', deadline);

// Modal Window
function toggleModal() {

    if (modalOpenBtn) {
        modal.classList.toggle('show');
    } else {
        modal.classList.toggle('hide')
    }

    clearInterval(modalTimerId);

}

modalOpenBtn.forEach(item => {
    item.addEventListener('click', toggleModal);
});
modalCloseBtn.addEventListener('click', toggleModal);

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        toggleModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

class Card {
    constructor(image, header, descr, price, parentSelector, ...classes) {
        this.image = image;
        this.header = header;
        this.descr = descr;
        this.price = price;
        this.clasess = classes;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
        this.clasess.forEach(className => element.classList.add(className));
        element.classList.add('menu__item');
        element.innerHTML = `
            <img src="${this.image}" alt="vegy">
            <h3 class="menu__item-subtitle">${this.header}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
};


axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({img, title, descr, price}) => {
        new Card(img, title, descr, price, '.menu .container').render();
    });
});

// function createCard(data) {
//     data.forEach(({img, title, descr, price}) => {
//         const element = document.createElement('div');
//         element.classList.add('menu__item');

//         element.innerHTML = `
//             <img src="${img}" alt="vegy">
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//         `;

//         document.querySelector('.menu .container').append(element);
//     });
// } Второй способ создания с БД

forms.forEach(item => {
    bindPostData(item);
});

// Настраиваение запроса к серверу, получение ответа и трансформируется в json
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();
};

// Forms
function bindPostData(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = formsMessage.loading;

        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

        form.insertAdjacentElement('afterend', statusMessage);


        const formData = new FormData(form); // Собираем данные с определенной формы
        console.log(formData);


        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(formsMessage.success);
                // form.reset();
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(formsMessage.failure);
            })
            .finally(() => {
                form.reset();
            });
    });
};

function showThanksModal() {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    toggleModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add(' modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${formsMessage}</div>
            </div>
        `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
    }, 4000);
};

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

// Slider
function showSlides(indexSlide) {
    if (indexSlide > slides.length) {
        slideIndex = 1;
    }

    if (indexSlide < 1) {
        slideIndex = slides.length;
    }

    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    slides[slideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
        currentBlock.textContent = `0${slideIndex}`;
    } else {
        currentBlock.textContent = slideIndex;
    }
};

function plusSlides(indexSlide) {
    showSlides(slideIndex += indexSlide);
}

prevArrow.addEventListener('click', () => {
    plusSlides(-1);
});

nextArrow.addEventListener('click', () => {
    plusSlides(+1);
});

showSlides(slideIndex); 

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = `${slides.length}`;
}