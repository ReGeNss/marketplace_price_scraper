const brandParser = (products: Product[]) => {
    let brands: Brand[] = [];
    for(let product of products){
        let brandName = "";
        let splitedTitle = product.title.split(' ');
        let productIndex = products.indexOf(product);
        products.splice(productIndex, productIndex);
        for(let word of splitedTitle ){
            if (word.includes("мл") ||
                word.includes("л") ||
                word.includes("500") ||
                word.includes("250") ||
                word.includes("0.5") ||
                word.includes("0,5") ||
                word.includes("зі") ||
                word.includes("смаком") ||
                word.includes("1л")
            ) continue;
            let counter = 0;
            let brandProducts: Product[] = [];
            for(let e of products){
                if(e.title.includes(word)){
                    brandProducts.push(e);
                    counter++;
                }
                if(e.title.includes("воля")){
                    console.log("found");
                }
                if(counter >= 3){
                    brandName = brandName+' '+word;
                    brands.push({name: brandName.trim(), products: brandProducts});
                    break;
                }
            }
        }
    }
    console.log(brands);
    brands = specificateBrands(brands);
    console.log(brands);

}

const specificateBrands = (brands: Brand[]) => {
    let specificatedBrands: Brand[] = [];
    for(let brand of brands){
        let brandName = brand.name.toLowerCase();
        let brandIndex = brands.indexOf(brand);
        let splitedBrandName = brandName.split(' ');
        // console.log(splitedBrandName[0]);
        brands.splice(brandIndex, brandIndex);
        for(let e of brands){
            let splitedName = e.name.toLowerCase().split(' ');
            // console.log(splitedName[0].includes(splitedBrandName[0]))
            // console.log(splitedName[0]);
            // console.log(splitedBrandName[0]);
            if(splitedName[0].includes(splitedBrandName[0])){
                brand.products = brand.products.concat(e.products);
                console.log(brands.length);
                brands.splice(brands.indexOf(e), brands.indexOf(e));
            }
        }
        specificatedBrands.push(brand);
    }
    console.log(brands);
    return specificatedBrands;
}

module.exports = {brandParser};