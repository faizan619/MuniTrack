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
    let { issue_image_url,issue_title,issue_describe,issue_state,issue_location,issue_manual_location,issue_user_name,issue_user_email,issue_uploaded_on,issue_public_view,issue_resolved_by,issue_resolved_on,issue_resolve_image_url} = await request.json();
    try {
        if(!issue_title || !issue_describe || !issue_location){
            return NextResponse.json({
                message:"Please Fill all the Credentials!",
                success:false,
            },{status:400})
        }
        else{
            const issue = new Issue({
                issue_image_url,
                issue_title,
                issue_describe,
                issue_state,
                issue_location,
                issue_manual_location,
                issue_user_name,    
                issue_user_email,
                issue_uploaded_on,
                issue_public_view,
                issue_resolved_by,
                issue_resolved_on,
                issue_resolve_image_url

            });
            const createIssue = await issue.save();
            return NextResponse.json({createIssue,success:true})
        }
    } catch (error) {
        console.log("issue/route in POST error : ",error);
        return NextResponse.json({
            message:"Can't Post the Issue :"+error.message,
            success:false,
        },{status:500})
    }
}