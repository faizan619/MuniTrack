"use client";

import IssueComp1 from "./IssueComp1";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CampComp from "./CampComp1";
import { useAuthContext } from "@/context/AuthContext";
import { arima } from "../element/fonts";
import InComp from "./InComp";
import NotAuth from "../element/NotAuth";

export default function HomePost() {
  const { user } = useAuthContext();
  const [data, setData] = useState(undefined);
  const [camp, setCamp] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [showIssue, SetShowIssue] = useState(true);
  const [showCamp, SetShowCamp] = useState(false);
  const [showIn, setIn] = useState(false);


  if (!user) {
    return <NotAuth name={"Chat Room"} />;
  }

  const getAllPost = async () => {
    toast.remove();
    toast.loading("Loading the Issue");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`Fetching Error : Status :${response.status}`);
      }
      const raw_issue = await response.json();
      setData(raw_issue);
      toast.remove();
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      toast.error("Some Problem Occus While Fetching! Please Refresh.");
      return { success: false, error };
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);
  
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
  const getPost = async () => {
    toast.remove();
    toast.loading("Loading the Admin.");
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
      toast.remove();
    } catch (error) {
      console.error("Fetching issue data failed:", error);
      toast.remove();
      toast.error("Some Problem Occus While Fetching! Please Refresh.");
      return { success: false, error };
    }
  };
  const handleIssueView = () => {
    SetShowIssue(true);
    SetShowCamp(false);
    setIn(false);
    getAllPost();
  };
  const handleCampView = () => {
    SetShowIssue(false);
    SetShowCamp(true);
    setIn(false);
    getAllDrive();
  };
  const handleInCharge = () => {
    SetShowCamp(false);
    SetShowIssue(false);
    setIn(true);
    getPost();
  };
  

  return (
    <div className="pb-20 wallpaper1 min-h-[90vh]">
      <div className={`flex justify-evenly py-5 ${arima.className}`}>
        <p
          className={`border text-xl px-2 sm:px-5 py-2 rounded-md cursor-pointer hover:scale-105 ${
            showIssue ? "bg-white" : ""
          } ${showIssue ? "text-black" : "text-white"}`}
          onClick={handleIssueView}
        >
          Issue
        </p>
        <p
          className={`border text-xl px-2 sm:px-5 py-2 rounded-md cursor-pointer hover:scale-105 ${
            showCamp ? "bg-white " : ""
          } ${showCamp ? "text-black" : "text-white"}`}
          onClick={handleCampView}
        >
          Campaign
        </p>
        <p
          className={`border text-xl px-2 sm:px-5 py-2 rounded-md cursor-pointer hover:scale-105 ${
            showIn ? "bg-white " : ""
          } ${showIn ? "text-black" : "text-white"}`}
          onClick={handleInCharge}
        >
          Admin
        </p>
      </div>
      {showIssue && <IssueComp1 issues={data} />}
      {showCamp && <CampComp camps={camp} />}
      {showIn && <InComp users={users} />}
    </div>
  );
}
