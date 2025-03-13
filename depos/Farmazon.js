import { Depo } from "./Depo.js";

export class Farmazon extends Depo {
    constructor() {
        super();
        this.url = "https://www.farmazon.com.tr/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Farmazon depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
