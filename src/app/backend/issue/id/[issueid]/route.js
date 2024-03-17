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

  // export async function PUT(request, { params }) {
  //   try {
  //     const { issueid } = params;  
  //     let post = await Issue.findById(issueid);
  //     post.issue_public_view = true;
  
  //     const updatePost = await post.save();
  //     return NextResponse.json(updatePost);
  //   } catch (error) {
  //     console.log("Error in Updating the Post!! : ", error);
  //     return NextResponse.json({
  //       message:"Cannot Update the View",
  //       success:false
  //     },{status:500})
  //   }
  // }
  

  export async function DELETE(request, { params }) {
    try {
      const { plantid } = params;
      await Post.deleteOne({
        _id: plantid,
      });
      return NextResponse.json({
        message:"Issue Deleted Successfully !!",
        success:true
      },{status:200})
    } catch (error) {
      console.log("Cannot Delete plant Data !! : ", error);
      return NextResponse.json({
        message:"Cannot Delete the Post",
        status:false
      },{status:500})
    }
  }