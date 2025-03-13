import { Depo } from "./Depo.js";

export class Selcukecza extends Depo {
    constructor() {
        super();
        this.url = "https://webdepo.selcukecza.com.tr/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Selcukecza depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
