import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { JwtError } from "../4-models/JwtError";
import { UserRole } from "../4-models/UserModel";
import { getUser } from "../5-logic/users-logic";

export function verifyUser(userRoles: UserRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization.substring(7);

        if (!token) {
            next(new JwtError('no token'));
            return;
        }

        try {
            const { sub } = decode(token);
            const { password, role } = await getUser(+sub);
            if (!userRoles.includes(role)) throw new Error("bad role");
            verify(token, password);
        } catch (e) {
            next(new JwtError(e.message));
            return;
        }
        next();
    }
}