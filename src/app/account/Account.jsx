"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Account() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
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
      <div className="flex flex-col gap-5 w-full md:w-3/4 pb-20">
        <div className="flex gap-5 items-center flex-col sm:flex-row">
          <p className=" rounded-md text-sm flex justify-center items-center">
            <Image
              src={auth.currentUser.photoURL}
              height={100}
              width={100}
              alt="profile photo"
              className="rounded-full sm:rounded-md h-52 w-52 sm:h-40 sm:w-60 object-contain"
            />
          </p>
          <div className="w-full flex flex-col gap-5">
            <p className="rounded-md px-3 py-5 text-sm bg-gray-600 text-green-400 overflow-auto">
              Name :
              <span className="sm:ml-4 uppercase font-bold text-white">
                {auth.currentUser.displayName}
              </span>
            </p>
            <p className="rounded-md bg-gray-600 px-3 py-5 text-sm text-green-400 hover:bg-gray-700 overflow-auto">
              Email :
              <span className="sm:ml-4 uppercase font-bold text-white cursor-pointer hover:underline ">
                {auth.currentUser.email}
              </span>
            </p>
          </div>
        </div>
        <div
          className="bg-gray-600 px-3 py-5 rounded-md text-white flex items-center justify-between hover:underline hover:text-green-500 "
          onClick={toggleIsOpen}
        >
          <p className="font-semibold ">View Other Data.</p>
          <svg
            data-accordion-icon
            class="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="flex flex-col gap-1 -mt-4">
            <p className="rounded-md bg-green-500 px-3 py-5 text-sm text-gray-900 hover:bg-green-600 overflow-auto">
              Account Created :
              <span className="uppercase font-bold text-white cursor-pointer hover:underline sm:ml-4 ">
                {auth.currentUser.metadata.creationTime}
              </span>
            </p>
            <p className="rounded-md bg-green-500 px-3 py-5 text-sm text-gray-900 hover:bg-green-600 overflow-auto">
              Last SignIn :
              <span className="sm:ml-4 uppercase font-bold text-white cursor-pointer hover:underline ">
                {auth.currentUser.metadata.lastSignInTime}
              </span>
            </p>
            <p className="rounded-md bg-green-500 px-3 py-5 text-sm text-gray-900 hover:bg-green-600 overflow-auto">
              Unique ID :
              <span className="sm:ml-4 uppercase font-bold text-white cursor-pointer hover:underline ">
                {auth.currentUser.uid}
              </span>
            </p>
          </div>
        )}
        <p
          className="rounded-md bg-gray-600 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            router.push("/account/TermAndCondition");
          }}
        >
          Terms And Conditions.
        </p>
        <p
          className="rounded-md bg-gray-600 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            router.push("/account/DeveloperDetails");
          }}
        >
          Developer Details
        </p>
        <p
          className="rounded-md bg-gray-600 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            router.push("/account/Feedback");
          }}
        >
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
