import { Depo } from "./Depo.js";

export class Ecza1 extends Depo {
    constructor() {
        super();
        this.name = "Ecza1";
        this.url = "https://www.ecza1.com";
        this.searchAreaQuery = "#siteWideSearch"; // Query for search area input
        this.submitButtonQuery = '#searchProduct1'; // Query for submit button
    }
}
