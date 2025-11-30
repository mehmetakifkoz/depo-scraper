import { Depo } from "./Depo.js";

export class Akvita extends Depo {
    constructor() {
        super();
        this.name = "Akvita";
        this.url = "https://www.akvitaecza.com";
        this.searchAreaQuery = "#search-field";
        this.submitButtonQuery = "#search-button";
    }
}
