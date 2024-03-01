import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    user_name:{
        type:String,
        required:[true,"Name is Required!"]
    },
    user_email:{
        type:String,
        unique:true,
        required:[true,"Email is Required!"]
    },

})

export const User = mongoose.models.user || mongoose.model("user",userSchema)