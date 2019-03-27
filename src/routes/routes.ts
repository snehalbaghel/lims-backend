import express from "express";
import {Request, Response} from "express";
import { default as User, UserModel} from "../models/user";
import * as userController from "../controllers/user";
import * as itemController from "../controllers/item";
import * as requestController from "../controllers/request";

export class Routes {
    public routes(app: express.Application): void {
        app
            .route('/ping')
            .get((req: Request, res: Response) => {
                res
                    .status(200)
                    .json({ message: 'Pong!'});
            });

        app
            .route('/register')
            .post(async (req: Request, res: Response) => {
                let newUser: UserModel = new User();
                newUser.name = req.body.name;
                newUser.username = req.body.username;
                newUser.password = req.body.password;
                newUser.accessLevel = req.body.accessLevel;
                // console.log("sup")
                try{
                    let user = await newUser.save();
                    console.log(user);
                    res.json({message: "ok"});
                } catch(err) {
                    console.error(err);
                }
            });

        app.post('/login',userController.postLogin);
        app.get('/user',userController.isValidUser ,userController.getUser);
        app.get('/logout',userController.isValidUser, userController.getLogout);
        app.get('/items', userController.isValidUser, itemController.getItems);
        app.post('/request', userController.isValidUser, requestController.postRequest);
        app.get('/requests', userController.isValidUser, requestController.getRequests);
        app.post('/a3pprove', userController.isValidUser, requestController.approveRequest);
        app.route('/addItem').post(itemController.postItem);

    }
}