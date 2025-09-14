import { Depo } from "./Depo.js";

export class Farmazonrx extends Depo {
    constructor() {
        super();
        this.name = "Farmazonrx";
        this.url = "https://www.farmazonrx.com.tr";
        this.searchMethod = "url";
        this.barcodeIdHash = {};
        this.urlSearchString = "";

        // Load JSON asynchronously
        this.loadBarcodeIdHash();
    }

    async loadBarcodeIdHash() {
        try {
            const response = await fetch(chrome.runtime.getURL("../cache/farmazonrx.json"));
            this.barcodeIdHash = await response.json();
        } catch (err) {
            console.error("Failed to load barcodeIdHash:", err);
            this.barcodeIdHash = {};
        }
    }

    searchByUrl(tabId, barcode) {
        let productId = this.barcodeIdHash[barcode];
        this.urlSearchString = `https://www.farmazonrx.com.tr/product/${productId}`;
        if (!this.urlSearchString) {
            console.error(`URL search string is not defined for ${this.name}`);
            return;
        }
        chrome.tabs.update(tabId, { url: this.urlSearchString });
    }
}
