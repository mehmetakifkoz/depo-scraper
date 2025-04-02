import { Depo } from "./Depo.js";

export class Anadolupharma extends Depo {
    constructor() {
        super();
        this.name = "Anadolupharma";
        this.url = "https://b2b.anadolupharma.com";
        this.urlSearchString = "/UrunAra/1?search="; // Search format
        this.searchMethod = "url"; // Use URL-based search
    }
}
