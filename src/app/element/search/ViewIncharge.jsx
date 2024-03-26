"use client";
import React, { useState, useEffect } from "react";

export default function ViewIncharge() {

  const [users, setUsers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const getPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/user`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`Fetching Error : Status ${response.status}`);
      }

      let raw_users = await response.json();
      setUsers(raw_users);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      return { success: false, error };
    }
  };
  useEffect(() => {
    getPost();
  }, [users]);

  return (
    <div>
      <div className="flex justify-start flex-wrap">
        {isLoading ? (
          <p>Loading ...</p>
        ) : users === undefined ? (
          <p className="text-white">No Incharge Available</p>
        ) : users.length === 0 ? (
          <p>No Issue Found!</p>
        ) : (
          <div>
            <p>Incharge Available : [ {users.length} ]</p>
            <div className="flex flex-wrap gap-3">
              {users.map((item) => (
                <div key={item._id} className="flex flex-wrap mr-5 gap-5 my-3">
                  <div className="border flex items-center gap-3 p-3 rounded-md bg-white text-black">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.displayName
                      )}&size=35&rounded=true&background=black&color=fff&uppercase=false`}
                      alt={item.displayName}
                    />
                    <p className="text-xl uppercase font-extrabold">
                      {item.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
