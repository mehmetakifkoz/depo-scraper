export class Depo {
    constructor() {
        if (new.target === Depo) {
            throw new Error("Cannot instantiate abstract class Depo directly.");
        }
    }

    openPage() {
        if (!this.url) {
            throw new Error("URL is not defined for this depo.");
        }
        chrome.tabs.create({ url: this.url });
    }

    searchBarcode(barcode) {
        console.log(`Searching for barcode: ${barcode} on ${this.url}`);
    }
}
