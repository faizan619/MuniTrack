import { User } from "@/mongodb/schema/userSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/database/conn";

connectDB()
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
    let {displayName,email} = await request.json();
    try {
        if(!displayName && !email){
            return NextResponse.json({
                message:"Enter All the Credentials!",
                success:false
            },{status:500})
        }
        else{
            
            const emailExist = await User.findOne({
                email
            })
            if(emailExist){
                return NextResponse.json({
                    message:"User Email already created!",
                    success:false
                },{status:400})
            }
            else{
                const user = new User({
                    displayName,
                    email
                });
                const createUser = await user.save();
                return NextResponse.json({createUser,success:true})
            }
        }
    } catch (error) {
        console.log("user/route in POST error : ",error);
        return NextResponse.json({
            message:"Can't Create the User!",
            success:false,
        },{status:500})
    }
}