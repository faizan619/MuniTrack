import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";
import { Issue } from "@/mongodb/schema/issueSchema";

connectDB();
export async function GET(request,{params}){
    const {issuename} = params;
    try {
        const issue = await Issue.find({ issue_title: { $regex: issuename, $options: 'i' } });
        return NextResponse.json(issue);
    } catch (error) {
        console.log("Cannot find any task of the user!");
        return NextResponse.json({
            message:"Failed to get tasks",
            success:false
        },{status:404})
    }
}