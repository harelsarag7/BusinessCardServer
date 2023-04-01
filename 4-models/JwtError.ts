import { ErrorModel } from "./ErrorModel";

export class JwtError extends ErrorModel {
    constructor(message: string) {
        super();
        this.code = 403;
        this.message = message;
    }
}