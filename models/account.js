import mongoose, { Schema,model } from "mongoose";
import User from "./user.js";

const accountSchema = new Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    accountNo:{
        type:Number
    },
    transBalance:{
        type:Number,
        default:0
    },
    Amount:{
        type:Number
    },
    process:{
        type:String
    }

})

const Account=model('account', accountSchema)
export default Account