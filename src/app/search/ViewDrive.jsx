"use client"

import { useEffect, useState } from "react";

export default function ViewDrive() {
    const [drives, setDrives] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
  return (
    // <div>
      <div className="flex justify-start flex-wrap w-full">
        {isLoading ? (
          <p>Loading ...</p>
        ) : drives === undefined ? (
          <p className="text-white">No Incharge Available</p>
        ) : drives.length === 0 ? (
          <p>No Issue Found!</p>
        ) : (
          <div className="w-full">
            <p>Drives Available : [ {drives.length} ]</p>
            <div className="w-full">
              {drives.map((item) => (
                <div key={item._id} className="flex flex-wrap mr-5 gap-5 my-3">
                  <div className="bg-white text-black px-5 py-2 rounded-md capitalize w-full">
                    <h1>{item.drive_title}</h1>
                    <p>Will Held On : {item.drive_on} at {item.drive_time}</p>
                    <p>Location : {item.drive_location}</p>
                    <a href={`${item.drive_link}`}>WhatsApp Group : {item.drive_link}</a>
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
