import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Attribute is Required!!"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email :)"],
    validate: {
      validator: function (v) {
        return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required !!"],
    minLength: [6, "minimum 6 character is required !!"],
  },
  cpassword:{
    type:String,
    required:[true,"confirm password is also required!!"]
  },
  dob:{
    type:String,
    required:[true,"Enter your Date of Birth!!"]
  }
});

export const UserModel = mongoose.models.users || mongoose.model("users",userSchema)