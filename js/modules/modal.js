const page = document.querySelector('.page');

function openModal() {
    closeAll();

    page.classList.add('js-modal-openModal');
    document.body.insertAdjacentHTML('afterbegin', `
<div class=\"modal modal--open\" id=\"modal-book-view\" tabindex=\"-1\" role=\"dialog\"> 
    <div class=\"modal__dialog\" role=\"document\"> 
        <div class=\"modal__content\"> 
            <button class=\"modal__close\" data-dismiss=\"modal\" aria-label=\"Закрыть\"> 
                <svg width=\"16\" height=\"16\"> <use xlink:href=\"#close\"></use> </svg> 
            </button> 
            <div class=\"product\"> 
                <div class=\"product__img-wrap\">
                    <img src=\"img/iskrenniy-servis.jpg\" alt=\"Искренний сервис\" width=\"422\" height=\"594\"> 
                </div> 
                <div class=\"product__text-info\"> 
                    <h2 class=\"product__title\">${books[this.dataset.index].name}</h2>
                    <div class=\"rating product__rating\"> 
                        <span class=\"rating__stars\"> 
                            <svg width=\"18\" height=\"18\"> <use xlink:href=\"#star\"></use> </svg> 
                            <svg width=\"18\" height=\"18\"> <use xlink:href=\"#star\"></use> </svg> 
                            <svg width=\"18\" height=\"18\"> <use xlink:href=\"#star\"></use> </svg> 
                            <svg width=\"18\" height=\"18\"> <use xlink:href=\"#star\"></use> </svg> 
                            <svg width=\"18\" height=\"18\"> <use xlink:href=\"#star-half\"></use> </svg> 
                        </span> 
                        <span class=\"rating__num\">4.6/5.0</span> 
                        <span class=\"rating__review\">20 отзывов</span> 
                    </div> 
                    <table class=\"product__table-info\"> 
                        <tr><th>Автор:</th> <td> <a href=\"\">Девид Огилви</a> </td> </tr> 
                        <tr> <th>Артикул:</th> <td>6649507</td> </tr> 
                        <tr> <th>В наличии:</th> <td>${books[this.dataset.index].quantity || 10} шт.</td> </tr> 
                    </table> 
                </div> 
                <div class=\"product__descr\">
                    <h3 class=\"product__subtitle\">Описание:</h3> 
                    <p>Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Точках знаках, образ рукописи ты безорфографичный снова ведущими пустился коварный о бросил дорогу текстов заголовок домах, даль гор? На берегу, лучше.</p> 
                    <div class=\"product__actions\"> 
                        <button class=\"btn  btn--price\"> 1 042 ₽ <span class=\"btn__sm-text\"> <svg class=\"btn__icon\" width=\"14\" height=\"14\">   <use xlink:href=\"#plus\"></use> </svg> <span>В корзину</span> </span> </button> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>
</div>`);

    const modal = document.querySelector('.modal');
    modal.querySelector('.modal__close').addEventListener('click', closeAll);
    modal.addEventListener('click', function (event) {
        if (event.target !== event.currentTarget) {
            return;
        }

        closeAll();
    });
}

function closeAll() {
    page.classList.remove('js-modal-openModal');

    const modals = document.querySelector('.modal');
    if (modals) {
        modals.remove();
    }
}

const cardsList = document.querySelectorAll('.card');
for (let i = 0; i < cardsList.length; i++) {
    cardsList[i].addEventListener("click", openModal)
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        closeAll();
    }
});