import express from 'express';
import { UploadedFile } from 'express-fileupload';
import * as path from 'path';
import { verifyUser } from '../3-middleware/verifyUser';
import { CardModel, productValidation } from '../4-models/CardModel';
import { ResourceNotFoundError } from '../4-models/ResourceNotFoundError';
import { UserRole } from '../4-models/UserModel';
import { getCardById, getCards, addCard, updateCard, deleteCard, getAllUserCards } from '../5-logic/cards-logic';
import fs from 'fs'

export const cardsRouter = express.Router();
cardsRouter.get('/test', async (req,res,next) => {
    try{
        res.json("test");
    } catch(e){
        console.log(e);
    }
})
// cardsRouter.get('/cards', verifyUser([UserRole.Admin, UserRole.User, UserRole.Viewer]), async (req, res, next) => {
cardsRouter.get('/cards', async (req, res, next) => {
    try {
        const cards = await getCards();
        res.json(cards);
    } catch (e) {
        next(e);
    }
});


cardsRouter.get('/cards/:userid', async (req, res, next) => {
    const userid = +req.params.userid;
    try {
        const cards = await getAllUserCards(userid);
        res.json(cards);
    } catch (e) {
        next(e);
    }
});



cardsRouter.get('/card/:id([0-9]+)', async (req, res, next) => {
    try {
        const id = req.params.id;
        const card = await getCardById(+id);
        res.json(card)
    } catch (e) {
        next(new ResourceNotFoundError());
    }
});
cardsRouter.get('/card/image/:id([0-9]+)', async (req, res, next) => {
    try {
        const id = req.params.id;
        const card = await getCardById(+id);
        res.sendFile(path.join(__dirname, '..', '1-assets', 'images', id + path.extname(card.image)) )
    } catch (e) {
        next(new ResourceNotFoundError());
    }
});




cardsRouter.post('/uploadFile', async (req, res) => {
    // console.log(req.files);
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = req.files['file'] as UploadedFile;
    
    if (!image) {
        return res.status(400).send('No image was uploaded.');
    }
    if(image.size === 0) {
        return res.status(400).send('File is empty')
    }
    image.mv(path.resolve(__dirname, '..', '1-assets', 'images', image.name));
    
});


// have to change the validation
// cardsRouter.post('/cards', verifyUser([UserRole.Admin]), productValidation, async (req, res) => {
cardsRouter.post('/cards', async (req, res) => {
    // console.log(req.files);
    const userid = +req.body.userid;
    // console.log(userid);
    const businessName = req.body.businessName;
    const businessDescription = req.body.businessDescription;
    const image = req.body.image;
    const phone = req.body.phone;
    const email = req.body.email;
    const templateNum = +req.body.templateNum;
    const website = req.body.website;
    const location = req.body.location;
    const facebook = req.body.facebook;
    const github = req.body.github;
    const twitter = req.body.twitter;
    const iconsColor = req.body.iconsColor;

    const card = await addCard(userid, businessName, businessDescription, image, phone, email,location, templateNum, website, facebook, github, twitter, iconsColor);
    
    const imagePath = path.join(__dirname, '..', '1-assets', 'images', image);
    
    console.log(imagePath);
   console.log(path.resolve(__dirname, '..', '1-assets', 'images', image));
//    console.log(path.resolve('1-assets', 'images'));


        const imagePathWithoutName = path.join(__dirname, '..', '1-assets', 'images');
        // const imagePathWithoutName = path.resolve(process.cwd(), '1-assets', 'images');

    fs.access(`${imagePath}`, fs.constants.F_OK, (err) => {
        // let newName = `${imagePathWithoutName}/` +`${card.id}${path.extname(imagePath)}`;
        let newName =  path.resolve("1-assets", "images",  `${card.id}${path.extname(imagePath)}`) ;
        fs.rename(`${imagePath}`, newName, (err) => {
            console.log('File Renamed!');
        });
    });
    // fs.access('C:\\Users\\97254\\Desktop\\FullBusinessCard\\Backend\\1-assets\\images\\' + image, fs.constants.F_OK, (err) => {
    //     let newName = 'C:\\Users\\97254\\Desktop\\FullBusinessCard\\Backend\\1-assets\\images\\' +`${card.id}${path.extname(imagePath)}`;
    //     fs.rename('C:\\Users\\97254\\Desktop\\FullBusinessCard\\Backend\\1-assets\\images\\' + image, newName, (err) => {
    //         console.log('File Renamed!');
    //     });
    // });

    res.status(201).json(card);
}
);

// cardsRouter.put('/cards/:id', verifyUser([UserRole.Admin]), async (req, res, next) => {
cardsRouter.put('/editcard/:id', async (req, res, next) => {
    const id = +req.params.id;
    const body = req.body
    
    try {
        const result = await updateCard(id, body);
        res.json(result);
    } catch (e) {
        next(new ResourceNotFoundError());
    }
});

cardsRouter.delete('/cards/:id', async (req, res) => {
    const id = +req.params.id;
    await deleteCard(id);
    res.sendStatus(204);
});