import {Browser} from "puppeteer-core";
import puppeteer from 'puppeteer-core';

export class ScraperHandler{
    private createBrowser:() => Promise<Browser> = async () => {
        return await puppeteer.launch({
            headless: true,
            args: ['--window-size=1920,1080','--no-sandbox', '--disable-setuid-sandbox','--disable-setuid-sandbox'],
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe',
        })
    }
}