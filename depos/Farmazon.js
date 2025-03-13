import { Depo } from "./Depo.js";

export class Farmazon extends Depo {
    constructor() {
        super();
        this.name = "Farmazon";
        this.url = "https://www.farmazon.com.tr";
        this.searchAreaQuery = 'input[data-testid="header-search-input"]'; // Query for search area input
        this.submitButtonQuery = 'button[type="submit"]'; // Query for submit button
    }
}
