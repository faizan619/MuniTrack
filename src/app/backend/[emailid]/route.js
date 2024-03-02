import { Issue } from "@/mongodb/schema/issueSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { emailid } = params;
  console.log("Email Id : ", emailid);
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
