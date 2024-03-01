import { User } from "@/mongodb/schema/userSchema";
import { NextResponse } from "next/server";

export async function GET(){
    let user = [];
    try {
        user = await User.find();
        return NextResponse.json(user);
    } catch (error) {
        console.log("user/route in GET error : ",error);
        return NextResponse.json({
            message:"Can't find the User",
            success:false
        },{
            status:404
        })
    }
}

export async function POST(request){
    let {user_name,user_email} = await request.json();
    try {
        if(!user_name && !user_email){
            return NextResponse.json({
                message:"Something Went Wrong. Please Try Again Later!",
                success:false
            },{status:500})
        }
        else{
            const user = new User({
                user_name,
                user_email
            });
            const createUser = await user.save();
            return NextResponse.json({createUser})
        }
    } catch (error) {
        console.log("user/route in POST error : ",error);
        return NextResponse.json({
            message:"Can't Create the User!",
            success:false,
        },{status:500})
    }
}