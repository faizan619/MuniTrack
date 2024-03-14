"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Drive() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]);

  if (!user) {
    return <div>Only Logined Users can view this page</div>;
  } else if (user?.emailVerified) {
    return <div className="h-[90vh] flex justify-center items-center">
        <p className="border border-black p-5 rounded-md hover:scale-125 transition-all" id="nahi">Member`s Can`t Access this Page</p>
    </div>;
  } else {
    return <div className="min-h-[90vh] wallpaper1 flex flex-col items-center gap-5 text-white py-3 px-2">
      <h1 className="text-center text-2xl">MuniTrack Campain</h1>
      <button className="border uppercase px-7 py-3 text-lg rounded-md hover:bg-white hover:text-black transition-all">Create Camp</button>
      <div className="w-full p-3 flex flex-col gap-3">
        <p className="uppercase">Active Camp [ 0 ]</p>
        <h1 className="text-center">No Campaign Database Created yet !</h1>
      </div>
    </div>;
  }
}
