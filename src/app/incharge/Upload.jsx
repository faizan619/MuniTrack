"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { arima, serif } from "../element/fonts";
import Link from "next/link";
import { RWebShare } from "react-web-share";

export default function Upload() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]);

  const handlecreate = () => {
    router.push("/incharge/create");
  };

  const [camps, setCamp] = useState(undefined);
  const getAllDrive = async () => {
    toast.remove();
    toast.loading("Loading the Campaigns");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/campaign`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`Fetching Error : Status :${response.status}`);
      }
      const raw_issue = await response.json();
      setCamp(raw_issue);
      toast.remove();
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      toast.error("Some Problem Occus While Fetching! Please Refresh.");
      return { success: false, error };
    }
  };

  useEffect(() => {
    getAllDrive();
  }, []);

  if (!user) {
    return <div>Only Logined Users can view this page</div>;
  } else if (user?.emailVerified) {
    return (
      <div className="h-[90vh] w-full flex justify-center wallpaper1 items-center">
        <p
          className="border border-white p-5 rounded-md hover:scale-125 transition-all text-white"
          id="nahi"
        >
          Member`s Can`t Access this Page
        </p>
      </div>
    );
  } else {
    return (
      <div className="min-h-[90vh] wallpaper1 text-white py-3 px-2">
        <div className="flex flex-wrap gap-5 sm:p-3">
          <button
            className="uppercase bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 hover:bg-gradient-to-t px-5 wallpaper3 w-full sm:w-[25rem] shadow-md shadow-gray-600 py-3 rounded-md transition-all min-h-20 hover:scale-105"
            onClick={handlecreate}
          >
            Host a Campaign
          </button>
          {camps === undefined ? (
            <p className="text-white">Loading Campaign.</p>
          ) : camps.length === 0 ? (
            <p>No Campaign Found!</p>
          ) : (
            camps.map((item) => (
              <div
                key={item._id}
                className="flex shadow-md text-black shadow-gray-600 justify-center gap-5 px-2 bg-gray-100 rounded-md items-center sm:w-[25rem] "
              >
                <div className="py-5 px-1">
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
                    </div>
                    <p className={`pb-3`}>
                      Place :{" "}
                      <span className={`capitalize`}>
                        {item.drive_location}
                      </span>
                    </p>
                    <p className="text-sm capitalize">
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
            ))
          )}
        </div>
      </div>
    );
  }
}
