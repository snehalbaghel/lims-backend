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
           return res.status(401).json(info);
        }

        req.login(user, (err) => {
            if(err) { return next(err); }
            return res.status(200).json(user);
        })   
    })(req, res, next);
}

export let getUser = (req: Request, res: Response, next: NextFunction) => {
    console.info("Inside GET /user");
    //isValidUser(req, res, next);
    return res.status(200).json(req.user);
}

export let getLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout();
   // isValidUser(req, res, next);
    return res.status(200).json({message: 'Logout Successful'});
}


export function isValidUser(req: Request, res: Response, next: NextFunction) {
    if(req.isAuthenticated())
        next();
    else return res.status(401).json({message: 'Unauthorized Request'})
}