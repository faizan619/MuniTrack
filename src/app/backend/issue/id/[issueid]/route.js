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