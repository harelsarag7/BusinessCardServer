// import { dal } from "../2-utils/dal";
import { OkPacket } from "mysql2";
import { execute } from "../2-utils/dal";
import { UserModel, UserRole } from "../4-models/UserModel";

export async function getUsers(): Promise<UserModel[]>{
    const query = "SELECT * FROM users";
    const [rows] = await execute<UserModel[]>(query);
    return rows
}

export async function getUser(id: number): Promise<UserModel>{
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await execute<UserModel[]>(query, [id]);
    if(rows.length === 0) return null;
    return rows[0];
}
export async function login(username, password): Promise<UserModel>{
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [rows] = await execute<UserModel[]>(query, [username, password]);
    if(rows.length === 0) return null;
    return rows[0];
}


export async function addUser(firstName: string, lastName: string, email: string, phone: string, username: string, password: string) {
//    password = crypto.createHash("sha256").update(password).digest("hex");


    const query = `INSERT INTO users(firstName, lastName, email, phone, username, password) VALUES(?,?,?,?,?,?)`;
    const [results] = await execute<OkPacket>(query, [firstName, lastName, email,phone,username, password])
    // if()


    const id = results.insertId;
    return {
        id,
        firstName,
        lastName,
        email,
        phone,
        username,
        password
    };
}
