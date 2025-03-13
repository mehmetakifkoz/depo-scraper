import { Depo } from "./Depo.js";

export class Sentezb2b extends Depo {
    constructor() {
        super();
        this.url = "https://www.sentezb2b.com/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Sentezb2b depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
