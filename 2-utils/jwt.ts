import { sign } from "jsonwebtoken";
import { UserModel } from "../4-models/UserModel";

export function generateToken(user: UserModel) {
    return sign({
        "sub": user.id,
        // "role": user.role,
        "username": user.username,
        "email": user.email
    }, user.password, { expiresIn: '2h' });
}