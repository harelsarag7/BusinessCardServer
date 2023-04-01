import express from 'express';
import { addUser, getUser, login } from '../5-logic/users-logic';
import { BadCredentialsError } from '../4-models/BadCredentials';
import { generateToken } from '../2-utils/jwt';
import { ResourceNotFoundError } from '../4-models/ResourceNotFoundError';
import { UserModel } from '../4-models/UserModel';
import { checkUsername } from '../3-middleware/checkUsername';


// import crypto from "crypto";
import { hashPassword } from '../2-utils/hash';

export const authRouter = express.Router();

authRouter.post('/auth/register', checkUsername, async (req, res, next) => {
    const {firstName, lastName, email, phone, username, password} = req.body;
    const hashedPassword = hashPassword(password);
    // console.log(hashedPassword);
    
    const result = await addUser(firstName, lastName, email, phone, username, hashedPassword);
    let id = result.id
    const user: UserModel = {id, firstName, lastName, email, phone,  username, password}
    const token = generateToken(user);
    res.status(201).send(token);
});

authRouter.get('/user/:id([0-9]+)', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUser(+id);
        res.json(user);
    } catch (e) {
        next(new ResourceNotFoundError());
    }
})


authRouter.post('/auth/login', async (req, res, next) => {
    const {username, password} = req.body;
    const hashedPassword = hashPassword(password);
    // console.log(hashedPassword);
    
    const result = await login( username, hashedPassword);
    if (!result) {
        next(new BadCredentialsError());
        res.status(404)
        return;
    }
    let id = result.id
    const user: UserModel = {id, username, password}



    const token = generateToken(user);
    res.status(201).send(token);
});