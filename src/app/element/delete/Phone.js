"use client";
import { useAuthContext } from "@/context/AuthContext";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setotp] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirmation,setConfirmation] = useState(null);

  const auth = getAuth();

  const {setUser} = useAuthContext();

  const SentOtp = async () => {
    if (phone) {
      try {
      const formattedPhone = phone.replace(/[^0-9]/g, "").replace(/^91/, "+91");
      toast.success("phone number:", formattedPhone);
      console.log("phone number : ",formattedPhone)
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          recaptcha
        );
        console.log("Confirmation is : ", confirmationResult);
        setConfirm(true);
        setConfirmation(confirmationResult);
      } catch (error) {
        console.error("error in phone : ", error);
        toast.error("Error sending OTP");
      }
    } else {
      toast.error("Please Enter Phone Number");
    }
  };

  const verifyOtp = async () => {
    if (otp && confirmation) {
      try {
        await confirmation.confirm(otp).then((result)=>{
          const user = result.user;
          console.log(user)
        })
        // console.log("OTP verification successful:", data);
        // toast.success("OTP verification successful");
          // setUser(data.user);

      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Error verifying OTP");
      }
    } else {
      toast.error("Please enter the OTP");
    }
  };

  return (
    <div className="h-[91.5vh] flex justify-center bg-black">
      <div className="flex gap-3 flex-col justify-center items-center  ">
        <div className="flex gap-3">
          <PhoneInput country={"in"} value={phone} onChange={setPhone} />
          <button
            className="bg-blue-600 px-3 py-1 rounded-md text-white w-full"
            onClick={SentOtp}
          >
            Sent OTP
          </button>
        </div>
        <div className="mt-10" id="recaptcha"></div>
        {confirm ? (
          <div className="flex gap-3 w-full">
            <input
              type="number"
              placeholder="Verify OPT"
              className="w-full rounded-sm px-3"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <button
              className="bg-blue-600 px-6 py-1 rounded-md text-white"
              onClick={verifyOtp}
            >
              Verify
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
