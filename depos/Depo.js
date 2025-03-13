export class Depo {
    constructor() {
        if (new.target === Depo) {
            throw new Error("Cannot instantiate abstract class Depo directly.");
        }

        // Common properties for all Depo subclasses
        this.name = ""; // Name of the depo, to be defined in subclasses
        this.searchAreaQuery = ""; // CSS selector for the search area
        this.submitButtonQuery = ""; // CSS selector for the submit button
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
            // Handle case where no tab is found
            if (tabs.length === 0) {
                chrome.tabs.create({ url: this.url }, (tab) => {
                    this.injectScript(tab.id, barcode);
                });
            } else {
                this.injectScript(tabs[0].id, barcode);
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

                    // Trigger a click event on the submit button
                    submitButton.click();
                }
            },
            args: [barcode, this.searchAreaQuery, this.submitButtonQuery]
        });
    }
}
