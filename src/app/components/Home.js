"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "./Button";

export default function Home() {
  const { user } = useAuthContext(); // Moved to top level
  const router = useRouter(); // Moved to top level
  const auth = getAuth(); // Moved to top level

  useEffect(() => {
    if (user == null) router.push("/register");
  }, [user, router]); // Added router to the dependency array

  const LogoutBtn = () => {
    signOut(auth)
      .then(() => {
        alert("Sign out successfully");
        router.push("/");
      })
      .catch((error) => {
        alert("Problem in Signing out");
      });
  };

  if (!user) { // Conditional rendering
    return <div>Only Logined Users can view this page</div>;
  }

  return (
    <main className="p-2 flex flex-col gap-2 min-h-[35rem]  sm:bg-yellow-600 md:bg-blue-700 lg:bg-green-700 xl:bg-red-700">
      <div className="flex justify-between items-center">
        <p className="text-xl font-extrabold uppercase">Issue</p>
        <p>Search</p>
      </div>
      <div className="bg-green-600 rounded-lg p-3 h-full flex-1">
        <Button title="api/issue" url="/api/issue" />
      </div>
    </main>
  );
}
