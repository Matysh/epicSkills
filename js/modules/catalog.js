document.querySelector('.filters').classList.remove('filters--open');
document.getElementById('filters-trigger').addEventListener('click', toggleFilters);

function toggleFilters() {
    document.querySelector('.filters').classList.toggle('filters--open')
}

function filter(books) {
    const booksFiltered = [
        {
            "name": "test",
            "desc": "",
            "price": 697,
            "uri": "klienty-na-vsyu-zhizn",
            "type": "marketing"
        },
        {
            "name": "test",
            "desc": "",
            "price": 697,
            "uri": "klienty-na-vsyu-zhizn",
            "type": "marketing"
        }
    ]
    return (books)
}

// Выбор диапазона цен
var slider = document.getElementById('price-range');
noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
        'min': 200,
        'max': 2000
    }
});

//Выводим весь каталог книг
let cards = '';
for (let i = 0; i < filter(books).length; i++) {
    cards += `<article data-index=\"${i}\"class=\"card\"><a class=\"card__inner\" href=\"index.html#${filter(books)[i].uri}\"><img class=\"card__img\" src=\"img/${filter(books)[i].uri}.jpg\" width=\"148\" height=\"208\" alt=\"${filter(books)[i].name}\"/><h2 class=\"card__title\">${filter(books)[i].name}</h2><span class=\"card__new\">new</span><p class=\"card__price\">${filter(books)[i].price} ₽</p></a><button class=\"btn  btn--sm card__buy\"><svg class=\"btn__icon\" width=\"14\" height=\"14\"><use xlink:href=\"#plus\"></use></svg><span>В корзину</span></button></article>`
}
document.querySelector('.catalog__books-list').insertAdjacentHTML('afterbegin', cards);
