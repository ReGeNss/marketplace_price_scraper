import {ScrapingService} from "./scraper_service";
import {dataService} from "./data_service/data_service";

const scraper = new ScrapingService();
const scrapedData = scraper.scrapData();
