"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ViewIncharge from "./ViewIncharge";
import ViewDrive from "./ViewDrive";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Search() {
  const [inp, setInp] = useState(undefined);
  const [data, setData] = useState("");

  const debouncedId = useDebounce(inp, 500);
  let [loading, setLoading] = useState(false);

  const router = useRouter();

  const getIssue = async () => {
    if (inp !== undefined && inp !== null && inp !== "") {
      setLoading(true);
      setIncharge(false);
      setCamp(false);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/${inp}`
      );
      response = await response.json();
      setData(response);
      setLoading(false);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    if (
      debouncedId !== undefined &&
      debouncedId !== "" &&
      debouncedId != null
    ) {
      getIssue();
    }
  }, [debouncedId]);

  let [incharge, setIncharge] = useState(false);
  const handleIncharge = () => {
    if (incharge) {
      setIncharge(false);
    } else {
      setIncharge(true);
      setCamp(false);
    }
  };

  let [camp, setCamp] = useState(false);
  const handleCamp = () => {
    if (camp) {
      setCamp(false);
    } else {
      setCamp(true);
      setIncharge(false);
    }
  };

  return (
    <div className="min-h-[90vh] wallpaper1 text-white p-3 ">
      <input
        type="text"
        placeholder="Search Issue"
        className="text-black px-3 py-2 w-full rounded-md"
        value={inp}
        onChange={(e) => {
          setInp(e.target.value);
        }}
      />
      {!inp ? (
        <div className="flex gap-5 flex-wrap justify-evenly py-5">
          <div
            className={`${
              incharge ? "bg-white text-black" : "text-white"
            } hover:bg-gray-500 hover:text-white cursor-pointer px-5 py-3 rounded-md border border-gray-500`}
            onClick={handleIncharge}
          >
            View Issue Incharge
          </div>
          <div
            className={`${
              camp ? "bg-white text-black" : "text-white"
            } hover:bg-gray-500 hover:text-white cursor-pointer px-5 py-3 rounded-md border border-gray-500`}
            onClick={handleCamp}
          >
            View Upcoming Drives
          </div>
        </div>
      ) : !data ? null : loading ? (
        <p>Loading...</p>
      ) : data.length !== 0 ? (
        <div className="flex flex-col py-5">
          <p className="text-lg">Data Found : {data.length} </p>
          <div className="flex flex-wrap">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative rounded-md overflow-hidden m-2"
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
                    <span className="font-bold capitalize">
                      {item.issue_title}
                    </span>
                  </p>
                  <p>
                    Issued Raised by{" "}
                    <span className="font-bold">{item.issue_user_name}</span>
                  </p>
                  <p>
                    Location :{" "}
                    <span className="font-bold">{item.issue_location}</span>
                  </p>
                  <button
                    className="text-left border border-white hover:bg-white hover:text-black transition-all px-3 py-1 rounded-md"
                    onClick={() => router.push(`/issue/${item._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Didn`t find the Item you are looking for </p>
      )}
      {!inp && incharge ? (
        <div className="mb-20 min-h-52 p-3 gap-5">
          <ViewIncharge />
        </div>
      ) : null}
      {!inp && camp ? (
        <div className="min-h-52 mb-20">
          <ViewDrive />
        </div>
      ) : null}
    </div>
  );
}
