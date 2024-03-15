import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
    drive_host_name:{
        type:String,
        required:[true,"Host Name is Required !!"]
    },
    drive_title:{
        type:String,
        required:[true, "Title of Campaign is required !!"]
    },
    drive_describe:{
        type:String,
        required:[true,"describe about the campaign !"]
    },
    drive_location:{
        type:String,
        required:[true,"Enter the Location !"]
    },
    drive_time:{
        type:String,
    },
    drive_on:{
        type:String,
        required:[true,"Specify the Date."],
    },
    drive_link:{
        type:String,
    }
});
export const Campaign = mongoose.models.campaigns || mongoose.model("campaigns",CampaignSchema)