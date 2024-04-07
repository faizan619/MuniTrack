"use client";

import DetailBtn from "@/app/element/component/DetailBtn";
import { arima, serif } from "@/app/element/fonts";
import DeleteIssue from "@/app/issue/DeleteIssue";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const { user } = useAuthContext();
  const [inp, setInp] = useState(undefined);
  const [data, setData] = useState("");

  const debouncedId = useDebounce(inp, 500);
  let [loading, setLoading] = useState(false);

  const router = useRouter();

  const getIssue = async () => {
    if (inp !== undefined && inp !== null && inp !== "") {
      setLoading(true);
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
  const [allData, setAllData] = useState("");
  const AllgetIssue = async () => {
    setLoading(true);
    let response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue`);
    response = await response.json();
    setAllData(response);
    setLoading(false);
  };
  useEffect(() => {
    AllgetIssue();
  }, []);

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
    <div className="h-[90vh] overflow-auto wallpaper1 text-white p-3 ">
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
        <div
          className={`text-white flex gap-5 flex-col flex-wrap justify-evenly py-5`}
        >
          <p>Total Issue Available : {allData.length}</p>
          <table>
            <thead>
              <tr>
                <th>No. </th>
                <th>Name</th>
                <th>Location</th>
                <th>Raised By</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!allData ? (
                <p>Loading Issue</p>
              ) : allData.length !== 0 ? (
                allData.map((item, index) => (
                  <tr key={item._id}>
                    <td className={`capitalize border p-1 ${
        item.issue_state === "pending" ? "bg-red-600" : "bg-green-700"
      }`}>{index + 1}</td>
                    <td className={`capitalize border p-1 `}>
                      {item.issue_title}
                    </td>
                    <td className={`capitalize border p-1 `}>
                      {item.issue_location}
                    </td>
                    <td className={`capitalize border p-1 `}>
                      {item.issue_user_name}
                    </td>
                    <td className={`capitalize border p-1 flex flex-col justify-center`}>
                      <DetailBtn url={item._id} />
                    </td>
                    <td className={`capitalize border p-1 `}>
                      {user.emailVerified &&
                      item.issue_user_email !== user.email ? null : (
                        <DeleteIssue dltItem={item} />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <p>No Issue Uploaded Yet</p>
              )}
            </tbody>
          </table>
        </div>
      ) : !data ? (
        <p>Loading..</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : data.length !== 0 ? (
        <div className="flex flex-col py-5">
          <p className="text-lg">Data Found : {data.length} </p>
          <div className="flex flex-wrap gap-5">
            {data.map((item, index) => (
              <IssueCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <p>Didn`t find the Issue you are looking for </p>
      )}
    </div>
  );
}

const IssueCard = ({ item }) => {
  const { user } = useAuthContext();

  return (
    <div
      className={`text-white z-10 ${
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
          className={`${serif.className} text-2xl uppercase border h-8 overflow-hidden`}
        >
          {item.issue_user_name}
        </p>
        <p
          className={`text-center text-sm italic  h-14 overflow-hidden ${arima.className}`}
        >
          {item.issue_describe}
        </p>
        <div className="w-full flex justify-center gap-5">
          <DetailBtn url={item._id} />
          {user.emailVerified && item.issue_user_email !== user.email ? null : (
            <DeleteIssue dltItem={item} />
          )}
        </div>
      </div>
    </div>
  );
};
