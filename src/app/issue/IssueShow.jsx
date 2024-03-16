"use client"

import IssueComp1 from "./IssueComp1";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CampComp from "./CampComp1";
import { useAuthContext } from "@/context/AuthContext";

export default  function HomePost() {
  const {user} = useAuthContext();

  const [data,setData] = useState(undefined)
  
  const getAllPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue`,
        {cache: "no-store",}
      );
      if (!response.ok) {throw new Error(`Fetching Error : Status :${response.status}`);}
      const raw_issue = await response.json();
      setData(raw_issue)
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      return { success: false, error };
    }
  };
  useEffect(()=>{
    getAllPost();
  },[data])

  const [camp,setCamp] = useState(undefined)
  const getAllDrive = async ()=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/campaign`,{
        cache:"no-store"
      });
      if (!response.ok) {throw new Error(`Fetching Error : Status :${response.status}`);}
      const raw_issue = await response.json();
      setCamp(raw_issue)
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      return { success: false, error };      
    }
  };

  useEffect(()=>{
    getAllDrive();
  },[camp])

  const [showIssue,SetShowIssue] = useState(true)
  const handleIssueView = ()=>{
    SetShowIssue(true);
    SetShowCamp(false);
  }
  
  const [showCamp,SetShowCamp] = useState(false)
  const handleCampView = ()=>{
    SetShowIssue(false);
    SetShowCamp(true);
  }

  return (
    <div className="pb-20 wallpaper1 min-h-[90vh]">
    <div className="flex justify-evenly py-5">
      <p className={`border text-xl px-5 py-2 rounded-md cursor-pointer hover:scale-105 ${showIssue?"bg-white":""} ${showIssue?"text-black":"text-white"}`}  onClick={handleIssueView}>Issue</p>
      <p className={`border text-xl px-5 py-2 rounded-md cursor-pointer hover:scale-105 ${showCamp?"bg-white ":""} ${showCamp?"text-black":"text-white"}`}  onClick={handleCampView}>Campaign</p>
    </div> 
    {user.emailVerified?(<p>{showIssue && <div className="text-white px-7">
            <p>Total Issue : [0]</p>
            <div>
                <p className="text-center text-lg">This is No Issue Available</p>
            </div>
        </div>}</p>):(
      <p>
    {showIssue &&  <IssueComp1 issues={data} />}
      </p>
    )}
    {showCamp &&  <CampComp camps={camp}/> }
    </div>
  );
}
