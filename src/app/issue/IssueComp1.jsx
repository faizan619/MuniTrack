"use client";
import Image from "next/image";
import DetailBtn from "../element/component/DetailBtn";
import toast from "react-hot-toast";
import Link from "next/link";
import Ima1 from "../../../public/background/img4.jpg";
import { useAuthContext } from "@/context/AuthContext";
import DeleteIssue from "./DeleteIssue";
import { useState } from "react";
export default function IssueComp1({ issues }) {
  const { user } = useAuthContext();

  return (
    <div className="">
      {user.emailVerified ? null : (
        <p className="text-white text-xl pl-7">
          Total Issues : [{issues?.length}]
        </p>
      )}
      <div className="flex gap-5 flex-wrap p-3 justify-evenly">
        {issues === undefined ? (
          <p className="text-white">No Issue Available</p>
        ) : issues.length === 0 ? (
          <p>No Issue Found!</p>
        ) : (
          <div className="w-full flex flex-wrap">
            <Link
              href={"/add"}
              className="relative rounded-md overflow-hidden m-2 flex flex-col justify-center items-center border cursor-alias bg-gray-600 w-72 hover:scale-105 transition-all"
            >
              <Image
                src={Ima1}
                alt="bg image"
                width={350}
                height={100}
                className="absolute z-0 h-full w-full brightness-50 "
              />
              <div className="z-10 uppercase text-white">Create Issue</div>
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
      className={`relative rounded-md w-72 text-white overflow-hidden m-2 border-4  ${
        item.issue_state === "pending" ? "border-red-600" : "border-green-600"
      } `}
    >
      <Image
        src={item.issue_image_url}
        alt="bg image"
        width={350}
        height={100}
        className="absolute z-0 h-full w-full brightness-50 "
      />
      <div className="z-10 px-7 items-start py-5 backdrop-blur-sm text-white flex flex-col gap-2">
        <p>
          Title :{" "}
          <span className="font-bold capitalize">{item.issue_title}</span>
        </p>
        <p>
          Issued Raised by{" "}
          <span className="font-bold">{item.issue_user_name}</span>
        </p>
        <p>
          View : <span className="font-bold">{item.issue_public_view}</span>
        </p>
        <div className="flex gap-5">
          <DetailBtn url={item._id} />
          {item.issue_public_view === "true" ? null : (
            <button
              className="hover:border bg-green-600 rounded-md px-1"
              disabled={loading}
              onClick={() => {
                handlePublicView(item._id);
              }}
            >
              {loading ? "Changing." : "Public"}
            </button>
          )}
          {user.emailVerified && item.issue_user_email !== user.email ? null : <DeleteIssue dltItem={item} />}
        </div>
      </div>
    </div>
  );
};
