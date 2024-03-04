"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import register from "../element/auth/register";

export default function Admin() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [pass, setPass] = useState("");
  const [special, setSpecial] = useState(false);

  const handleAdmin = (e) => {
    e.preventDefault();
    let password = pass.toLowerCase();
    if (password) {
      if (password === process.env.NEXT_PUBLIC_PASSWORD) {
        toast.success("Welcome Admin");
        setSpecial(true);
      } else {
        toast.success("Enter Correct Password or try Google Login!");
        setSpecial(false);
      }
    } else {
      toast.error("Please Enter the Password!");
      setSpecial(false);
    }
  };

  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user != null) {
      toast.remove();
      toast.error("You are already login!");
      router.push("/");
    }
  }, [user, router]);

  const handleForm = async (e) => {
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
      return router.push("/login");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center bg-black text-white">
      {special ? (
        <form className="border flex flex-col gap-5 " onSubmit={handleForm}>
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
        </form>
      ) : (
        <form
          className="border p-10 rounded-md flex flex-col gap-5"
          onSubmit={handleAdmin}
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
        </form>
      )}
    </div>
  );
}
