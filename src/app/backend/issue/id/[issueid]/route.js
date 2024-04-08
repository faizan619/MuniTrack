import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";
import { Issue } from "@/mongodb/schema/issueSchema";

connectDB()
export async function GET(request, { params }) {
    const { issueid } = params;
    try {
      const task = await Issue.findById(issueid);
      return NextResponse.json(task);
    } catch (error) {
      console.log("Cannot fetch the Plant Details!! :", error);
        return NextResponse.json({
            message:"Cannot find any Details",
            success:false
        },{status:404})
    }
  }

  export async function PUT(request, { params }) {
    try {
      const { issueid } = params;  
      let {title,describe,location} = await request.json();
      let post = await Issue.findById(issueid);
      post.issue_title=title;
      post.issue_describe=describe;
      post.issue_manual_location = location;
  
      const updatePost = await post.save();
      return NextResponse.json(updatePost);
    } catch (error) {
      console.log("Error in Updating the Post!! : ", error);
      return NextResponse.json({
        message:"Cannot Update the View",
        success:false
      },{status:500})
    }
  }
  

  export async function DELETE(request, { params }) {
    try {
      const { issueid } = params;
      await Issue.deleteOne({
        _id: issueid,
      });
      return NextResponse.json({
        message:"Issue Deleted Successfully !!",
        success:true
      },{status:200})
    } catch (error) {
      console.log("Cannot Delete Issue !! : ", error);
      return NextResponse.json({
        message:"Cannot Delete the Issue",
        status:false
      },{status:500})
    }
  }