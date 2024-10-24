import {Browser} from "puppeteer-core";
import puppeteer from 'puppeteer-core';
import {ATBScraper} from "./scrapers/atb_scraper";
import {ForaScraper} from "./scrapers/fora_scraper";
import {SilpoScraper} from "./scrapers/silpo_scraper";
import {TrashScraper} from "./scrapers/trash_scraper";

export class ScrapingService {
    private createBrowser:() => Promise<Browser> = async () => {
        return await puppeteer.launch({
            headless: true,
            args: ['--window-size=1920,1080','--no-sandbox', '--disable-setuid-sandbox','--disable-setuid-sandbox'],
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe',
        })
    }
    scrapData: () => Promise<Product[]> =async () => {
        const productArray: Product[] = [];
        const browser = await this.createBrowser();
        const atbScraper = new ATBScraper();
        const foraScraper = new ForaScraper();
        const silpoScraper = new SilpoScraper();
        const trashScraper = new TrashScraper();
        productArray.push(...await atbScraper.scrap(browser));
        productArray.push(...await foraScraper.scrap(browser));
        productArray.push(...await silpoScraper.scrap(browser));
        // productArray.push(... await trashScraper.scrap(browser));
        console.log("amount of products: ", productArray.length);
        return productArray;
    }

}

