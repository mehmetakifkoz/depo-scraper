import { Depo } from "./Depo.js";

export class Sentezb2b extends Depo {
    constructor() {
        super();
        this.name = "Sentezb2b";
        this.url = "https://www.sentezb2b.com";
        this.searchAreaQuery = '#search-field'; // Query for search area input
        this.submitButtonQuery = "#search-button"; // Query for submit button
    }
}
