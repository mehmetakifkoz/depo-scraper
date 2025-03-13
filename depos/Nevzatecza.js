import { Depo } from "./Depo.js";

export class Nevzatecza extends Depo {
    constructor() {
        super();
        this.url = "http://webdepo.nevzatecza.com.tr/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Nevzatecza depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
