import { ErrorModel } from "./ErrorModel";

export class SaturdayForbiddenError extends ErrorModel {
    constructor() {
        super();
        this.code = 406;
        this.message = 'Not accepting requests on saturday';
    }
}