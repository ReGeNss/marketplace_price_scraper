import { productDataNormalize } from './data_normalize';
import {brandParser} from './brand_parser';
import {volumeParser} from './volume_parser';

export class DataService{
    filterAndTransformData(data: Product[]){
        const normalizedProducts = productDataNormalize(data);
        const products = volumeParser(normalizedProducts);
        console.log(products.length);
        brandParser(products);
    };
}