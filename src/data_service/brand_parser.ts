 const brandParser = (products: Product[]) => {
        let brands: Brand[] = [];
        console.log('brandParser' + products.length);
        let otherProducts: Product[] = [];
        for(let product of products){
            let splitedTitle = product.title.split(' ');
            splitedTitle.splice(2, splitedTitle.length-2);
            // console.log('splitedTitle'+ splitedTitle);
            let productIndex = products.indexOf(product);
            // products.splice(productIndex, 1);
            let brandName = "";
            for(let word of splitedTitle ){
                let brandsProducts: Product[] = [];
                if (word.includes("зі") ||
                    word.includes("смаком")
                ) continue;
                products.forEach(e=> {
                    // console.log(word.toLowerCase().trim());
                    // console.log(word.toLowerCase() ===
                    if(e.title.toLowerCase().trim().includes(word.toLowerCase().trim())){
                        brandsProducts.push(...(products.splice(products.indexOf(e),1)));
                    }
                })
                if(brandsProducts.length >= 3){
                    brandName = brandName + ' ' + word;
                    // console.log("word "+word + product.title);
                    // console.log('brandName' + brandName);
                    // if(brandName.trim() == '' ){
                    //     brands.push({name: product.title, products: brandsProducts});
                    //     console.log('brandName ERR '+ brandName);
                    //     break;
                    // }
                    // brandsProducts.push(product);
                    if(brandName.trim().length <= 2 )  continue;
                    // console.log("Products now " +products.length);
                    // console.log("brand now: "+brandsProducts.length);
                    brands.push({name: brandName.trim(), products: brandsProducts});
                    break;
                }else{
                    otherProducts.push(product);
                }

            }
            // console.log('brandParserFIN' + products.length);

        }
        if(products.length > 0){
            // otherProductSpecificate(products, brands);
            let otherProductFiltered = otherProductDuplicateRemove([...products,...otherProducts]);
            brands.push({name: "other", products: otherProductFiltered});
        }
        let specificatedBrands = brandsDublicateDelete(brands);
        let extendedBrands = extendBrandsName(specificatedBrands);
        let formatedBrands = otherProductSpecificate(extendedBrands);
        return formatedBrands;
}

const extendBrandsName = (brands: Brand[]) => {
    let indexOfOther = brands.findIndex(e => e.name.toLowerCase().includes('other'));
    let otherProducts = brands.splice(indexOfOther, 1);
    for(let brand of brands){
        let products = brand.products;
        let extendedName = "";
        let splitedProductName = brand.products[0].title.split(' ');
        for(let part of splitedProductName){
            if(products.every(e => e.title.toLowerCase().includes(part.toLowerCase().trim()))){
                extendedName = extendedName + ' ' + part;
            }
        }
        brand.name = extendedName.trim();
    }
    brands.push(...otherProducts);
    console.log('extendBrandsName ');
    console.log(brands);
    return brands;
}
const otherProductDuplicateRemove = (products: Product[]) => {
    console.log('otherProductDuplicate' + products.length);
    let fitleredProducts: Product[] = [];
    for(let product of products){
        const isDuplicate = fitleredProducts.some(oldProduct =>
            oldProduct.marketplace === product.marketplace &&
            oldProduct.title === product.title &&
            oldProduct.currentPrice === product.currentPrice &&
            oldProduct.oldPrice === product.oldPrice &&
            oldProduct.imgSrc === product.imgSrc &&
            oldProduct.volume === product.volume
        );
        if (!isDuplicate) {
            fitleredProducts.push(product);
        }
    }
    // console.log('otherProductDuplicate');
    console.log(fitleredProducts);
    return fitleredProducts;
}
const otherProductSpecificate = (brands: Brand[]) => {
    let otherProductsValide = brands.find(e => e.name === "other")?.products;
    if(otherProductsValide == undefined) return brands;
    let otherProducts = [...otherProductsValide];
    for(let product of otherProducts){
        let splitedTitle = product.title.toLowerCase().split(' ');
        for(let brand of brands){
            if(brand.name.toLowerCase().includes(splitedTitle[0])){
                otherProductsValide.splice(otherProductsValide.indexOf(product), 1);
                brand.products.push(product);
                break;
            }
        }
    }
    console.log(brands);
    return brands;
}

const brandsDublicateDelete = (brands: Brand[]) => {
    let specificatedBrands: Brand[] = [];
    let count = 0;
    brands.forEach(e => {
        count += e.products.length;
    })
    console.log(count);
    while(brands.length > 0) {
        // console.log(brands.length);
        brands.forEach(brand => {
            let specifitedBrand: Brand;
            let formatedBrandName = brand.name.toLowerCase().trim();
            brands.splice(brands.indexOf(brand), 1);
            brands.forEach(e => {
                if (e.name.trim().toLowerCase().includes(formatedBrandName)) {
                    brand.products.push(...e.products);
                    specificatedBrands.push({name: brand.name, products: brand.products});
                    brands.splice(brands.indexOf(e), 1);
                }
            })
            if (specificatedBrands.find(e => e.name.toLowerCase() === brand.name.toLowerCase()) == undefined) {
                specificatedBrands.push(brand);
            }
        })
    }

    // console.log(specificatedBrands);
    let count2 = 0;
    // specificatedBrands.forEach(e => {
    //     count2 += e.products.length;
    // })
    // console.log(count2);
    return specificatedBrands;
}


module.exports = {brandParser};
