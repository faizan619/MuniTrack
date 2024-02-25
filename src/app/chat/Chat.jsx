"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Chat() {
  const { user } = useAuthContext(); // Moved to top level
  const router = useRouter(); // Moved to top level
  const auth = getAuth(); // Moved to top level

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/login");
    }
  }, [user, router]); // Added router to the dependency array

  if (!user) {
    // Conditional rendering
    return <div>Only Logined Users can view this page</div>;
  }
  return (
    <div className="h-[91.5vh] bg-green-400 p-1">
      <div className="h-4/5 ">
        <div className="flex flex-col-reverse gap-3 h-full overflow-auto px-2">
          <div className="flex justify-end">
            <div className="border flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg rounded-md p-1">Hello</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md overflow-hidden">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg bg-green-700 text-white p-1">
                Hello1
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="border flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg rounded-md p-1">
                or kaisa hai
              </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md overflow-hidden">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg bg-green-700 text-white p-1">
                mast hu yarr! tu bata kaha tha itne dino sai . dost ko bhul gya
                kya
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="border flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg rounded-md p-1">
                chup snake! kal he toh baat kya.! short term memory hai kya bai
                teko jo bhul jata hai.
              </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md overflow-hidden">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg bg-green-700 text-white p-1">
                testing k liye likhra hu bai. tu serior kun hora chill karna .
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="border flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md">
              <h1 className="text-sm inline-block bg-gray-200 p-1">
                {auth.currentUser.email}
              </h1>
              <p className="inline-block text-lg rounded-md p-1">
                fir theek hia! meko laga firse tere paga giri chalu ho gye!
              </p>
            </div>
          </div>
        </div>
        <form className="flex gap-2 pt-2 w-full">
          <input
            type="text"
            placeholder="Enter Message... "
            className="w-full px-2 py-1 text-lg rounded-md"
          />
          <button className="border px-5 text-white hover:bg-white hover:text-black">
            Sent
          </button>
        </form>
      </div>
    </div>
  );
}
