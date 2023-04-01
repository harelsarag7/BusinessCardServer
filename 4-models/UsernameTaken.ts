import { ErrorModel } from "./ErrorModel";

export class UsernameTaken extends ErrorModel {
    constructor() {
        super();
        this.code = 403;
        this.message = 'Username is already taken';
    }
}