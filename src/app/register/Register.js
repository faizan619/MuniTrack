"use client";
import { useState } from "react";
import register from "../components/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();

    const { result, error } = await register(email, password);

    if (error) {
      // return console.log(error);
      if(error.code === 'auth/email-already-in-use'){
        toast.error("Email already Registered!!");
      }
      else{
        toast.error(error)
        // console.log(error)
      }
    }
    else{
      console.log(result);
      return router.push("/login");
    }
  };

  return (
    <div className="flex h-[91.5vh] bg-green-600 justify-center items-center ">
      <div className="text-center text-white text-xl">
        <h1 className="mb-7 uppercase text-2xl">Register</h1>
        <form onSubmit={handleForm} className="text-left flex flex-col gap-7 p-7 bg-gray-700 rounded-md">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              type="email"
              name="email"
              className="p-2 rounded-md text-black"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="p-2 text-black rounded-md"
              name="password"
              id="password"
              placeholder="**********"
            />
          </label>
          <button
            type="submit"
            className="text-white bg-gray-900 hover:bg-gray-800 py-3 rounded-md"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
