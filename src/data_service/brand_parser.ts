 const brandParser = (products: Product[]) => {
        let brands: Brand[] = [];
        console.log('brandParser' + products.length);
        let otherProducts: Product[] = [];
        let c = 0;
        for(let product of products){
            let splitedTitle = product.title.split(' ');
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
                    // console.log(word.toLowerCase() === e.title.toLowerCase().split(' ')[0])
                    if(e.title.toLowerCase().trim().includes(word.toLowerCase().trim())){
                        brandsProducts.push(...(products.splice(products.indexOf(e),1)));
                    }
                })
                if(brandsProducts.length >= 3){
                    brandName = brandName + ' ' + word;
                    // if(brandName.trim() == '' ){
                    //     brands.push({name: product.title, products: brandsProducts});
                    //     console.log('brandName ERR '+ brandName);
                    //     break;
                    // }
                    // brandsProducts.push(product);
                    console.log("Products now " +products.length);
                    console.log("brand now: "+brandsProducts.length);
                    brands.push({name: brandName.trim(), products: brandsProducts});
                    break;
                }else{
                    otherProducts.push(product);
                }

            }
            console.log('brandParserFIN' + products.length);

        }
        if(products.length > 0){
            // otherProductSpecificate(products, brands);
            let otherProductFiltered = otherProductDuplicateRemove([...products,...otherProducts]);
            brands.push({name: "other", products: otherProductFiltered});
        }
        let specificatedBrands = brandsDublicateDelete(brands);
        let formatedBrands = otherProductSpecificate(specificatedBrands);
        return extendBrandsName(formatedBrands);
}

const extendBrandsName = (brands: Brand[]) => {
    let indexOfOther = brands.findIndex(e => e.name.toLowerCase().includes('other'));
    let otherProducts = brands.splice(indexOfOther, 1);
    for(let brand of brands){
        let products = brand.products;
        let extendetName = "";
        let splitedProductName = brand.name.split(' ');
        for(let part of splitedProductName){
            console.log(products.some(e => e.title.toLowerCase().includes(part.toLowerCase().trim() )));
            if(products.some(e => e.title.toLowerCase().includes(part.toLowerCase().trim()))){
                extendetName = extendetName + ' ' + part;
            }
        }
        brand.name = extendetName.trim();
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
    console.log('otherProductDuplicate');
    console.log(fitleredProducts);
    return fitleredProducts;
}
const otherProductSpecificate = (brands: Brand[]) => {
    let otherProducts = brands.find(e => e.name === "other")?.products;
    if(otherProducts == undefined) return brands;
    for(let product of otherProducts){
        let splitedTitle = product.title.toLowerCase().split(' ');
        for(let brand of brands){
            if(brand.name.toLowerCase().includes(splitedTitle[0])){
                otherProducts.splice(otherProducts.indexOf(product), 1);
                brand.products.push(product);
                console.log('OTHER' + brand.name);
            }
        }
    }
    console.log('otherProductSpecificate!!!!!!!!');
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

    console.log(specificatedBrands);
    let count2 = 0;
    specificatedBrands.forEach(e => {
        count2 += e.products.length;
    })
    console.log(count2);
    return specificatedBrands;
}


module.exports = {brandParser};