import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import AccessLevel from "../config/accessLevel";
import Item from "../models/item";

export let postStock = async (req: Request, res: Response, next: NextFunction) => {
    let currentUser: UserModel = req.user;
    if(req.isAuthenticated() && 
        (currentUser.accessLevel == AccessLevel.LabIncharge || 
        currentUser.accessLevel == AccessLevel.Professor)) {
            
            try {
                let item = await Item.findByIdAndUpdate(req.body._id, req.body.quantity);
                return res.status(200).json({message: 'Stock values for ' + item.bottle_no + ' updated.' })

            } catch (error) {
                console.error(error);
                return res.status(400).json({message: 'Unable to find Item'})
            }
            
            
            // const item = Item.findById()
        } else {
            return res.status(401).json({message: 'You don\'t have access to make this request'});
        }

}