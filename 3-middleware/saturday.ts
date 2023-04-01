import { NextFunction, Request, Response } from "express";
import { SaturdayForbiddenError } from "../4-models/SaturdayForbiddenError";

export function saturdayForbidden(req: Request, res: Response, next: NextFunction) {
    const today = new Date();
    const day = today.getDay() + 1;

    if (day === 7) {
        next(new SaturdayForbiddenError());
    }
    next();
}