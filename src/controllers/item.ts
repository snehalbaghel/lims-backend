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
            // newItem.cat_no = req.body.cat_no;
            // newItem.bottle_no = req.body.bottle_no;
            // newItem.brand = req.body.brand;
            // newItem.h_statements = req.body.h_statements;
            // // newItem.hazard_pictograms = req.body.hazard_pictograms;
            // newItem.type = req.body.type;
            // newItem.nature = req.body.nature;
            // newItem.mol_weight = req.body.mol_weight;
            // newItem.mol_formula = req.body.mol_formula;
            // newItem.purity = req.body.purity;
            // newItem.storage_temperature.min = req.body.storage_temperature.min;
            // newItem.storage_temperature.max = req.body.storage_temperature.max;
            // newItem.storage_place = req.body.storage_place;
            // newItem.risk_phrases = req.body.risk_phrases;
            // newItem.safety_phrases = req.body.safety_phrases;
            // newItem.
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