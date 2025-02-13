import { Alliance } from "./depos/Alliance.js";
import { Selcukecza } from "./depos/Selcukecza.js";
import { Nevzatecza } from "./depos/Nevzatecza.js";
import { Anadolupharma } from "./depos/Anadolupharma.js";
import { Sentezb2b } from "./depos/Sentezb2b.js";
import { Anadoluitriyat } from "./depos/Anadoluitriyat.js";
import { Saglikeczadeposu } from "./depos/Saglikeczadeposu.js";
import { Farmazonrx } from "./depos/Farmazonrx.js";
import { Farmazon } from "./depos/Farmazon.js";
import { Ecza1 } from "./depos/Ecza1.js";

chrome.runtime.onInstalled.addListener(() => {
    console.log("Depo Scraper installed.");
});

// Function to fetch barcode from the local server
async function fetchBarcode() {
    try {
        const response = await fetch("http://localhost:3030/barcode");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const newBarcode = await response.text();
        if (newBarcode !== lastBarcode) {
            console.log(`Barcode changed: ${newBarcode}`);
            lastBarcode = newBarcode;
        }
    } catch (error) {
        console.error("Error fetching barcode:", error);
    }
}

// Variable to store the last fetched barcode
let lastBarcode = "";

// Poll the local server every second to check for barcode updates
setInterval(fetchBarcode, 1000);

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "openWebsites") {
        const depos = [
            new Alliance(),
            new Selcukecza(),
            new Nevzatecza(),
            new Anadolupharma(),
            new Sentezb2b(),
            new Anadoluitriyat(),
            new Saglikeczadeposu(),
            new Farmazonrx(),
            new Farmazon(),
            new Ecza1(),
        ];

        depos.forEach((depo) => depo.openPage());
    }
});
