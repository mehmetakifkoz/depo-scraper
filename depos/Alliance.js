import { Depo } from "./Depo.js";

export class Alliance extends Depo {
    constructor() {
        super();
        this.name = "Alliance";
        this.url = "https://esiparisv2.alliance-healthcare.com.tr"; // Corrected URL
        this.searchAreaQuery = "#searchArea"; // Query for search area input
        this.submitButtonQuery = 'button[type="submit"]'; // Query for submit button
    }
}
