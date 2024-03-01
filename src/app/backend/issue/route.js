import { Issue } from "@/mongodb/schema/issueSchema";
import { connectDB } from "@/mongodb/database/conn";
import { NextResponse } from "next/server";


connectDB();
export async function GET(){
    let issue = [];
    try {
        issue = await Issue.find(); 
        return NextResponse.json(issue)
    } catch (error) {
        console.log("issue/route in GET error : ",error);
        return NextResponse.json({
            message:"Can't Find any Issue",
            success:false
        },{
            status:404
        })
    }
}

export async function POST(request){
    let { issue_image_url,issue_title,issue_describe,issue_state,issue_location,issue_user_name,issue_user_email,issue_userId} = await request.json();
    try {
        if(!issue_title && !issue_describe && !issue_location && !issue_state ){
            return NextResponse.json({
                message:"Please Fill all the Credentials!",
                success:false,
            },{status:500})
        }
        else{
            const issue = new Issue({
                issue_image_url,
                issue_title,
                issue_describe,
                issue_state,
                issue_location,
                issue_user_name,
                issue_user_email,
                issue_userId
            });
            const createIssue = await issue.save();
            return NextResponse.json({createIssue})
        }
    } catch (error) {
        console.log("issue/route in POST error : ",error);
        return NextResponse.json({
            message:"Can't Post the Issue :",
            success:false,
        },{status:500})
    }
}