import { productDataNormalize } from './data_normalize';
import {brandParser} from './brand_parser';

export class DataService{
    filterAndTransformData(data: Product[]){
        const normalizedData = productDataNormalize(data);
        brandParser(normalizedData);
    };
}