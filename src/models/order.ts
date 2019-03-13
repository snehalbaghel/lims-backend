import mongoose, { Model } from "mongoose";

export type OrderModel = mongoose.Document & {
    _id: mongoose.Types.ObjectId,
    date: Date,
    vendor: string,
    vendor_address: string,
    delivery_address: string,
    delivery_date: Date,
    requests: [mongoose.Types.ObjectId],
};

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {type: Schema.Types.Date},
    vendor: {type: Schema.Types.String},
    vendor_address: {type: Schema.Types.String},
    delivery_address: {type: Schema.Types.String, 
            default: "Life Sciences Laboratories, Block II, Third Floor, Christ (DEEMED TO BE UNIVERSITY), Hosur Road, Near Dairy Circle, Bengaluru - 560029"},
    delivery_date: {type: Schema.Types.Date},
    requests: [ {type: Schema.Types.ObjectId, ref: 'Request'} ]
});

const Order: Model<OrderModel> = mongoose.model<OrderModel>("Order", orderSchema);

export default Order;