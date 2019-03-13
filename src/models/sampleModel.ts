import mongoose, { Model } from "mongoose";


export type SampleModel = mongoose.Document & {
    // _id: mongoose.Types.ObjectId,
    // name: string,
    // password: string,
    // accessLevel: number,
    // comparePassword: comparePasswordFunction
};

const Schema = mongoose.Schema;

const SampleSchema = new Schema({

    

});

const Sample: Model<SampleModel> = mongoose.model<SampleModel>("User", SampleSchema);
