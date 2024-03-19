"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditForm({ id, title, describe, location, u_email ,u_name}) {
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
      <div className="min-h-[90vh] wallpaper1 text-white text-center p-5">
        <p>This is Update page for User : {u_name}</p>
        <form className="text-black flex flex-col gap-3">
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
/*
    return (
      <div className="flex justify-center bg-black">
        <form className="flex flex-col mt-5 gap-5 mb-10 px-5 text-black lg:w-[80%]">
          <div className="flex flex-wrap gap-5 justify-between">
            <input
              className="px-3 py-2 rounded-md text-lg"
              className="px-3 w-full md:w-[47%] py-2 rounded-md border-2 border-[#283f41] "
              type="text"
              placeholder="Enter Common Name"
              onChange={(e) => {
                setinfo((prevInfo) => ({ ...prevInfo, name: e.target.value }));
              }}
              value={info.name}
            />
            <input
              className="px-3 py-2 rounded-md text-lg"
              className="px-3 w-full  md:w-[47%] py-2 rounded-md border-2 border-[#283f41] "
              type="text"
              placeholder="Enter Scientific Name"
              onChange={(e) => {
                setinfo((prevInfo) => ({
                  ...prevInfo,
                  scientific_name: e.target.value,
                }));
              }}
              value={info.scientific_name}
            />
            <input
              className="px-3 py-2 rounded-md text-lg"
              className="px-3 w-full md:w-[47%] py-2 rounded-md border-2 border-[#283f41] "
              type="text"
              placeholder="Kingdom"
              value={info.kingdom}
              onChange={(e) => {
                setinfo((prevInfo) => ({ ...prevInfo, kingdom: e.target.value }));
              }}
            />
            <input
              className="px-3 py-2 rounded-md text-lg"
              className="px-3 w-full md:w-[47%] py-2 rounded-md border-2 border-[#283f41] "
              type="text"
              placeholder="Family"
              value={info.family}
              onChange={(e) => {
                setinfo((prevInfo) => ({ ...prevInfo, family: e.target.value }));
              }}
            />
          </div>
          <textarea
            type="text"
            className="px-3 py-2  rounded-md border-2 border-[#283f41] h-40"
            placeholder="Enter Description"
            value={info.description}
            onChange={(e) => {
              setinfo((prevInfo) => ({
                ...prevInfo,
                description: e.target.value,
              }));
            }}
          />
          <textarea
            className="px-3 py-2 rounded-md border-2 border-[#283f41] h-32"
            type="text"
            placeholder="Uses"
            value={info.uses}
            onChange={(e) => {
              setinfo((prevInfo) => ({ ...prevInfo, uses: e.target.value }));
            }}
          />
          <button
            type="submit"
            onClick={handleUpdate}
            className="text-white border-white border py-3 rounded-lg
            hover:bg-[rgb(40,63,65,.8)] hover:border-dotted bg-[#283f41]
             transition-all"
          >
            Upload
          </button>
          <p className="text-white">
  thu
          </p>
        </form>
      </div>
    );
  }
  */
