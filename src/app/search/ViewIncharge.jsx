"use client";
import React, { useState, useEffect } from "react";

const getPost = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/user`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Fetching Error : Status ${response.status}`);
    }

    let raw_users = await response.json();
    console.log("raw users : ", raw_users);
    return raw_users;
  } catch (error) {
    console.error("Fetching issue data failed:", error);
    return { success: false, error };
  }
};

export default function ViewIncharge() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
      const data = await getPost();
      setUsers(data);
      setIsLoading(false)
      console.log("data : ", data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
      {isLoading ? (
          <p>Loading...</p> 
        ) : users.length === 0 ? (
          <p>No Issue Available !</p>
        ) : (
          users.map((item) => (
            <div key={item._id}>
              <p>Name : {item.displayName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
