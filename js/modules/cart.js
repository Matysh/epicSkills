const cart = window.localStorage.getItem('cart') ;
let store = cart ? JSON.parse(cart) : [];

const table = document.querySelector('.cart__table');



const cartAddItem = (indexItem, maxCount = 10) => {

    const find = store.filter(el => el.index === indexItem);
    if (!find.length) {
        store.push({
            index: indexItem,
            quantity: 1
        });
        renderCounter();
        return true;
    }
    if (find[0].quantity >= maxCount) {
        return false;
    }
    find[0].quantity++;
    renderCounter();
    return true;
};

const cartRemoveOneItem = (indexItem) => {
    const find = store.filter(el => el.index === indexItem);
    if (!find.length) {
        return false;
    }

    find[0].quantity--;
    if (find[0].quantity <= 0) {
        cartRemoveAllItem(indexItem);
    }
    renderCounter();
    return true;
};

function cartRemoveAllItems() {
    store = [];
    renderCounter();
    if (table) {
        table.innerHTML = 'Корзина пуста';
    }
}

function cartRemoveAllItem(indexItem) {
    const find = store.map(function (item) {
        return item.index;
    }).indexOf(indexItem);

    if (find === -1) {
        return false;
    }

    store.splice(find, 1);
    renderCounter();

    return true;

}

function getTotalPrice() {
    let totalPrice = 0;
    for (let i=0;i<store.length;i++){
        totalPrice += store[i].quantity * books[store[i].index].price;
    }
    return totalPrice;
}

function renderCounter() {
    let storeCounter = 0;
    for (let i = 0; i<store.length;i++){
        storeCounter = storeCounter + store[i].quantity;
    }

    window.localStorage.setItem('cart', JSON.stringify(store));

    if (table) {
        let totalPriceHtml = `${getTotalPrice()} ₽`;
        document.querySelector('#cart-products-price-num').innerHTML = totalPriceHtml;
        document.querySelector('.checkout__price').innerHTML = totalPriceHtml;
        document.querySelector('.cart__title').innerHTML = `Товаров в корзине: ${storeCounter.toString()} шт.`;
    }

    document.querySelector('.page-header__cart-num').innerHTML = storeCounter.toString();
}

function cartRenderItem(item) {
    const book = books[item.index];
    const itemTotalPrice = item.quantity * book.price;
    const myCardRow = `<tr class=\"cart__product cart__product_${item.index}\">
      <td class=\"cart__col-1\">
        <img class=\"cart__item-img\" src=\"img/${book.uri}.jpg\" alt=\"${book.desc}.\">
      </td>
      <td class=\"cart__col-2\">
        <div class=\"cart__item-name\">${book.name}</div>
      </td>
      <td class=\"cart__col-3\">
        <div class=\"field-num  field-num--bg-tran\">
          <span class=\"field-num__input-wrap\">
            <button class=\"field-num__btn-minus\" data-index="${item.index}" type=\"button\">-</button>
            <input class=\"field-num__input field-num__input_${item.index}\" type=\"number\" value=\"${item.quantity}\" step=\"1\" min=\"1\"/>
            <button class=\"field-num__btn-plus\" data-index="${item.index}" type=\"button\">+</button>
          </span>
        </div>
      </td>
      <td class=\"cart__col-4\">
        <span class=\"cart__item-price cart__item-price_${item.index}\">${itemTotalPrice} ₽</span>
      </td>
      <td class=\"cart__col-5\">
        <button class=\"close cart__product-del-btn\" data-index=\"${item.index}\" type=\"button\">
          <svg width=\"16\" height=\"16\">
            <use xlink:href=\"#close\"></use>
          </svg>
        </button>
      </td>
    </tr>`;
    table.insertAdjacentHTML('beforeend', myCardRow);
}

function cartUpdateItem(item) {
    const book = books[item.index];
    const itemTotalPrice = item.quantity * book.price;
    document.querySelector(`.field-num__input_${item.index}`).value = item.quantity;
    document.querySelector(`.cart__item-price_${item.index}`).innerHTML = `${itemTotalPrice} ₽`;
}

if (table) {
    store.forEach(cartRenderItem);

    document.querySelector('.cart__clear-btn').addEventListener('click',cartRemoveAllItems);

    document.querySelectorAll('.field-num__btn-minus').forEach((minus) => {
            minus.addEventListener('click', function () {
                cartRemoveOneItem(this.dataset.index);
                const find = store.filter(el => el.index === this.dataset.index);
                if (!find.length) {
                    document.querySelector(`.cart__product_${this.dataset.index}`).remove();
                } else {
                    cartUpdateItem(find[0]);
                }
            });
        });

    document.querySelectorAll('.field-num__btn-plus').forEach((plus) => {
            plus.addEventListener('click', function () {
                cartAddItem(this.dataset.index, books[this.dataset.index].quantity);
                const find = store.filter(el => el.index === this.dataset.index);
                cartUpdateItem(find[0]);
            });
        });

    document.querySelectorAll('.cart__product-del-btn').forEach(elem => {
        elem.addEventListener('click',function () {
            cartRemoveAllItem(this.dataset.index);
            document.querySelector(`.cart__product_${this.dataset.index}`).remove();
        })
    })

    table.insertAdjacentHTML('beforeend','<tr>\n' +
        '    <td class="cart__products-price" colspan="5">\n' +
        '        Итого к оплате: <strong class="cart__products-price-num" id="cart-products-price-num">2 200 ₽</strong>\n' +
        '    </td>\n' +
        '    </tr>')

}
renderCounter();