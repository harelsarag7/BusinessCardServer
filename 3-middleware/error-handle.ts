import { NextFunction, Request, Response } from "express";
import { ErrorModel } from "../4-models/ErrorModel";

export function catchAll(error: ErrorModel, req: Request, res: Response, next: NextFunction) {
    console.error(`[Cards server log]: ERROR - ${error.message}, ${req.method} - ${req.url}`);
    if(process.env.NODE_ENV === `dev`){
        res.status(error.code ?? 500).json({ errors: error.message });
    } else {
        res.status(error.code ?? 500).json({ errors: "Server error" });
    }
    return;
}