const volumeParser = (products: Product[]) => {
    for(let product of products){
        let title = product.title.toLowerCase();
        if(title.includes("мл")){
            product.title = product.title.replace("мл", "").trim();
        }else if(title.includes("л")){
            product.title = product.title.replace("л", "").trim();
        }
    }
    for(let product of products){
        let title = product.title.toLowerCase();
        switch (true){
            case title.includes("500"):
                product.title = product.title.replace("500", "").trim();
                product.volume = "500 мл";
                break;
            case title.includes("0.5"):
                product.title = product.title.replace("0.5", "").trim();
                product.volume = "500 мл";
                break;
            case title.includes("0,5"):
                product.title = product.title.replace("0,5", "").trim();
                product.volume = "500 мл";
                break;
            case title.includes("250"):
                product.title = product.title.replace("250", "").trim();
                product.volume = "250 мл";
                break;
            case title.includes("0.25"):
                product.title = product.title.replace("0.25", "").trim();
                product.volume = "250 мл";
                // console.log(product.title + " " + product.volume);
                break;
            case title.includes("0,25"):
                product.title = product.title.replace("0,25", "").trim();
                product.volume = "250 мл";
                // console.log(product.title + " " + product.volume);
                break;
            case title.includes("0,33"):
                product.title = product.title.replace("0,33", "").trim();
                product.volume = "330 мл";
                break;
            case title.includes("330"):
                product.title = product.title.replace("330", "").trim();
                product.volume = "330 мл";
                break;
            case title.includes("0.33"):
                product.title = product.title.replace("0.33", "").trim();
                product.volume = "330 мл";
                break;
            case title.includes("1л"):
                product.title = product.title.replace("1л", "").trim();
                product.volume = "1 л";
                break;
            case title.includes("1"):
                product.title = product.title.replace("1", "").trim();
                product.volume = "1 л";
                break;
            case title.includes("0.75"):
                product.title = product.title.replace("0.75", "").trim();
                product.volume = "750 мл";
                break;
            case title.includes("0,75"):
                product.title = product.title.replace("0,75", "").trim();
                product.volume = "750 мл";
                break;
            case title.includes("750"):
                product.title = product.title.replace("750", "").trim();
                product.volume = "750 мл";
                break;
        }
    }
    for(let product of products){
        if(product.volume !==null){
            // console.log(product.title + product.volume)
        }
    }
    return products;
}

module.exports = {volumeParser};