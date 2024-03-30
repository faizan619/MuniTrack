"use client";

import { arima, serif } from "@/app/element/fonts";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [data, setData] = useState("");
  const getFeedback = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/feedback`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Server Error .Please Refresh");
      }
      res = await res.json();
      setData(res);
    } catch (error) {
      toast.remove();
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getFeedback();
  }, []);
  return (
    <div className={`text-white text-center p-4 h-[90vh] overflow-auto wallpaper1`}>
      <h1 className={`${serif.className} mb-5 text-xl`}>
        Feedback 
      </h1>
      <div className={`bg-gray-700 rounded-md py-5 px-3 flex flex-wrap justify-evenly items-center gap-5`}>
      {!data ? (
              <p>Loading Feedback</p>
            ) : data.length !== 0 ? (
              data.map((item) => (
                <div key={item._id} className={`border py-3 rounded-md bg-white text-black px-2 w-80`}>
                  <p className={`${arima.className} text-lg uppercase`}> {item.name}</p>
                  <span className={`italic`}>{item.email}</span>
                  <div className={`bg-gray-300 my-5 py-3`}>

                  <p className={`${serif.className} `}>Response : <span className={`uppercase underline`}>{item.selectedEmoji}</span></p>
                  <p className={`${arima.className} mt-3`}>{item.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Feedback Uploaded Yet</p>
            )}
      </div>
    </div>
  );
}
