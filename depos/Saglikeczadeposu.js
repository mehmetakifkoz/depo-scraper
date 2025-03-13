import { Depo } from "./Depo.js";

export class Saglikeczadeposu extends Depo {
    constructor() {
        super();
        this.url = "https://eticaret.saglikeczadeposu.com/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Saglikeczadeposu depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
