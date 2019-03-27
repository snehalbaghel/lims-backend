import passport from "passport";
import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import AccessLevel from "../config/accessLevel";
import Item, { ItemModel } from "../models/item";

export let postItem = async (req: Request, res: Response, next: NextFunction) => {
    let currentUser: UserModel = req.user;
    if(req.isAuthenticated() && 
        (currentUser.accessLevel == AccessLevel.LabIncharge || 
        currentUser.accessLevel == AccessLevel.Professor)) {

            let newItem: ItemModel = new Item(req.body);
        
            try {
                let item = await newItem.save();
                console.log("New Item: " + JSON.stringify(item));
                res.status(200).json({message: item.name + " Added"});
            } catch (error) {
                next(error);
            }
            
        } else {
            return res.status(401).json({message: 'You don\'t have access to make this request' })
        }
}

export let getItems = async (req: Request, res: Response, next: NextFunction) => {
    // let currentUser: UserModel = req.user;
        try {
            const item = await Item.find();
            res.status(200).json(item);
        } catch (error) {
            next(error);
            
        }

}