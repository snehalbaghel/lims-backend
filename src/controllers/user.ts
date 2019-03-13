import passport from "passport";
import { UserModel } from "../models/user";
import { IVerifyOptions } from "passport-local";
import { Request, Response, NextFunction } from "express";

export let postLogin = (req: Request,res: Response, next: NextFunction) => {
    console.info("Inside POST /login");
    passport.authenticate("local", (err: Error, user: UserModel, info: IVerifyOptions) => {
        if(err) {
            return next(err);
        }
        if(!user) {
           return res.json({message: info.message });
        }

        req.login(user, (err) => {
            if(err) { return next(err); }
            return res.json(user);
        })   
    })(req, res, next);
}