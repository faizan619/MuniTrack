"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() { 
  const { user } = useAuthContext(); // Moved to top level
  const router = useRouter(); // Moved to top level
  const auth = getAuth(); // Moved to top level

  useEffect(() => {
    if (user == null) {
      toast.remove()
      toast.error("Please login to continue!")
      router.push("/login");
    }
  }, [user, router]); // Added router to the dependency array

  const LogoutBtn = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign out successfully!");
        window.location.reload();
        // router.refresh("/");
      })
      .catch((error) => {
        toast.error("Problem in Signing out");
      });
  };

  if (!user) {
    // Conditional rendering
    return <div>Only Logined Users can view this page</div>;
  }

  return (
    <main className="p-2 flex flex-col gap-2 min-h-[35rem] bg-gray-600">
      <div className="flex justify-between items-center">
        <p className="text-xl font-extrabold uppercase">Issue</p>
        {/* <p>Search</p> */}
        <button className="border px-3 py-1 rounded-md hover:text-white" onClick={LogoutBtn}>Logout</button>
      </div>
    </main>
  );
}
