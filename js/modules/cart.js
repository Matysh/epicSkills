const store = [{
    index: 0,
    quantity: 1
}];

const addItem = (indexItem, maxCount = 10) => {

    const find = store.filter(el => el.index === indexItem);
    if (!find.length) {
        store.push({
            index: indexItem,
            quantity: 1
        });

        return;
    }





    if (find[0].quantity >= maxCount) {


    }

    find[0].quantity++;
};


export {
    addItem
}