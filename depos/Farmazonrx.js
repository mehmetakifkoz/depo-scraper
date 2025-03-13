import { Depo } from "./Depo.js";

export class Farmazonrx extends Depo {
    constructor() {
        super();
        this.url = "https://www.farmazonrx.com.tr/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Farmazonrx depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
