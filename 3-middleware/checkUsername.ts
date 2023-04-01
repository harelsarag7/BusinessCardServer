import { NextFunction, Request, Response } from "express";
import { UsernameTaken } from "../4-models/UsernameTaken";
import { getUsers } from "../5-logic/users-logic";

export async function checkUsername(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;
    let allUsers = await getUsers();
    const duplicate = allUsers.filter(u => u.username === username);
    console.log(duplicate);
    
    
    if(duplicate.length > 0){
        next(new UsernameTaken());
    }
    next();
    return;
}