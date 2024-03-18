"use client";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Details({ name }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext();

  const getIssue = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/id/${name}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`Fetching Error : Status :${response.status}`);
      }
      response = await response.json();
      setData(response);
      setLoading(false);
    } catch (err) {
      toast.error(
        "Failed to Fetch Details ! Please Refresh or Try again Later"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getIssue();
  }, [name]);

  const handleEdit = ()=>{
    toast.success("Edit The issue is Still building")
  }

  const handleResolve = ()=>{
    toast.success("Resolving Issue Is still left")
  }

  return (
    <div className="min-h-[90vh] pb-20 text-center wallpaper1 text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <>
            <div className="font-extrabold text-xl py-3">
              Issue Raised by {data.issue_user_name}
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <Image
                src={data.issue_image_url}
                height={0}
                width={300}
                className="object-contain border w-2/5 rounded-md"
              />
              <div className="text-left p-3 rounded-md w-3/4 flex flex-col gap-4 bg-purple-600">
                <p>
                  Title : <span className="font-bold uppercase underline">{data.issue_title}</span>
                </p>
                <p>
                    Info : <span className="capitalize font-bold">{data.issue_describe}</span>
                </p>
                <p>
                    Issue occured At : <span className="font-bold underline">{data.issue_location} {data.issue_manual_location==="none"?"":` or ${data.issue_manual_location}`}</span>
                </p>
                <p>
                    Issue Uploaded on : <span className="font-bold">{data.issue_uploaded_on}</span>
                </p>
              </div>
              <div className="flex gap-3">

                {data.issue_state==="pending"?(
                    user.emailVerified?(<p className="px-5 py-2 rounded-md cursor-pointer transition-all">Issue is Still pending</p>):(<Link href={`/issue/resolved/${data._id}`} className="border px-5 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer transition-all">Resolve This Issue</Link>)
                ):(<p>Issue Resolved By {data.issue_resolve_by}</p>)}
                    {user.email === data.issue_user_email?(<Link href={`/issue/update/${data._id}`} className="border px-5 py-2 hover:bg-white hover:text-black rounded-md">Edit Your Issue</Link>):(null)}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
