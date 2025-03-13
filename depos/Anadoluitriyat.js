import { Depo } from "./Depo.js";

export class Anadoluitriyat extends Depo {
    constructor() {
        super();
        this.url = "https://b4b.anadoluitriyat.com/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Anadoluitriyat depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
