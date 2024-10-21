export class Scraper{
    wait:(ms:number) => Promise<void> = (ms)=> new Promise(resolve => setTimeout(resolve, ms));
}