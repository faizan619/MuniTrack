"use client";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function Google() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const auth = getAuth();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user != null) {
      toast.remove();
      toast.success("You are Already login!");
      router.push("/");
    }
  }, [user, router]);

  const signInWithGooglePopup = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Login Successfull");
      router.push("/");
    } catch (error) {
      console.log("error in Google.jsx : ", error);
    }
    setLoading(false);
  };
  const signInWithGoogleRedirect = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      toast.success("Login Successfull");
      router.push("/");
    } catch (error) {
      console.log("error in Google.jsx : ", error);
    }
    setLoading(false);
  };

  return (
    <div className="h-[91.5vh] flex justify-center items-center">

    <div className="hidden lg:inline-block">
      <button
        onClick={signInWithGooglePopup}
        aria-label="Login with Google"
        type="button"
        className="border border-white flex items-center gap-3 font-bold text-xl px-7 py-5 rounded-md bg-white text-black"
        disabled={loading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        <p>Login with Google</p>
      </button>
    </div>
    <div className="inline-block lg:hidden">
    <button
        onClick={signInWithGoogleRedirect}
        aria-label="Login with Google"
        type="button"
        className="border-white flex items-center gap-3 font-bold text-xl px-7 py-5 rounded-md bg-white text-black"
        disabled={loading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        <p>Login with Google</p>
      </button>
    </div>
    </div>
  );
}
