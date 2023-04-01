// import { dal } from "../2-utils/dal";
import { OkPacket } from "mysql2/promise";
import * as path from "path";
import { execute } from "../2-utils/dal";
import { CardModel } from "../4-models/CardModel";

// export function getCards() {
//     return dal.getAllCards();
// }

export async function getCards(): Promise<CardModel[]>{
    const query = "SELECT * FROM businesscard.cards";
    const [rows] = await execute<CardModel[]>(query);
    return rows
}
export async function getAllUserCards(userid: number): Promise<CardModel[]>{
    const query = "SELECT * FROM businesscard.cards WHERE userid = ?";
    const [rows] = await execute<CardModel[]>(query, [userid]);
    return rows
}

export async function getCardById(id: number): Promise<CardModel>{
    const query = "SELECT * FROM businesscard.cards WHERE id = ?";
    const [rows] = await execute<CardModel[]>(query, [id]);
    if(rows.length === 0) return null;
    // rows[0].image = path.resolve('1-assets/' + rows[0].image)
    
    return rows[0];
}

// export async function getImageByCard(id:number) {
    // rows[0].image = path.resolve('1-assets/' + rows[0].image)
    
// }
export async function addCard( userid: number, businessName: string, businessDescription: string, image: string,  phone: string, email: string, location: string, template: number, website: string, facebook: string, github: string, twitter: string, iconsColor: string){
    if(!iconsColor) {
        iconsColor = "undefined"
    }
    const query = "INSERT INTO businesscard.cards( userid, businessName, businessDescription, phone, email, location, templateNum, website, facebook , image, github, twitter, iconsColor ) VALUES(?,?, ?, ?, ?,?, ?, ?,?, ?, ?,?, ?); ";
    
    // const query = `INSERT INTO businesscard.cards( userid, templateNum, businessName, businessDescription, phone, email, location, website, facebook ) VALUES('${userid}', '${template}', '${businessName}', '${businessDescription}','${phone}', '${email}', '${location}', '${website}', '${facebook}'); `;
    const [results] = await execute<OkPacket>(query, [userid, businessName, businessDescription, phone, email, location, template, website, facebook,image, github, twitter, iconsColor])
    // console.log(results);
    const id = results.insertId;
    return {
        id,
        userid,
        template,
        businessName,
        businessDescription,
        image,
        phone,
        email,
        location,
        website,
        facebook,
        github,
        twitter,
        iconsColor

    };
}


export async function deleteCard(id: number) {
    // const query = `INSERT INTO businesscard.cards( userid ) VALUES('${id}'); `;
    const query = `DELETE FROM businesscard.cards WHERE id = ?; `;
    const [results] = await execute<OkPacket>(query,[id])
    // console.log(results);

}




export async function updateCard(id: number, cardBody: CardModel) {
console.log(id);

    const { businessName, businessDescription, phone, email, location, website, facebook } = cardBody
    const query = `UPDATE businesscard.cards SET businessName = "${businessName}", businessDescription = "${businessDescription}", phone = "${phone}", email = "${email}", location = "${location}", website = "${website}", facebook = "${facebook}" WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query)
    console.log(results);
    
    return results;
}