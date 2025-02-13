export class Depo {
    constructor() {
        if (new.target === Depo) {
            throw new Error("Cannot instantiate abstract class Depo directly.");
        }
        this.lastBarcode = "0000000000000"; // Store the last fetched barcode
    }

    openPage() {
        if (!this.url) {
            throw new Error("URL is not defined for this depo.");
        }
        chrome.tabs.create({ url: this.url });
    }

    async fetchBarcode() {
        try {
            const response = await fetch("http://localhost:3030/barcode");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const newBarcode = await response.text();
            if (newBarcode !== this.lastBarcode) {
                console.log(`Barcode changed: ${newBarcode}`);
                this.lastBarcode = newBarcode;
            }
        } catch (error) {
            console.error("Error fetching barcode:", error);
        }
    }
}
