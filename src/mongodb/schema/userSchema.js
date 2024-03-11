import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    displayName:{
        type:String,
        required:[true,"Name is Required!"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is Required!"]
    },
})

export const User = mongoose.models.user || mongoose.model("user",userSchema)