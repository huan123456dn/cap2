const electronic_bill = require('../../models/billListOff.model')

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const thongke = async (req, res) => {
    const data = await electronic_bill.find();
    const ress = data.map(item => {
        return {
            dateBuy: item?.dateBuy,
            price: item.listProduct?.reduce((total, currentValue) => {
                return total += (currentValue?.quantityBuy * currentValue?.price)
            }, 0)
        }
    })
    const grouped = groupBy(ress, pro => pro.dateBuy);
    const result = [];
    for (const [key, value] of grouped) {
        const date = grouped.get(key)?.reduce((total, currentValue) => {
            console.log(currentValue);
            return {
                dateBuy: key,
                price: total.price + currentValue.price
            }
        });
        result.push(date);
    }

    return res.json(result);
}

module.exports = {
    thongke
}