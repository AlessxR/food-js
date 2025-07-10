function modal() {
    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modalTimerId = setTimeout(toggleModal, 5000);
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
}

module.exports = modal;