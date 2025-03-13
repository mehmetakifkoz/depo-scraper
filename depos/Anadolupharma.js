import { Depo } from "./Depo.js";

export class Anadolupharma extends Depo {
    constructor() {
        super();
        this.name = "Anadolupharma";
        this.url = "https://b2b.anadolupharma.com";
        this.searchAreaQuery = "input.searchProduct"; // Query for search area input
        this.submitButtonQuery = 'button.fa-magnifying-glass'; // Query for submit button
    }
}
