function cards() {
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
        data.data.forEach(({ img, title, descr, price }) => {
            new Card(img, title, descr, price, '.menu .container').render();
        });
    });
}

module.exports = cards;