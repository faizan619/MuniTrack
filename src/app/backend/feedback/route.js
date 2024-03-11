import { NextResponse } from "next/server";
import { Feedback } from "@/mongodb/schema/feedbackSchema";
import { connectDB } from "@/mongodb/database/conn";

connectDB();
export async function GET() {
  let feedback = [];
  try {
    feedback = await Feedback.find();
    return NextResponse.json(feedback);
  } catch (error) {
    console.log("feedback/route in GET error : ", error);
    return NextResponse.json(
      {
        message: "Can't Find any Issue",
        success: false,
      },
      {
        status: 404,
      }
    );
  }
}

export async function POST(req) { 
  // const payload = await req.json();
  const { name, email, selectedEmoji, message } = await req.json();
  try {
    if (!selectedEmoji || !message) {
      return NextResponse.json(
        {
          message: "Please Fill all the Credentials!",
          success: false,
        },
        { status: 400 }
      );
    } else {
      const feedback = new Feedback({
        name,
        email,
        selectedEmoji,
        message,
      });
      const createFeedback = await feedback.save();
      return NextResponse.json({ createFeedback, success: true });
    }
  } catch (error) {
    console.log("issue/route in POST error : ",error);
        return NextResponse.json({
            message:"Can't Post the Issue :"+error.message,
            success:false,
        },{status:500})
  }
}
