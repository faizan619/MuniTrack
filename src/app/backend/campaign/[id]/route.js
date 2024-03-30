import { Campaign } from "@/mongodb/schema/campaignSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";

connectDB();
export async function DELETE(request,{params}){
    try{
        const {id} = params;
        await Campaign.deleteOne({
            _id:id
        })
        return NextResponse.json({
            message:"Campaign Deleted !",
            success:true
        },{status:200})
    }
    catch(error){
        console.log("Cannot Delete Campaign ! :",error);
        return NextResponse.json({
            message:"Cannot Delete the Campaign",
            success:false
        },{status:500})
    }
}