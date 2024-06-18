import { Schema,model } from "mongoose";

const userSchema = new Schema({


    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Phone:{
        type:Number
    },
    Address:{
        type:String
    },
    Dob:{
        type:Date
    },
    userType:{
        type:String,
    },
    Password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    Status:{
        type:String,
        default:'Pending'
    },
    accNo:{
        type:Number,
        default:''
    },
    Balance:{
        type:Number,
        default:0
    }

})


const User=model('user', userSchema)
export default User