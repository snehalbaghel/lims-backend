import mongoose, { Model } from "mongoose";

export type ItemRequestModel = mongoose.Document & {
    _id: mongoose.Types.ObjectId,
    indenter_id: mongoose.Types.ObjectId,
    item_id: mongoose.Types.ObjectId,
    quantity: {
        value: Number,
        unit: string,
    },
    intended_use: string,
    subject_code: string,
    date: Date,
    approved: boolean,
    approved_quantity: {
        value: Number,
        unit: string,
    },
    approved_by: mongoose.Types.ObjectId
}

const Schema = mongoose.Schema;

export const itemRequestSchema = new Schema({

    //_id: {type: Schema.Types.ObjectId},
    intender_id: {type: Schema.Types.ObjectId, ref: 'User'},
    item_id: {type: Schema.Types.ObjectId, ref: 'Item'},
    quantity: {
        value: {type: Schema.Types.Number},
        unit: {type: Schema.Types.String}
    },
    intended_use: {type: Schema.Types.String},
    // replace with enum
    subject_code: {type: Schema.Types.String},
    date: {type: Schema.Types.Date, default: Date.now()},
    approved: {type: Schema.Types.Boolean, default: false},
    approved_quantity: {
        value: {type: Schema.Types.Number},
        unit: {type: Schema.Types.String}
    },
    approved_by: { type: Schema.Types.ObjectId , ref: 'User'}
});

const ItemRequest: Model<ItemRequestModel> = mongoose.model<ItemRequestModel>("Request", itemRequestSchema);

export default ItemRequest;