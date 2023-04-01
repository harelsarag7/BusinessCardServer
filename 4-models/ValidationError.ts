import { ZodError } from "zod";
import { ErrorModel } from "./ErrorModel";

export class ValidationError extends ErrorModel {
    constructor(e: ZodError) {
        super();
        this.code = 406;
        this.message = e.issues.map(issue => issue.message)
    }
}