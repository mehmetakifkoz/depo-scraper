import { Depo } from "./Depo.js";

export class Alliance extends Depo {
    constructor() {
        super();
        this.url = "https://esiparisv2.alliance-healthcare.com.tr/";
    }

    searchBarcode(barcode) {
        console.log(`Searching for ${barcode} in Alliance depo`);
        // In the future, we can automate barcode searching on the website here
    }
}
