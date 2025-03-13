import { Depo } from "./Depo.js";

export class Ecza1 extends Depo {
    constructor() {
        super();
        this.url = "https://www.ecza1.com/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Ecza1 depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
