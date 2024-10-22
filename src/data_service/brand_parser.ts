// const brandParser = (products: Product[]) => {
//     let brands: Brand[] = [];
//     for(let product of products){
//         let brandName = "";
//         let splitedTitle = product.title.split(' ');
//         let productIndex = products.indexOf(product);
//         products.splice(productIndex, 1);
//         for(let word of splitedTitle ){
//             if (word.includes("мл") ||
//                 word.includes("л") ||
//                 word.includes("500") ||
//                 word.includes("250") ||
//                 word.includes("0.5") ||
//                 word.includes("0,5") ||
//                 word.includes("зі") ||
//                 word.includes("смаком") ||
//                 word.includes("1л")
//             ) continue;
//             let counter = 0;
//             let brandProducts: Product[] = [];
//             for(let e of products){
//                 if(e.title.includes(word)){
//                     brandProducts.push(e);
//                     counter++;
//                 }
//                 if(e.title.includes("воля")){
//                     console.log("found");
//                 }
//                 if(counter >= 3){
//                     brandName = brandName+' '+word;
//                     brands.push({name: brandName.trim(), products: brandProducts});
//                     break;
//                 }
//             }
//         }
//     }
//     // console.log(brands);
//     brands = specificateBrands(brands);
//     // console.log(brands);
//
// }

// const specificateBrands = (brands: Brand[]) => {
//     let specificatedBrands: Brand[] = [];
//     while(brands.length > 1) {
//         for (let brand of brands) {
//             let brandName = brand.name.toLowerCase();
//             let brandIndex = brands.indexOf(brand);
//             let splitedBrandName = brandName.toLowerCase().trim().split(' ');
//             // console.log(splitedBrandName[0]);
//             brands.splice(brandIndex, 1);
//             for (let e of brands) {
//                 let splitedName = e.name.toLowerCase().split(' ');
//                 // console.log(splitedName[0].includes(splitedBrandName[0]))
//                 // console.log(splitedName[0]);
//                 // console.log(splitedBrandName[0]);
//                 if (splitedName[0].includes(splitedBrandName[0])) {
//                     // console.log(brands);
//                     brand.products = brand.products.concat(e.products);
//                     brands.splice(brands.indexOf(e), 1);
//                 }
//             }
//             specificatedBrands.push(brand);
//         }
//     }
//     console.log(specificatedBrands);
//     return specificatedBrands;
// }

const brandParser = (products: Product[]) => {
    let brands: Brand[] = [];

    for(let product of products){
        let splitedTitle = product.title.split(' ');
        let productIndex = products.indexOf(product);
        products.splice(productIndex, 1);
        let brandName = "";
        for(let word of splitedTitle ){
            let brandsProducts: Product[] = [];
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

            products.forEach(e=> {
                // console.log(word.toLowerCase().trim());
                // console.log(word.toLowerCase() === e.title.toLowerCase().split(' ')[0])
                if(e.title.toLowerCase().trim().includes(word.toLowerCase().trim())){
                    brandsProducts.push(...(products.splice(products.indexOf(e),1)));
                }
            })
            if(brandsProducts.length >= 3){
                brandName = brandName + ' ' + word;
                brands.push({name: brandName.trim(), products: brandsProducts});
                break;
            }

        }

    }
    if(products.length > 0){
        brands.push({name: "other", products: products});
    }
    // console.log(brands);
    specificateBrands(brands);
}
const specificateBrands = (brands: Brand[]) => {
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
                console.log(brand.name);
            }
        })
    }

    console.log(specificatedBrands);
    let count2 = 0;
    specificatedBrands.forEach(e => {
        count2 += e.products.length;
    })
    console.log(count2);
}

// const productsAllay = (firstProducts: Product[], secondProducts) => {
//     firstProducts.forEach(product => {
//         secondProducts.forEach(e => {
//             if(){
//                 console.log(e.title);
//             }
//     })
// }

module.exports = {brandParser};