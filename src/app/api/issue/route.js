import { connectDB } from "@/database/conn/db";
import { getResponseMessage } from "@/database/message/responseMsg";
import { IssueModel } from "@/database/models/issueModel";

connectDB();
export async function GET() {
  let issues = [];

  try {
    issues = await IssueModel.find();
    // console.log("All issues length : ",issues.length)
    // console.log("All issues ",issues)
    return getResponseMessage(issues, true, 200);
  } catch (error) {
    console.log("Error in fetching the data !! : ", error);
    return getResponseMessage("Cannot Fetch the Data!!", false, 500);
  }
}

export async function POST(request) {
  const { name, pictureUrl, location, reason, content, status } =
    await request.json();
  try {
    const issue = new IssueModel({
      name,
      pictureUrl,
      location,
      reason,
      content,
      status,
    });
    const createIssue = await issue.save();
    return getResponseMessage(createIssue,true,201) 
  } catch (error) {
    console.log("error while posting issue : ",error)
    return getResponseMessage("Cannot Post Issue",false,500)
  }
}

export function DELETE() {}
