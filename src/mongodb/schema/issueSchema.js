import mongoose, { Schema } from "mongoose";

const IssueSchema = new Schema({
    image_url :{
        type:String,
        required:[true,"Please Upload a Photo!"]
    },
    
})