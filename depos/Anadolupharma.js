import { Depo } from "./Depo.js";

export class Anadolupharma extends Depo {
    constructor() {
        super();
        this.name = "Anadolupharma";
        this.url = "https://b2b.anadolupharma.com";
        this.searchAreaQuery = "input.gridjs-input.gridjs-search-input"; // Query for search area input
        this.submitButtonQuery = 'button.fa-magnifying-glass'; // Query for submit button
    }

    searchBarcode(barcode) {
        console.log(`Searching for barcode: ${barcode} in Anadolupharma depo`);

        // Query all tabs and check if the specific URL is already open
        chrome.tabs.query({ url: `${this.url}/*` }, (tabs) => {
                // If the tab is already open, update the URL with the barcode
                const searchUrl = `${this.url}/UrunAra/1?search=${barcode}`;
                chrome.tabs.update(tabs[0].id, { url: searchUrl });
        });
    }
}
