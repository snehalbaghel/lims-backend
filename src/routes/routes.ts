import express from "express";
import {Request, Response} from "express";
import { default as User, UserModel} from "../models/user";
import * as userController from "../controllers/user";

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
                console.log("sup")
                try{
                    let user = await newUser.save();
                    console.log(user);
                    res.json({message: "ok"});
                } catch(err) {
                    console.error(err);
                }
            });

        app.route('/login').post(userController.postLogin);


    }
}