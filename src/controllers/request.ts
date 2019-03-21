import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import AccessLevel from "../config/accessLevel";
import { default as ItemRequest, ItemRequestModel} from "../models/item-request";

export let postRequest = async (req: Request, res: Response, next: NextFunction) => {
    let currentUser: UserModel = req.user;
    if(req.isAuthenticated() && 
    (currentUser.accessLevel == AccessLevel.LabIncharge || 
        currentUser.accessLevel == AccessLevel.Professor)) {
            try {
                const newItemRequest: ItemRequestModel = new ItemRequest(req.body);
                await newItemRequest.save();
                return res.status(200).json({message: "Request sent"});
            } catch (error) {
                console.error(error);
                return res.status(400).json({message: 'Unable to send request'});
            }
        } else {
            return res.status(401).json({message: "You don't have access to make this request"});
        }

}

export let approveRequest = async (req: Request, res: Response, next: NextFunction) => {
    let currentUser: UserModel = req.user;
    if(req.isAuthenticated() && 
        (currentUser.accessLevel == AccessLevel.HOD)) {
            try {
                await ItemRequest.findByIdAndUpdate(req.body._id, req.body.approve);
                res.status(200).json({message: "Request Approved"})
            } catch (error) {
                res.status(500).json({message: "Unable to fetch request"});
            }
        } else {
            res.status(401).json({message: "You don't have access to make this request"});
        }
}