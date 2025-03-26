export class Depo {
    constructor() {
        if (new.target === Depo) {
            throw new Error("Cannot instantiate abstract class Depo directly.");
        }

        this.name = ""; // Name of the depo, to be defined in subclasses
        this.searchAreaQuery = ""; // CSS selector for the search area
        this.submitButtonQuery = ""; // CSS selector for the submit button
        this.lastBarcode = "0000000000000"; // Store the last fetched barcode

        // Start barcode fetching automatically
        setInterval(() => this.fetchBarcode(), 1000);
    }

    openPage() {
        if (!this.url) {
            throw new Error("URL is not defined for this depo.");
        }
        chrome.tabs.create({ url: this.url });
    }

    searchBarcode(barcode) {
        console.log(`Searching for barcode: ${barcode} in ${this.name} depo`);

        // Query all tabs and check if the specific URL is already open
        chrome.tabs.query({ url: `${this.url}/*` }, (tabs) => {
            this.injectScript(tabs[0].id, barcode);
        });
    }

    injectScript(tabId, barcode) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: (barcode, searchAreaQuery, submitButtonQuery) => {
                const searchArea = document.querySelector(searchAreaQuery);
                const submitButton = document.querySelector(submitButtonQuery);

                if (searchArea && submitButton) {
                    searchArea.value = barcode;  // Set barcode in search area
                    searchArea.dispatchEvent(new Event("input", { bubbles: true }));

                    // Trigger a click event on the submit button
                    submitButton.click();
                }
            },
            args: [barcode, this.searchAreaQuery, this.submitButtonQuery]
        });
    }

    async fetchBarcode() {
        try {
            const response = await fetch("http://localhost:3030/barcode");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const newBarcode = await response.json(); // Assuming JSON response
            if (newBarcode !== this.lastBarcode && newBarcode !== "0000000000000") {
                console.log(`Barcode changed: ${newBarcode} in ${this.name} depo`);
                this.lastBarcode = newBarcode;
                this.searchBarcode(newBarcode);
            }
        } catch (error) {
            console.error("Error fetching barcode:", error);
        }
    }

}
