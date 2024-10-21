const keyWords  = [
    'напій',
    'безалкогольний',
    'енергетичний',
    'газований',
    'ж/б',
    'сильногазований',
    'ПЕТ',
    'з/б',
    'середньогазований',
]
const productDataNormalizeAndTrim = (products: Product[]) => {
    const regex = new RegExp(keyWords.join("|"), "gi");
    for(let product of products){
        product.title = product.title.normalize("NFC").replace(regex, '').trim();

    }
    return products;
};

module.exports = productDataNormalizeAndTrim;