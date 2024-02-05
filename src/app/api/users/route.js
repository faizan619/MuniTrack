import { getResponseMessage } from "@/database/message/responseMsg";
import { connectDB } from "@/database/conn/db";
import { UserModel } from "@/database/models/userModel";

connectDB();
export async function GET() {
  let users = [];
  try {
    users = await UserModel.find();
    return getResponseMessage(users, true, 200);
  } catch (e) {return getResponseMessage("Cannot Create User", false, 500);}
} 

export async function POST(request) {
    const {name,email,password,cpassword,dob} = await request.json();
    const user = new UserModel({
        name,
        email,
        password,
        cpassword,
        dob,
        verified,
    });
    try {
        const createUser = await user.save();
        return getResponseMessage(createUser,true,201)
    } catch (error) {
        return getResponseMessage("Cannot Create User profile!!",false,500)
    }
}
