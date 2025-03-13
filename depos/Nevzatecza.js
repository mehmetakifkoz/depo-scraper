import { Depo } from "./Depo.js";

export class Nevzatecza extends Depo {
    constructor() {
        super();
        this.name = "Nevzatecza";
        this.url = "http://webdepo.nevzatecza.com.tr";
        this.searchAreaQuery = '#txtIlcArama'; // Query for search area input
        this.submitButtonQuery = "span.input-group-addon"; // Query for submit button
    }
}
