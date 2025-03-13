import { Depo } from "./Depo.js";

export class Saglikeczadeposu extends Depo {
    constructor() {
        super();
        this.name = "Saglikeczadeposu";
        this.url = "https://eticaret.saglikeczadeposu.com";
        this.searchAreaQuery = '#inputSearch'; // Query for search area input
        this.submitButtonQuery = "#arama"; // Query for submit button
    }
}
