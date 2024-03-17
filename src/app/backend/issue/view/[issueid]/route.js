import { Issue } from "@/mongodb/schema/issueSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";

connectDB();
export async function PUT(request, { params }) {
    try {
      const { issueid } = params;  
      let post = await Issue.findById(issueid);
      post.issue_public_view = true;
  
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