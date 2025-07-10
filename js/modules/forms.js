function forms() {
    const forms = document.querySelectorAll('form'),
        formsMessage = {
            loading: 'img/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };

    forms.forEach(item => {
        bindPostData(item);
    });

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

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


}

module.exports = forms;