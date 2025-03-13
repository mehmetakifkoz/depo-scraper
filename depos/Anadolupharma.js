import { Depo } from "./Depo.js";

export class Anadolupharma extends Depo {
    constructor() {
        super();
        this.url = "https://b2b.anadolupharma.com/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Anadolupharma depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
