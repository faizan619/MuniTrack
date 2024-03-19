
import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";
import { Issue } from "@/mongodb/schema/issueSchema";

connectDB();
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    let { state, resolved_on, resolved_by, resolve_image } = await request.json();
    let post = await Issue.findById(id);
    post.issue_state = state;
    post.issue_resolved_on = resolved_on;
    post.issue_resolved_by = resolved_by;
    post.issue_resolve_image_url = resolve_image;

    const updatePost = await post.save();
    return NextResponse.json(updatePost);
  } catch (error) {
    console.log("Error in Updating the Post!! : ", error);
    return NextResponse.json(
      {
        message: "Cannot Resolve the Issue",
        success: false,
      },
      { status: 500 }
    );
  }
}
