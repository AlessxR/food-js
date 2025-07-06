"use strict";

// Получаем элементы
const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

const modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]'),
    modalTimerId = setTimeout(toggleModal, 5000);

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