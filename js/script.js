"use strict";

// Получаем элементы
const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

const modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]'),
    modalTimerId = setTimeout(toggleModal, 5000);

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
    // modal.classList.toggle('show');
    // modal.classList.toggle('hide');

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
    constructor(image, header, descr, price, parentSelector) {
        this.image = image;
        this.header = header;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
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
}

const card1 = new Card(
    "img/tabs/vegy.jpg",
    'Меню "Фитнес"',
    "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    459,
    '.menu .container' // 👉 сюда вставится карточка
).render();

const card2 = new Card(
    "img/tabs/elite.jpg",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container'
).render();

const card3 = new Card(
    "img/tabs/post.jpg",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container'
).render();

