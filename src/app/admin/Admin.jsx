"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import register from "../element/auth/register";
import loginFun from "../element/auth/login";
import { arima, serif } from "../element/fonts";

export default function Admin() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [pass, setPass] = useState("");
  const [special, setSpecial] = useState(false);
  const [login, setLogin] = useState(false);

  const handleRegisterAdmin = (e) => {
    e.preventDefault();
    let password = pass.toLowerCase();
    if (password) {
      if (password === process.env.NEXT_PUBLIC_REGISTER) {
        toast.remove();
        toast.success("Register Admin Details");
        setSpecial(true);
        setLogin(false);
      } else if (password === process.env.NEXT_PUBLIC_LOGIN) {
        toast.remove();
        toast.success("Login as Admin");
        setLogin(true);
        setSpecial(false);
      } else {
        toast.remove();
        toast.success("Only Admin is Aware about Password! Please Try Google Login");
        setSpecial(false);
        setLogin(false);
      }
    } else {
      toast.remove();
      toast.error("Please Enter the Password!");
      setSpecial(false);
      setLogin(false);
    }
  };

  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user != null) {
      toast.remove();
      toast.success("You are registered");
      router.push("/");
    }
  }, [user, router]);

  const [loading, setLoading] = useState(false);
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (password.length > 5) {
      setLoading(true);
      let admin_info = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName, email }),
        }
      );
      if (!admin_info.ok) {
        toast.error(
          "There is Some problem while parsing your login. Try Again Later"
        );
      }
      admin_info = await admin_info.json();
      if (admin_info.success) {
        const { result, error } = await register(email, password, displayName);
        if (error) {
          if (error.code === "auth/email-already-in-use") {
            toast.remove();
            toast.error("Email already Registerend!!");
          } else {
            toast.remove();
            toast.error(error.message);
          }
          setLoading(false);
        } else {
          // console.log(result);
          return router.push("/");
        }
      } else {
        toast.remove();
        toast.error("Email Already Registered !!");
        setLoading(false);
      }
    } else {
      toast.error("Min 6 letter is Required for Password");
    }
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const { result, error } = await loginFun(email, password);

    if (error) {
      if (error.code === "auth/invalid-credential") {
        toast.remove();
        toast.error("Check your credentials");
      } else {
        toast.remove();
        toast.error("Some Problem in the Network");
      }
    } else {
      return router.push("/");
    }
  };

  const backControl = (e) => {
    setLogin(false);
    setSpecial(false);
  };

  return (
    <div className="h-[90vh] flex wallpaper1 justify-center items-center bg-black text-white">
      {special ? (
        <form
          className="border w-[90%] sm:w-[70%] md:w-[50%] bg-white text-black flex flex-col gap-5 px-5 py-10 rounded-md"
          onSubmit={handleRegisterForm}
        >
          <p className={`${serif.className} text-center text-xl uppercase`}>
            Register
          </p>
          <label>
            <p className={`${arima.className}`}>User Name : </p>
            <input
              type="text"
              required
              autoFocus
              name="name"
              id="name"
              placeholder="david gray"
              maxLength={20}
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
              className={`px-2 py-3 border w-full border-gray-400 rounded-md text-black ${arima.className}`}
            />
            {displayName.length === 20 ? (
              <p className="text-[13px] text-green-600">
                maximum 20 words required
              </p>
            ) : null}
          </label>
          <label>
            <p className={`${arima.className}`}>Enter Address :</p>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="david@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-2 py-3 border w-full border-gray-400 rounded-md text-black ${arima.className}`}
            />
          </label>
          <label>
            <p className={`${arima.className}`}>Password : (min: 6 letter)</p>
            <input
              type="password"
              required
              name="pass"
              id="pass"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-2 py-3 border w-full border-gray-400 rounded-md text-black ${arima.className}`}
            />
            {password !== "" ? (
              password.length > 5 ? (
                <p className={`${arima.className} text-green-600 text-[13px]`}>
                  You are good to Go
                </p>
              ) : (
                <p className="text-[13px] text-red-600 capitalize">
                  Min Length 6 letter : ({password.length} Letter)
                </p>
              )
            ) : null}
          </label>
          <div className={`${serif.className} mt-3 flex gap-5 text-white`}>
            <button
              type="submit"
              disabled={loading}
              className="border bg-green-600 hover:bg-green-700 rounded-md flex-1 w-full py-2 "
            >
              Register
            </button>
            <button
              className="border flex-1 bg-red-600 hover:bg-red-700 rounded-md py-2"
              onClick={backControl}
            >
              Back
            </button>
          </div>
        </form>
      ) : login ? (
        <form
          className="border w-[90%] sm:w-[70%] md:w-[50%] bg-white text-black flex flex-col gap-5 px-5 py-10 rounded-md"
          onSubmit={handleLoginForm}
        >
          <p className={`text-center ${serif.className} uppercase text-xl`}>
            Login
          </p>
          <p
            className={`text-red-600 ${arima.className} capitalize text-sm text-center`}
          >
            Enter the Email and Password which is provided to you
          </p>
          <label>
            <p className={`${serif.className}`}>Email Address : </p>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="david@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-2 py-3 border w-full border-gray-400 rounded-md text-black ${arima.className}`}
            />
          </label>
          <label>
            <p className={`${serif.className}`}>Password</p>
            <input
              type="password"
              required
              name="pass"
              id="pass"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-2 py-3 border border-gray-400 w-full rounded-md text-black ${arima.className}`}
            />
          </label>
          <div className={`${serif.className} mt-3 flex gap-5 text-white`}>
            <button
              type="submit"
              className="border bg-green-600 hover:bg-green-700 rounded-md flex-1 w-full py-2 "
            >
              Login
            </button>
            <button
              className="border flex-1 bg-red-600 hover:bg-red-700 rounded-md py-2"
              onClick={backControl}
            >
              Back
            </button>
          </div>
        </form>
      ) : (
        <form
          className="border p-7 rounded-md flex flex-col bg-white gap-5"
          onSubmit={handleRegisterAdmin}
        >
          <p className={`text-center ${serif.className} text-black`}>
            Unique Password
          </p>
          <input
            type="text"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`px-2 py-3 border border-gray-400 shadow-md rounded-md text-black ${arima.className}`}
            maxLength={18}
          />
          <div className={`flex gap-3 ${serif.className}`}>
            <input
              type="submit"
              className="border flex-1 py-3 bg-green-700 hover:bg-green-800 rounded-md cursor-pointer"
            />
            <p
              className="border flex-1 text-center py-3 bg-red-700 hover:bg-red-800 rounded-md cursor-pointer"
              onClick={() => {
                router.push("/google");
              }}
            >
              Back
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
