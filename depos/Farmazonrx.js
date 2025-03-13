import { Depo } from "./Depo.js";

export class Farmazonrx extends Depo {
    constructor() {
        super();
        this.name = "Farmazonrx";
        this.url = "https://www.farmazonrx.com.tr";
        this.searchAreaQuery = 'input.ui-input.has-icon-left.pr-6.is-header-search'; // Query for search area input
        this.submitButtonQuery = 'button[type="submit"]'; // Query for submit button
    }
}
