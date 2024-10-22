import {ScrapingService} from "./scraper_service";
import {DataService} from "./data_service/data_service";

const scraper = new ScrapingService();
const dataService = new DataService();
let scrapedData:Product[] =[];
const startProssecing =(async () => {
    scrapedData = await scraper.scrapData();
    dataService.filterAndTransformData(scrapedData);
});
try {
    startProssecing();
}catch(e){
    console.log(e);
    startProssecing();
}


