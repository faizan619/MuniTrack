"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Upload() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]);

  const handlecreate = () => {
    router.push("/incharge/create");
  };

  if (!user) {
    return <div>Only Logined Users can view this page</div>;
  } else if (user?.emailVerified) {
    return (
      <div className="h-[90vh] w-full flex justify-center wallpaper1 items-center">
        <p
          className="border border-white p-5 rounded-md hover:scale-125 transition-all text-white"
          id="nahi"
        >
          Member`s Can`t Access this Page
        </p>
      </div>
    );
  } else {
    return (
      <div className="min-h-[90vh] wallpaper1 flex flex-col justify-center items-center gap-5 text-white py-3 px-2">
        <button
          className="border uppercase h-60 w-96 text-xl rounded-md hover:bg-white hover:text-black transition-all"
          onClick={handlecreate}
        >
          Create Camp
        </button>
      </div>
    );
  }
}
