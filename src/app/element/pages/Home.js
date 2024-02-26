"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() { 
  const { user } = useAuthContext(); 
  const router = useRouter(); 
  const auth = getAuth(); 

  useEffect(() => {
    if (user == null) {
      toast.remove()
      toast.error("Please login to continue!")
      router.push("/login");
    }
  }, [user, router]); 

  if (!user) {
    return <div>Only Logined Users can view this page</div>;
  }

  return (
    <main className="p-2 flex flex-col gap-2 min-h-[35rem] bg-gray-600">
      <div className="flex justify-between items-center">
        <p className="text-xl font-extrabold uppercase">Issue</p>
      </div>
    </main>
  );
}
