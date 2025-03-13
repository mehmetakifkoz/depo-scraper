import { Depo } from "./Depo.js";

export class Anadoluitriyat extends Depo {
    constructor() {
        super();
        this.name = "Anadoluitriyat";
        this.url = "https://b4b.anadoluitriyat.com";
        this.searchAreaQuery = 'input'; // Query for search area input
        this.submitButtonQuery = 'button[type="submit"]'; // Query for submit button
    }
}
