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

// Variable to store the last fetched barcode
let lastBarcode = "0000000000000";

// Function to fetch the barcode from the local server
async function fetchBarcode() {
    try {
        const response = await fetch("http://localhost:3030/barcode");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const newBarcode = await response.json();
        if (newBarcode != lastBarcode && newBarcode != "0000000000000") {
            console.log(`Barcode changed: ${newBarcode}`);
            lastBarcode = newBarcode;
            depos.forEach((depo) => depo.searchBarcode(newBarcode));
        }
    } catch (error) {
        console.error("Error fetching barcode:", error);
    }
}

// Poll every second to fetch barcode updates
setInterval(fetchBarcode, 1000);

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "openWebsites") {
        depos.forEach((depo) => depo.openPage());
    } else if (message.type === "searchBarcode") {
        depos.forEach((depo) => depo.searchBarcode(message.barcode));
    }
});
