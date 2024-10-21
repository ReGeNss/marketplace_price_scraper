const keyWords  = [
    'напій',
    'Нaпій',
    'безалкогольний',
    'енергетичний',
    'газований',
    'гaзoвaний',
    'ж/б',
    'eнepгeтичний',
    'та',
    'сильногазований',
    'ПЕТ',
    'з/б',
    'середньогазований',
]
const productDataNormalize = (products: Product[]) => {
    const regex = new RegExp(keyWords.join("|"), "gi");
    for(let product of products){
        product.title = product.title.normalize("NFC").replace(regex, '').trim();

    }
    return products;
};

module.exports = {productDataNormalize};