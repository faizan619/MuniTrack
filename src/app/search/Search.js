"use client";

import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);

  const getIssue = async () => {
    if (inp !== undefined && inp !== null && inp !== "") {
      setLoading(true);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/${inp}`
      );
      response = await response.json();
      console.log("response :", response);
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

  return (
    <div className="h-[90vh] wallpaper text-white p-3 ">
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
          <div className="bg-white text-black hover:bg-gray-200 cursor-pointer px-5 py-3 rounded-md">View Issue Incharge</div>
          <div className="bg-white text-black hover:bg-gray-200 cursor-pointer px-5 py-3 rounded-md">View Participants</div>
          <div className="bg-white text-black hover:bg-gray-200 cursor-pointer px-5 py-3 rounded-md">
            View Upcoming Drives
          </div>
        </div>
      ) : !data ? (
        <p>No Data Found!!</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : data.length !== 0 ? (
        <div className="flex py-5">
          <div className="border rounded-md bg-white text-black px-3 py-2">
            <p>
              Title :{" "}
              <span className="font-bold capitalize">
                {data[0].issue_title}
              </span>
            </p>
            <p>
              Issued Raised by{" "}
              <span className="font-bold">{data[0].issue_user_name}</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Didn`t find the Item you are looking for </p>
      )}
    </div>
  );
}
