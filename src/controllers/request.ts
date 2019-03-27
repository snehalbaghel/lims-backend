import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import AccessLevel from "../config/accessLevel";
import { default as ItemRequest, ItemRequestModel} from "../models/item-request";

export let postRequest = async (req: Request, res: Response, next: NextFunction) => {
    let currentUser: UserModel = req.user;
    if(currentUser.accessLevel == AccessLevel.LabIncharge || 
        currentUser.accessLevel == AccessLevel.Professor) {
            try {
                req.body.intender_id = req.user._id ;
                const newItemRequest: ItemRequestModel = new ItemRequest(req.body);
                await newItemRequest.save();
                return res.status(201).json({message: "Request sent"});
            } catch (error) {
                console.error(error);
                return res.status(400).json({message: 'Unable to send request'});
            }
        } else {
            return res.status(401).json({message: "You don't have access to make this request"});
        }
}

export let getRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests: ItemRequestModel[] = await ItemRequest.find()
                .sort('approved')        
                .sort('-date')
                .populate('intender_id', 'name')
                .populate('item_id', 'name mol_formula');
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export let approveRequest = async (req: Request, res: Response, next: NextFunction) => {
    let currentUser: UserModel = req.user;
    if(req.isAuthenticated() && 
        (currentUser.accessLevel == AccessLevel.HOD)) {
            try {
                let approveRequests = req.body as ItemRequestModel[];
                approveRequests.forEach(async (approve) => {
                    await ItemRequest
                        .findByIdAndUpdate(approve._id, 
                            {$set: {approved: true, 
                                approved_quantity: {value: approve.quantity.value,
                                                    unit: approve.quantity.unit},
                                approved_by: req.user._id}})
                })
                await ItemRequest.findByIdAndUpdate(req.body._id, req.body.quantity);
                res.status(200).json({message: "Requests Approved"});
            } catch (error) {
                res.status(500).json({message: "Unable to fetch request"});
            }
        } else {
            res.status(401).json({message: "You don't have access to make this request"});
        }
}