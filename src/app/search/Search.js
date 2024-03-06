"use client";

import { useEffect, useState } from "react";

export default function Search() {
  const [inp, setInp] = useState("");
  const [data,setData] = useState("");

  const [loading,setLoading] = useState(false)

  const getIssue = async ()=>{
    if(inp!==""){
      let response = await fetch(`${NEXT_PUBLIC_DOMAIN_URL}/backend/issue/${inp}`);
      response = await response.json();
      console.log("response :",response);
      setData(response);
    }
    else{
      setData([]);
    }
  }

  useEffect(()=>{
    if(inp!==""){
      getIssue();
    }
  },[inp]);

  return (
    <div className="h-[90vh] wallpaper text-white p-3 ">
      <input
        type="text"
        placeholder="Search Issue"
        className="text-black px-3 py-1 w-full rounded-md"
        value={inp}
        onChange={(e) => {
          setInp(e.target.value());
        }}
      />
      {!inp ? (
        <>
          <div>View Incharge</div>
          <div>View Solved Issues</div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}
