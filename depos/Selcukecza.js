import { Depo } from "./Depo.js";

export class Selcukecza extends Depo {
    constructor() {
        super();
        this.name = "Selcukecza";
        this.url = "https://webdepo.selcukecza.com.tr/Siparis/hizlisiparis.aspx";
        this.searchAreaQuery = '#txtIlcArama'; // Query for search area input
        this.submitButtonQuery = "span.input-group-addon"; // Query for submit button
    }
}
