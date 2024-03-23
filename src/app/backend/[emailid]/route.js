import { Issue } from "@/mongodb/schema/issueSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";
import { Campaign } from "@/mongodb/schema/campaignSchema";

connectDB()
export async function GET(request, { params }) {
  const { emailid } = params;
  // console.log("Email Id : ", emailid);
  try {
    let issue = await Issue.find({ issue_user_email: emailid });
    return NextResponse.json(issue);
  } catch (error) {
    console.log("Cannot find any Issue of the user");
    return NextResponse.json(
      {
        message: "Cannot find any issue!",
        success: false,
      },
      { status: 404 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { emailid } = params;
    await Campaign.deleteOne({
      _id: emailid,
    });
    return NextResponse.json({
      message:"Campaign Deleted Successfully !!",
      success:true
    },{status:200})
  } catch (error) {
    console.log("Cannot Delete Campaign !! : ", error);
    return NextResponse.json({
      message:"Cannot Delete the Issue",
      status:false
    },{status:500})
  }
}