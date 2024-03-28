"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logo from "../../../public/assets/t-preview.png";
import { serif,arima } from "../element/fonts";
import Link from "next/link";

export default function Account() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth();

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const [isIssueOpen, setIssueIsOpen] = useState(false);
  const IssueIsOpen = () => setIssueIsOpen(!isIssueOpen);

  const [data, setData] = useState(undefined);

  const getAllPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${user.email}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`Fetching Error : Status :${response.status}`);
      }
      const raw_issue = await response.json();
      setData(raw_issue);
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      return { success: false, error };
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

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
  const puto = auth.currentUser?.photoURL;

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(auth.currentUser.uid);
      toast.success("Copied to Clipboard.");
    } catch (err) {
      toast.error("Failed to Copy : " + err);
    }
  };

  if (!user) {
    return <div className={``}>Only Logined Users can view this page</div>;
  }
  return (
    <div className="min-h-[90vh] flex md:justify-center wallpaper1 ">
      <div className="flex z-10 md:pt-5 flex-col gap-5 w-full md:w-3/4 px-3 pb-20">
        <div className="flex gap-5 items-center flex-col sm:flex-row">
          <p className=" rounded-md text-sm flex justify-center items-center">
            <Image
              src={puto === null ? Logo : puto}
              // src={Logo}
              height={100}
              width={100}
              alt="profile photo"
              className="rounded-full sm:rounded-md h-52 w-52 sm:h-40 sm:w-60 object-contain"
            />
          </p>
          <div className={`w-full flex flex-col gap-5`}>
            <p className={`rounded-md px-3 py-5 text-sm bg-gray-800 text-green-400 overflow-auto border border-gray-500 ${serif.className}`}>
              Name :
              <span className={`sm:ml-4 uppercase font-bold text-white ${arima.className}`}>
                {auth.currentUser.displayName}
              </span>
            </p>
            <p className={`rounded-md bg-gray-800 border border-gray-500 px-3 py-5 text-sm text-green-400 hover:bg-gray-700 overflow-auto ${serif.className}`}>
              Email :
              <span className={`sm:ml-4 uppercase font-bold text-white cursor-pointer hover:underline ${arima.className}`}>
                {auth.currentUser.email}
              </span>
            </p>
          </div>
        </div>
        <div
          className={`bg-gray-800 px-3 py-5 rounded-md text-white flex items-center justify-between hover:underline cursor-pointer border border-gray-500 ${serif.className}`}
          onClick={toggleIsOpen}
        >
          <p className="">View Other Data.</p>
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
          <div className={`flex flex-col gap-3 -mt-2`}>
            <p className={`rounded-md  bg-white px-3 border py-5 text-sm text-gray-800 transition-all overflow-auto ${serif.className}`}>
              Account Created :
              <span className={`uppercase text-black cursor-pointer hover:underline sm:ml-4`}>
                {new Date(
                  auth.currentUser.metadata.creationTime
                ).toLocaleString("en-US", {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                })}
              </span>
            </p>
            <p className={`rounded-md bg-white px-3 border py-5 text-sm text-gray-800 transition-all overflow-auto ${serif.className}`}>
              Last SignIn :
              <span className={`sm:ml-4 uppercase text-black cursor-pointer hover:underline`}>
                {new Date(
                  auth.currentUser.metadata.lastSignInTime
                ).toLocaleString("en-US", {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                })}
              </span>
            </p>
            <p className={`${serif.className} rounded-md bg-white px-3 border py-5 text-sm text-gray-800 transition-all overflow-auto flex justify-between`}>
              <p>
                Unique ID :
                <span className={`sm:ml-4 uppercase text-black cursor-pointer hover:underline`}>
                  {auth.currentUser.uid}
                </span>
              </p>
              <p
                className={`border px-4 hover:scale-110 py-1 transition-all rounded-sm hover:bg-white hover:text-black cursor-pointer text-white`}
                onClick={copyId}
              >
                Copy
              </p>
            </p>
          </div>
        )}
        <p
          className={`rounded-md bg-gray-800 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer border border-gray-500 ${serif.className}`}
          onClick={() => {
            router.push("/account/TermAndCondition");
          }}
        >
          Terms And Conditions.
        </p>
        <div
          className={`bg-gray-800 px-3 py-5 rounded-md text-white flex items-center justify-between hover:underline cursor-pointer border border-gray-500 ${serif.className}`}
          onClick={IssueIsOpen}
        >
          <p className="">Issue Uploaded [ {data?.length} ].</p>
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
        {isIssueOpen && (
          <div className="text-white rounded-md -mt-3 max-h-80  overflow-auto">
            <div className="h-full flex flex-col gap-3">
              {data === undefined ? (
                <p className="text-white">Loading Issue..</p>
              ) : data.length === 0 ? (
                <p>You have Not Uploaded any Issue!</p>
              ) : (
                data.map((item,index) => (
                  <div key={index} className="border px-2 py-4 rounded-md bg-white text-black flex justify-between items-center">
                    <p className={`${arima.className} capitalize`}>Title : {item.issue_title}</p>
                    <Link href={`/issue/${item._id}`} className={`${serif.className} border px-3 uppercase border-gray-600 py-1 text-sm rounded-md hover:bg-gray-600 hover:text-white transition-all`}>Details</Link>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {user?.emailVerified ? null : (
          <p
            className="rounded-md bg-gray-800 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer border border-gray-500"
            onClick={() => {
              router.push("");
            }}
          >
            Total Issue Resolved
          </p>
        )}
        <p
          className={`rounded-md bg-gray-800 px-3 py-5 text-sm font-bold uppercase text-white hover:bg-gray-700 cursor-pointer border border-gray-500 ${serif.className}`}
          onClick={() => {
            router.push("/account/Feedback");
          }}
        >
          How was our app ?
        </p>
        <button
          className={`rounded-md px-3 py-5 text-sm font-bold uppercase bg-red-600 text-white hover:bg-red-700 ${serif.className}`}
          onClick={LogoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
