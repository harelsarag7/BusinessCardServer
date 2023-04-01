import { ErrorModel } from "./ErrorModel";

export class ResourceNotFoundError extends ErrorModel {
    constructor() {
        super();
        this.code = 404;
        this.message = 'Resource not found';
    }
}