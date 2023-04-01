import { ErrorModel } from "./ErrorModel";

export class BadCredentialsError extends ErrorModel {
    constructor() {
        super();
        this.code = 403;
        this.message = 'Username or password is wrong';
    }
}