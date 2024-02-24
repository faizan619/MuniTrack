"use client";
import { useEffect, useState } from "react";
import register from "../element/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName,setdisplayName] = useState('');
  // const [imageURL,setimageURL] = useState('');
  const { user } = useAuthContext(); // Moved to top level

  const router = useRouter();


  useEffect(() => {
    if (user != null) {
      toast.remove()
      toast.error("You are already login!");
      router.push("/")
    }
  }, [user, router]);


  const handleForm = async (e) => {
    e.preventDefault();
      
      const { result, error } = await register(email, password,displayName);
      
      if (error) {
        if(error.code === 'auth/email-already-in-use'){
          toast.error("Email already Registerend!!");
        }
        else{
          toast.error(error.message)
        }
      }
      else{
        console.log(result);
        return router.push("/login");
      }
    
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[91.5vh] px-1 bg-green-400  ">
      <h1 className="text-center text-xl sm:text-2xl uppercase mb-5">Register</h1>
      <form onSubmit={handleForm} className="rounded-md flex flex-col items-center justify-center py-5 px-2 gap-3 bg-gray-700 text-white sm:px-5 sm:py-7 sm:gap-5 ">
        <div className="w-full">
          <label className="" htmlFor="name">Name:</label>
          <input type="text" required autoFocus name="name" id="name" placeholder="david gray" value={displayName} onChange={(e)=>setdisplayName(e.target.value)} className="py-1 px-2 text-black w-full rounded-sm" />
        </div>
        <div className="w-full">
        <label className="" htmlFor="email">Email:</label>
        <input type="email" required name="email" id="email" placeholder="david@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="py-1 px-2 text-black w-full rounded-sm" />
        </div>
        <div className="w-full">
          <label className="" htmlFor="pass" >Password</label>
          <input type="password" required name="pass" id="pass" placeholder="*****" value={password} onChange={(e)=>setPassword(e.target.value)} className="py-1 px-2 text-black w-full rounded-sm" />
        </div>
        <button type="submit" className="border w-full py-1 rounded-sm">Register</button>
      </form>
      <h1 className="text-left mt-3">Already have a Account? <span onClick={()=>router.push("/login")} className="text-red-700 cursor-pointer hover:underline">Login</span></h1>
    </div>
  );
}
