"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Account() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/login");
    }
  }, [user, router]);

  const LogoutBtn = () => {
    let ready = confirm("Do you want to Logout!");
    if (ready) {
      signOut(auth)
        .then(() => {
          toast.success("Sign out successfully!");
        })
        .catch((error) => {
          toast.error("Problem in Signing out");
        });
    } else {
      toast.success("Be a Part in Improving the Society!");
    }
  };

  if (!user) {
    return <div>Only Logined Users can view this page</div>;
  }
  return (
    <div className="min-h-[91.5vh] p-3 flex md:justify-center pt-5">
      <div className="flex flex-col gap-5 w-full md:w-3/4">
        <p className=" rounded-md px-3 py-5 text-sm bg-gray-600 text-green-400  ">
          Name :{" "}
          <span className="uppercase font-bold text-white">
            {auth.currentUser.displayName}
          </span>
        </p>
        <p
          className="rounded-md bg-gray-600 px-3 py-5 text-sm text-green-400 hover:bg-gray-700 "
        >
          Email :{" "}
          <span className="uppercase font-bold text-white cursor-pointer hover:underline ">
            {auth.currentUser.email}
          </span>
        </p>
        <p className="rounded-md bg-gray-600 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer" onClick={()=>{router.push('/account/TermAndCondition')}}>
          Terms And Conditions.
        </p>
        <p className="rounded-md bg-gray-600 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer" onClick={()=>{router.push('/account/DeveloperDetails')}}>
          Developer Details
        </p>
        <p className="rounded-md bg-gray-600 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer" onClick={()=>{router.push('/account/Feedback')}}>
          How was our app ?
        </p>
        <button
          className="rounded-md px-3 py-5 text-sm font-bold uppercase bg-red-600 text-white hover:bg-red-700"
          onClick={LogoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  );
}