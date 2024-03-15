import { Campaign } from "@/mongodb/schema/campaignSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";

connectDB()
export async function GET(){
    let camp = [];
    try {
        camp = await Campaign.find();
        return NextResponse.json(camp);
    } catch (error) {
        console.log("campaign/route in Get error : ",error);
        return NextResponse.json({
            message:"Can't find any Drive",
            success:false
        },{
            status:404
        })
    }
}

export async function POST(request){
    let {drive_host_name,drive_title,drive_describe,drive_location,drive_time,drive_on,drive_link}  = await request.json();
    try {
        const drive = new Campaign({
            drive_host_name,
            drive_title,
            drive_describe,
            drive_location,
            drive_time,
            drive_on,
            drive_link
        })
        const createDrive = await drive.save();
        return NextResponse.json({createDrive,success:true},{status:200})
    } catch (error) {
        console.log("drive/route in POST error : ",error);
        return NextResponse.json({
            message:"Can't Post the Drive"+error.message,
            success:false
        },{status:500})
    }
}