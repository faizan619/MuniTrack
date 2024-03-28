"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serif, arima } from "../fonts";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { RWebShare } from "react-web-share";

export default function ViewDrive() {
  const [drives, setDrives] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  const getCampaign = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/campaign`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`Fetching Error : Status ${response.status}`);
      }

      let raw_camp = await response.json();
      //     return raw_users;
      setDrives(raw_camp);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      return { success: false, error };
    }
  };
  useEffect(() => {
    getCampaign();
  }, [drives]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.remove();
        toast.success("Campaign Deleted Successfully !");
      } else {
        toast.remove();
        toast.error("Failed to Delete the Campaign");
      }
    } catch (error) {
      toast.remove();
      toast.error("Error : ", error.message);
      console.error(error);
    }
  };
  return (
    // <div>
    <div className="flex justify-start flex-wrap w-full">
      {isLoading ? (
        <p>Loading ...</p>
      ) : drives === undefined ? (
        <p className="text-white">Fetching Campaign...</p>
      ) : drives.length === 0 ? (
        <p>No Campaign Found!</p>
      ) : (
        <div className="w-full">
          <p className={`${serif.className} pb-5`}>
            Drives Found : [ {drives.length} ]
          </p>
          <div className="w-full flex gap-3 ">
            {drives.map((item) => (
              <div
                key={item._id}
                className="flex shadow-md text-black shadow-gray-600 justify-center gap-5 px-2 bg-gray-100 rounded-md items-center w-[30rem]"
              >
                <div className="bg-gray-900 hidden rounded-md border h-48 sm:flex items-center justify-center uppercase ml-3 w-[35%]">
                  <p className={`px-20  text-white text-xl ${serif.className}`}>
                    {item.drive_host_name}
                  </p>
                </div>
                <div className="py-5 px-1 sm:px-3 sm:w-3/4">
                  <div className="p-2">
                    <div className="py-2 flex flex-col gap-2">
                      <p className="italic text-sm">
                        <span className={``}>
                          {(() => {
                            const date = new Date(item.drive_on);
                            const monthNames = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];
                            const monthName = monthNames[date.getMonth()];
                            const day = date.getDate();

                            function convertTo12HourFormat(time24) {
                              const [hour, minute] = time24
                                .split(":")
                                .map(Number);
                              let period = "AM";
                              let hour12 = hour;
                              if (hour >= 12) {
                                period = "PM";
                                if (hour > 12) {
                                  hour12 = hour - 12;
                                }
                              }
                              if (hour12 === 0) {
                                hour12 = 12;
                              }
                              return `${hour12
                                .toString()
                                .padStart(2, "0")}:${minute
                                .toString()
                                .padStart(2, "0")} ${period}`;
                            }

                            const time = convertTo12HourFormat(item.drive_time);
                            return `${day} ${monthName} at ${time}`;
                          })()}
                        </span>
                      </p>
                      <p
                        className={`relative uppercase inline text-xl font-bold transition-all cursor-pointer before:bg-gray-500  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100`}
                      >
                        {item.drive_title}
                      </p>
                      <p
                        className={`${arima.className} select-none text-sm max-h-[4.5rem] overflow-hidden capitalize`}
                      >
                        {item.drive_describe}
                      </p>
                    </div>
                    <p className={``}>
                      Place :{" "}
                      <span className={`capitalize`}>
                        {item.drive_location}
                      </span>
                    </p>
                    <p className="text-sm capitalize sm:hidden">
                      InCharge : {item.drive_host_name}
                    </p>
                    <div
                      className={`flex py-2 gap-2 ${arima.className} justify-between`}
                    >
                      <Link
                        href={item.drive_link}
                        target="_faizan"
                        className=" hover:scale-105 transition-all px-6 py-2 border bg-black text-white rounded-md"
                      >
                        Join
                      </Link>
                      {user.emailVerified ? (
                        <>
                          <RWebShare
                            data={{
                              text: `Hello! MuniTrack has Organized a ${item.drive_title} at ${item.drive_location}. Wanna Join Us? Here is the Group link`,
                              url: `${item.drive_link}`,
                              title: `Let's Together Make the Earth A Better Place to Live :)`,
                            }}
                          >
                            <button
                              className={`relative hover:scale-105 transition-all  uppercase flex items-center ${serif.className} transition-all cursor-pointer before:bg-gray-500  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100`}
                            >
                              Share
                            </button>
                          </RWebShare>
                        </>
                      ) : (
                        <>
                          <button
                            className=" hover:scale-105 transition-all px-6 py-2 border bg-red-600 text-white rounded-md"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    // </div>
  );
}
