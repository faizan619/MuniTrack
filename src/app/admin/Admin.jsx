"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import register from "../element/auth/register";
import loginFun from "../element/auth/login";

export default function Admin() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [pass, setPass] = useState("");
  const [special, setSpecial] = useState(false);
  const [login,setLogin] = useState(false)

  const handleRegisterAdmin = (e) => {
    e.preventDefault();
    let password = pass.toLowerCase();
    if (password) {
      if (password === process.env.NEXT_PUBLIC_REGISTER) {
        toast.success("Register Yourself for Admin");
        setSpecial(true);
        setLogin(false)
      }
      else if(password === process.env.NEXT_PUBLIC_LOGIN){
        toast.success("Login Yourself as Admin");
        setLogin(true)
        setSpecial(false)
      }
       else {
        toast.success("Enter Correct Password or try Google Login!");
        setSpecial(false);
        setLogin(false)
      }
    } else {
      toast.error("Please Enter the Password!");
      setSpecial(false);
      setLogin(false)
    }
  };

  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user != null) {
      toast.remove();
      toast.error("You are registered");
      router.push("/");
    }
  }, [user, router]);

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    const { result, error } = await register(email, password, displayName);

    if (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already Registerend!!");
      } else {
        toast.error(error.message);
      }
    } else {
      console.log(result);
      return router.push("/");
    }
  };

  const handleLoginForm = async (e)=>{
    e.preventDefault();
    const { result, error } = await loginFun(email, password);

    if (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Check your credentials");
      } else {
        toast.error("Some Problem in the Network");
      }
    } else {
      console.log(result);
      return router.push("/")
    }
  }

  const backControl = (e)=>{
    setLogin(false)
    setSpecial(false)
  }

  return (
    <div className="h-[90vh] flex justify-center items-center bg-black text-white">
      {special ? (
        <form className="border flex flex-col gap-5 px-5 py-10 rounded-md" onSubmit={handleRegisterForm}>
          <input
            type="text"
            required
            autoFocus
            name="name"
            id="name"
            placeholder="david gray"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
            className="py-1 px-2 text-black w-full rounded-sm"
          />
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="david@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-1 px-2 text-black w-full rounded-sm"
          />
          <input
            type="password"
            required
            name="pass"
            id="pass"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 px-2 text-black w-full rounded-sm"
          />
          <button type="submit" className="border w-full py-1 rounded-sm">
            Register
          </button>
          <button className="border border-dotted py-1" onClick={backControl}>Back</button>
        </form>
      ): login?(<form className="border flex flex-col gap-5 px-5 py-10 rounded-md" onSubmit={handleLoginForm}>
      <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="david@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-1 px-2 text-black w-full rounded-sm"
          />
          <input
            type="password"
            required
            name="pass"
            id="pass"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 px-2 text-black w-full rounded-sm"
          />
          <button type="submit" className="border w-full py-1 rounded-sm">
            Login
          </button>
          <button className="border border-dotted py-1" onClick={backControl}>Back</button>
      </form>) : (
      
        <form
          className="border p-10 rounded-md flex flex-col gap-5"
          onSubmit={handleRegisterAdmin}
        >
          <input
            type="text"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="px-2 py-3 rounded-md text-black"
            maxLength={18}
          />
          <input
            type="submit"
            className="border py-3 rounded-md cursor-pointer"
          />
          <p className="border text-center py-3 rounded-md cursor-pointer" onClick={()=>{router.push("/google")}}>Back</p>
        </form>
        
      )}
    </div>
  );
}
