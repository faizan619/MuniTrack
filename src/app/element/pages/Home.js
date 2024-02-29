"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AddButton from "../component/AddButton";

export default function Home() {
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
  }

  return (
    <div className="h-[90vh] wallpaper p-5 text-white text-center">
      <AddButton/>
      <h1 className="border p-5 rounded-lg mb-10 ">Home Page</h1>
      <p>This Page is still Left for building</p>
    </div>
  );
}
