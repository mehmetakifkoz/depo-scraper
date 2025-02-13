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

// Poll each depo for barcode updates every second
setInterval(() => {
    depos.forEach((depo) => depo.fetchBarcode());
}, 1000);

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "openWebsites") {
        depos.forEach((depo) => depo.openPage());
    }
});
