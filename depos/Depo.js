export class Depo {
    constructor() {
        if (new.target === Depo) {
            throw new Error("Cannot instantiate abstract class Depo directly.");
        }

        this.name = ""; // Name of the depo, to be defined in subclasses
        this.url = ""; // Base URL of the depo
        this.searchAreaQuery = ""; // CSS selector for the search area
        this.submitButtonQuery = ""; // CSS selector for the submit button
        this.urlSearchString = ""; // URL search string (if using URL parameter method)
        this.searchMethod = "inject"; // Default method is script injection
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
        console.log(`Searching for barcode: ${barcode} in ${this.name} depo using ${this.searchMethod} method`);

        chrome.tabs.query({ url: `${this.url}/*` }, (tabs) => {
            if (tabs.length === 0) {
                console.warn(`No open tab found for ${this.name}`);
                return;
            }

            if (this.searchMethod === "inject") {
                this.injectScript(tabs[0].id, barcode);
            } else if (this.searchMethod === "url") {
                this.searchByUrl(tabs[0].id, barcode);
            } else {
                console.error(`Unknown search method for ${this.name}: ${this.searchMethod}`);
            }
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
                    submitButton.click(); // Trigger search
                }
            },
            args: [barcode, this.searchAreaQuery, this.submitButtonQuery]
        });
    }

    searchByUrl(tabId, barcode) {
        if (!this.urlSearchString) {
            console.error(`URL search string is not defined for ${this.name}`);
            return;
        }

        const searchUrl = `${this.url}${this.urlSearchString}${barcode}`;
        chrome.tabs.update(tabId, { url: searchUrl });
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
