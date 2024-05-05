"use client";
import Image from "next/image";
import DetailBtn from "../element/component/DetailBtn";
import toast from "react-hot-toast";
import Link from "next/link";
import Ima1 from "../../../public/background/img4.jpg";
import { useAuthContext } from "@/context/AuthContext";
import DeleteIssue from "./DeleteIssue";
import { useState } from "react";
import { arima, serif } from "../element/fonts";
export default function IssueComp1({ issues }) {
  const { user } = useAuthContext();

  return (
    <div className="">
      {user.emailVerified ? null : (
        <p className={`text-white text-xl pl-7 ${arima.className}`}>
          Total Issues : [{issues?.length}]
        </p>
      )}
      <div className="flex gap-5 flex-wrap p-3 justify-evenly">
        {issues === undefined ? (
          <div className={`text-white ${serif.className} text-xl`}>
            <div className="w-16 mb-12  border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            <p>Loading...</p>
          </div>
        ) : issues.length === 0 ? (
          <p className="text-white">No Issue Found!</p>
        ) : (
          <div className="w-full flex flex-wrap gap-5 justify-evenly">
            <Link
              href={"/add"}
              className="relative wallpaper1 rounded-md overflow-hidden flex flex-col justify-center items-center border cursor-alias bg-gray-600 h-80 w-72 hover:scale-105 transition-all"
            >
              {/* <Image
                src={Ima1}
                alt="bg image"
                width={350}
                height={100}
                className="absolute z-0 h-full w-full brightness-50 "
              /> */}
              <div
                className={`z-10 uppercase text-lg ${serif.className} text-white`}
              >
                Create Issue
              </div>
            </Link>

            {issues
              .slice()
              .reverse()
              .map((item) =>
                item.issue_public_view === "true" ? (
                  <IssueCard key={item._id} item={item} />
                ) : user?.emailVerified ? null : (
                  <IssueCard key={item._id} item={item} />
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
}

const IssueCard = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const handlePublicView = async (id) => {
    try {
      setLoading(true);
      toast.loading("Changing the View");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/view/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update view");
      }
      toast.remove();
      toast.success("View updated successfully!");
      setLoading(false);
    } catch (error) {
      toast.remove();
      toast.error("Failed to update view");
      setLoading(false);
    }
  };
  const { user } = useAuthContext();
  return (
    <div
      className={`text-white ${
        item.issue_state === "pending" ? "border-red-700" : "border-green-700"
      } border-2 relative h-80 flex flex-col w-72 overflow-hidden rounded-md shadow-md hover:shadow-gray-700 hover:scale-105 transition-all`}
    >
      <Image
        src={item.issue_image_url}
        alt="bg image"
        width={350}
        height={100}
        className="h-36 w-full z-10"
      />
      <p
        className={`absolute z-20 ${
          item.issue_state === "pending" ? "bg-red-700" : "bg-green-700"
        } capitalize px-5 right-0`}
      >
        {item.issue_state}
      </p>
      <div className="flex-1 gap-2 bg-gray-200 text-black flex flex-col items-center justify-between z-10 py-4 px-3">
        <p
          className={`${serif.className} text-md text-center uppercase border h-8 overflow-hidden`}
        >
          {item.issue_title}
        </p>
        <p
          className={`text-center text-sm italic  h-14 overflow-hidden ${arima.className}`}
        >
          {item.issue_describe}
        </p>
        <div className="w-full flex justify-center gap-5">
          {item.issue_public_view === "true" ? null : (
            <button
              className="relative inline transition-all cursor-pointer before:bg-gray-500  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
              disabled={loading}
              onClick={() => {
                handlePublicView(item._id);
              }}
            >
              {loading ? "Changing." : "Public"}
            </button>
          )}
          <DetailBtn url={item._id} />
          {user.emailVerified && item.issue_user_email !== user.email ? null : (
            <DeleteIssue dltItem={item} />
          )}
        </div>
      </div>
    </div>
  );
};
