"use client";

import { arima, serif } from "@/app/element/fonts";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditForm({
  id,
  title,
  describe,
  location,
  u_email,
  u_name,
}) {
  const { user } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]);

  let [info, setInfo] = useState({
    title: title,
    describe: describe,
    location: location,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if ((!info.title, !info.describe, !info.location)) {
      toast.error("Fill All the Credentials !");
    } else {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/id/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(info),
          }
        );
        if (!res.ok) {
          toast.remove();
          toast.error("Fill All the Credentials!");
          throw new Error("Failed to Update Data !");
        }
        toast.remove();
        toast.success("Successfully Updated !");
        router.push(`/issue/${id}`);
      } catch (error) {
        console.log("Error in update/[id]/Editform : ", error);
      }
    }
  };

  if (user?.email === u_email) {
    return (
      <div className="min-h-[90vh] wallpaper1 flex flex-col items-center text-white text-center px-2 py-5">
        <form className="text-black shadow-sm md:shadow-white w-full md:w-3/4  rounded-md md:py-10 p-3 sm:p-5 flex flex-col gap-3">
      <p className={`text-white ${arima.className} text-xl uppercase`}>Update </p>
          <label className="text-white text-left" htmlFor="title">
            Name
          </label>
          <input
            className="px-3 py-2 rounded-md text-lg"
            id="title"
            type="text"
            placeholder="Enter Title"
            value={info.title}
            onChange={(e) => {
              setInfo((prevInfo) => ({ ...prevInfo, title: e.target.value }));
            }}
          />
          <label className="text-white text-left" htmlFor="describe">
            Description
          </label>
          <input
            className="px-3 py-2 rounded-md text-lg"
            id="describe"
            type="text"
            placeholder="Enter Description"
            value={info.describe}
            onChange={(e) => {
              setInfo((prevInfo) => ({
                ...prevInfo,
                describe: e.target.value,
              }));
            }}
          />
          <label className="text-white text-left" htmlFor="location">
            Location
          </label>
          <input
            className="px-3 py-2 rounded-md text-lg"
            type="text"
            id="location"
            placeholder="Enter Location"
            value={info.location}
            onChange={(e) => {
              setInfo((prevInfo) => ({
                ...prevInfo,
                location: e.target.value,
              }));
            }}
          />
          <p className={`${serif.className} text-left text-sm capitalize text-red-700`}>
            {u_name} .Be Sure To Update Correct Data.otherwise Legal Action will
            be taken.
          </p>

          <button
            type="submit"
            onClick={handleUpdate}
            className="text-white border-white border py-3 rounded-lg
            hover:bg-[rgb(40,63,65,.8)] hover:border-dotted bg-[#283f41]
             transition-all"
          >
            Upload
          </button>
        </form>
      </div>
    );
  } else {
    return <div>Nahi dekhana teko.</div>;
  }
}
