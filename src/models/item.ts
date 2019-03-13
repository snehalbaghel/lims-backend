import mongoose, { Model } from "mongoose";

export type ItemModel = mongoose.Document & {

    _id: mongoose.Types.ObjectId,
    bottle_no: string,
    cat_no: string,
    brand: string,
    name: string,
    nature: string,
    type: string,
    mol_weight: Number,
    mol_formula: string,
    purity: Number,
    storage_temperature: {
        min: Number,
        max: Number, 
    },
    storage_place: string,
    risk_phrases: Number,
    safety_phrases: [Number],
    p_statements: [string],
    h_statements: [string],
    hazard_pictograms: [Number],
    msds_url: string,
    other_instructions:  string,
    quantity: {
        bsc1: {
            value: Number,
            unit: string},
        bsc2: {
            value: Number,
            unit: string},
        bsc3: {
            value: Number,
            unit: string},
        bsc4: {
            value: Number,
            unit: string},
        bsc5: {
            value: Number,
            unit: string},
        msc1: {
            value: Number,
            unit: string },
        msc2: {
            value: Number,
            unit: string },
        msc3: {
            value: Number,
            unit: string },
        cmpr: {
            value: Number,
            unit: string }                   
    }
    
};

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    //_id: {type: Schema.Types.ObjectId},
    bottle_no: {type: Schema.Types.String},
    cat_no: {type: Schema.Types.String},
    brand: {type: Schema.Types.String},
    name: {type: Schema.Types.String},
    nature: {
        type: Schema.Types.String, 
        enum: ['Solid', 'Liquid']},
    // Confirm this 
    type: {
        type: Schema.Types.String, 
        enum: ['Bio-Chemical', 'Fine-Chemical', 'Solvent', 'Acid', 'Base']},
    mol_weight: {type: Schema.Types.Number},
    mol_formula: {type: Schema.Types.String},
    purity: {type: Schema.Types.Number},
    storage_temperature: {
        min: { type: Schema.Types.Number},
        max: { type: Schema.Types.Number} 
    },
    storage_place: {
        type: Schema.Types.String, 
        enum: ['Store Room', 'Cold Room', '-20°C Deep Freezer', '-80°C Deep Freezer']},
    risk_phrases: { 
        type: [Schema.Types.Number],
//        validate: {
//            validator: function(v: [number]) {
//                v.forEach(element => {
//                    if(!Number.isInteger(element)) {
//                        return false;
//                    }  
//                });
//
//                return false;
//            }
//
//        }
     },
    safety_phrases: {type: [Schema.Types.Number,]},
    p_statements: {type: [Schema.Types.String]},
    h_statements: {type: [Schema.Types.String]},
    // replace with enum
    hazard_pictograms: {type: [Schema.Types.Number]},
    msds_url: {type: Schema.Types.String},
    other_instructions:  {type: Schema.Types.String},
    quantity: {
        bsc1: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String}},
        bsc2: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String}},
        bsc3: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String}},
        bsc4: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String}},
        bsc5: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String}},
        msc1: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String} },
        msc2: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String} },
        msc3: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String} },
        cmpr: {
            value: {type: Schema.Types.Number},
            unit: {type: Schema.Types.String}
        }                   
    }
    
});

const Item: Model<ItemModel> = mongoose.model<ItemModel>("Item", itemSchema);

export default Item;