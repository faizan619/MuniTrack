"use client";
import { arima, car, kushan, serif } from "@/app/element/fonts";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RWebShare } from "react-web-share";

export default function Details({ name }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

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

  let [showiss, setshowiss] = useState(false);
  let showIssue = () => {
    if (showiss) {
      setshowiss(false);
    } else {
      setshowiss(true);
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center pb-20 text-center wallpaper1 text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div className={`w-[80%] py-5`}>
            <div
              className={`flex flex-col border-4 ${
                data.issue_state === "pending"
                  ? "border-red-700"
                  : "border-green-700"
              } rounded-md px-3 gap-5 py-5 text-left bg-white text-black`}
            >
              <p className={`italic text-sm flex justify-between items-center`}>
                <div className={`text-center capitalize rounded-md`}>
                  {data.issue_state === "pending" ? (
                    user?.emailVerified ? null : (
                      <Link
                        href={`/issue/resolved/${data._id}`}
                        className="border px-5 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer transition-all"
                      >
                        Resolve This Issue
                      </Link>
                    )
                  ) : (
                    <p className={`capitalize rounded-md py-2 px-3 `}>
                      <span>{data.issue_resolved_on}</span>
                    </p>
                  )}
                </div>
                <span
                  className={`capitalize ${
                    data.issue_state === "pending"
                      ? "bg-red-700"
                      : "bg-green-700"
                  } py-2 px-5 text-white select-none`}
                >
                  {data.issue_state}
                </span>
              </p>
              <p
                className={`${kushan.className} text-center text-3xl capitalize`}
              >
                {data.issue_title}
              </p>
              {data.issue_state === "pending" ? (
                <ConditionView data={data} />
              ) : (
                <div className="flex flex-col gap-5">
                  <p className={`${arima.className} text-green-700 text-lg`}>
                    Issue Resolves By [{" "}
                    <span
                      className={`${serif.className} bg-green-700 text-white px-3 uppercase`}
                    >
                      Admin : {data.issue_resolved_by}
                    </span>{" "}
                    ]
                  </p>
                  <div className="flex flex-col items-center">
                    <Image
                      height={0}
                      width={350}
                      src={data.issue_resolve_image_url}
                      alt="Resolve image"
                      className="rounded-md h-80 shadow-md shadow-black"
                    />
                    <p className={`text-red-700 ${arima.className}`}>
                      Image of Resolve Issue
                    </p>
                  </div>
                  <button
                    className={`border py-2 bg-slate-600 rounded-md text-white`}
                    onClick={() => {
                      showIssue();
                    }}
                  >
                    {showiss ? "Close Issue" : "Open Issue"}
                  </button>
                  {showiss && <ConditionView data={data} />}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

const ConditionView = ({ data }) => {
  let { user } = useAuthContext();
  return (
    <>
      <div className={`flex justify-between transition-all`}>
        <div className={`flex gap-2 items-center`}>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.issue_user_name
            )}&size=35&rounded=true&background=black&color=fff&uppercase=false`}
            alt={data.issue_user_name}
          />
          <div className={`${serif.className}`}>
            <p>{data.issue_user_name}</p>
            <p className={`text-sm`}>
              {new Date(data.issue_uploaded_on).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className={`flex gap-2`}>
          <RWebShare
            data={{
              text: "This is Just for testing!",
              url: "http://localhost:3000/drive",
              title: "testing",
            }}
            onClick={()=>{toast.success("Sharing!")}}
          >
            <button
              className={`${serif.className}`}
            >
              Share
            </button>
          </RWebShare>
        </div>
      </div>
      <Image
        src={data.issue_image_url}
        alt="Issue Image"
        height={0}
        width={350}
        className="object-contain shadow-sm shadow-black w-full h-96 rounded-md border-black"
      />
      <div className={`${serif.className} px-3`}>
        Location : {data.issue_location}{" "}
        {data.issue_manual_location === "" ||
        data.issue_manual_location === "none"
          ? ""
          : ` or ${data.issue_manual_location}`}
      </div>
      <div className={`capitalize ${arima.className} px-3 text-lg`}>
        {data.issue_describe}
      </div>
      <div
        className={`bg-gray-800 ${serif.className} text-white p-3 rounded-md`}
      >
        <h1 className={`${serif.className} mb-3`}>Issue Raiser Information</h1>
        <p className={`px-3`}>
          Name :{" "}
          <span className={`${arima.className} underline`}>
            {data.issue_user_name}
          </span>
        </p>
        <p className={`px-3`}>
          Email :{" "}
          <span className={`${arima.className} underline`}>
            {data.issue_user_email}
          </span>
        </p>
        <p className={`px-3`}>
          Raised Issue From :{" "}
          <span className={`${arima.className} underline`}>
            {data.issue_location}
          </span>
        </p>
      </div>
      <div className={`flex justify-center items-center gap-5`}>
        {user?.email === data.issue_user_email ? (
          data.issue_state === "pending" ? (
            <a
              href={`/issue/update/${data._id}`}
              className="border px-5 py-2 hover:bg-red-800 hover:text-white transition-all border-red-800 rounded-md"
            >
              Edit Your Issue
            </a>
          ) : null
        ) : null}
      </div>
    </>
  );
};
