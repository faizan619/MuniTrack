"use client";
import toast from "react-hot-toast";
import { arima, serif } from "../element/fonts";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { RWebShare } from "react-web-share";

export default function CampComp({ camps }) {
  const { user } = useAuthContext();
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
    <div className="">
      <p className="text-white text-xl pl-7">
        Total Campaigns : [{camps?.length}]
      </p>
      <div className="flex gap-5 flex-wrap p-3 justify-evenly">
        {camps === undefined ? (
          <div className={`text-white ${serif.className} text-xl`}>
            <div className="w-16 mb-12  border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            <p>Loading...</p>
          </div>
        ) : camps.length === 0 ? (
          <p className={`text-white ${serif.className}`}>No Campaign Found!</p>
        ) : (
          camps.map((item) => (
            <div
              key={item._id}
              className="flex shadow-md shadow-gray-600 justify-center gap-5 px-2 bg-gray-100 rounded-md items-center w-[30rem]"
            >
              <div className="bg-gray-900 hidden rounded-md text-white h-3/5 sm:flex items-center justify-center uppercase ml-3 w-[35%]">
                <p className={`px-20 absolute text-xl ${serif.className}`}>
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
                    <span className={`capitalize`}>{item.drive_location}</span>
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
                        {/* <button className=" hover:scale-105 transition-all px-6 py-2 border bg-green-600 text-white rounded-md">
                          Edit
                        </button> */}
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
