"use client";
import { useState } from "react";
import login from "../components/auth/login";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();

    const { result, error } = await login(email, password);
    if (error) {
      return console.log("Error aaya in login :", error);
    }
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="flex h-[91.5vh] bg-green-600 justify-center items-center ">
      <div className="text-center text-white text-xl">
        <h1 className="mb-7 uppercase text-2xl">Login</h1>
        <form
          onSubmit={handleForm}
          className="text-left flex flex-col gap-7 p-7 bg-gray-700 rounded-md"
        >
          <label htmlFor="email">
            <p>Email</p>
            <input
              className="p-2 rounded-md text-black"
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
              className="p-2 rounded-md text-black"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
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
