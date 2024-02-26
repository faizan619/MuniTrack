"use client";
import { useEffect, useState } from "react";
import login from "../element/auth/login";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext(); 

  const router = useRouter();
  
      useEffect(() => {
        if (user != null) {
          toast.remove()
          toast.success("You are now login!");
          router.push("/")
        }
      }, [user, router]);

  const handleForm = async (e) => {
    e.preventDefault();
    const { result, error } = await login(email, password);

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
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[91.5vh] px-1 bg-green-400">
      <h1 className="text-center text-xl sm:text-2xl uppercase mb-5">Login</h1>
      <form
        onSubmit={handleForm}
        className="bg-gray-700 rounded-md flex flex-col items-center justify-center py-5 px-2 gap-5 text-white sm:px-5 sm:py-7 sm:gap-7"
      >
        <label htmlFor="email">
          <p>Email</p>
          <input
            className="py-1 px-2 text-black w-full rounded-sm"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            autoFocus
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            className="py-1 px-2 text-black w-full rounded-sm"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </label>
        <button type="submit" className="border w-full py-1 rounded-sm">
          Sign up
        </button>
      </form>
      <h1 className="text-left mt-3">
        Create a new Account!{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-red-700 cursor-pointer hover:underline"
        >
          Register
        </span>
      </h1>
    </div>
  );
}
