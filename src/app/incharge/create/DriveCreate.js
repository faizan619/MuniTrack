"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
export default function DriveCreate() {
  const { user } = useAuthContext();
  let name = user?.displayName;
  const [data, setData] = useState({
    drive_host_name: name,
    drive_title: "",
    drive_describe: "",
    drive_location: "",
    drive_time: "",
    drive_on: "",
    drive_link: "",
  });

  const handleSubmit = async () => {
    if (
      data.drive_title ||
      data.drive_describe ||
      data.drive_location ||
      data.drive_time ||
      data.drive_on ||
      data.drive_link
    ) {
      try {
        let drive_info = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/campaign`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!drive_info.ok) {
          throw new Error("Server Error !");
        }
        drive_info = await drive_info.json();
        if (drive_info.success) {
          toast.remove();
          toast.success("Form Submitted Successfully !");
          setData({
            drive_title: "",
            drive_describe: "",
            drive_location: "",
            drive_link: "",
            drive_time: "",
            drive_on: "",
          });
        } else {
          toast.remove();
          toast.error("Can't Post the Data ! Please Refresh the Page .");
        }
      } catch (error) {
        toast.remove();
        toast.error("Sever Error ! please Refresh .");
      }
    } else {
      toast.remove();
      toast.error("Enter all the credentials !");
    }
  };

  return (
    <div className="min-h-[90vh] wallpaper1 text-white flex flex-col items-center gap-5 py-3">
      <div className="text-center">
        <h1 className="text-xl uppercase font-bold mb-1">Welcome {name} sir</h1>
        <p>Create a Drive towards making the earth a better place to life.</p>
        {/* {JSON.stringify(data)} */}
      </div>
      <div className="border mb-20 w-3/4 p-5 rounded-md flex flex-col gap-3">
        <label>
          <p>Enter Title</p>
          <input
            type="text"
            placeholder="Clearning Drive"
            className="text-black w-full"
            value={data.drive_title}
            onChange={(e) => {
              setData((prevInfo) => ({
                ...prevInfo,
                drive_title: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          <p>Enter Description</p>
          <textarea
            type="text"
            placeholder="To keep the Earth Water clean and save aquatic life"
            className="text-black w-full"
            rows={5}
            value={data.drive_describe}
            onChange={(e) => {
              setData((prevInfo) => ({
                ...prevInfo,
                drive_describe: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          <p>Enter Location</p>
          <input
            type="text"
            placeholder="Juhu Beach"
            className="text-black w-full"
            value={data.drive_location}
            onChange={(e) => {
              setData((prevInfo) => ({
                ...prevInfo,
                drive_location: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          <p>Enter Time</p>
          <input
            type="time"
            placeholder="start at 7:00 pm"
            className="text-black w-full"
            value={data.drive_time}
            onChange={(e) => {
              setData((prevInfo) => ({
                ...prevInfo,
                drive_time: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          <p>Enter Date</p>
          <input
            type="date"
            placeholder="18 june 2002"
            className="text-black w-full"
            value={data.drive_on}
            min={new Date().toISOString().split("T")[0]} 
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() + 3))
                .toISOString()
                .split("T")[0]
            } 
            onChange={(e) => {
              const enteredDate = new Date(e.target.value);
              const today = new Date();
              const maxDate = new Date(
                new Date().setFullYear(new Date().getFullYear() + 3)
              );
              if (enteredDate > maxDate) {
                setData((prevInfo) => ({
                  ...prevInfo,
                  drive_on: maxDate.toISOString().split("T")[0],
                }));
              } else if (enteredDate < today) {
                setData((prevInfo) => ({
                  ...prevInfo,
                  drive_on: today.toISOString().split("T")[0],
                }));
              } else {
                setData((prevInfo) => ({
                  ...prevInfo,
                  drive_on: e.target.value,
                }));
              }
            }}
          />
        </label>
        <label>
          <p>Enter Whatsaap Link</p>
          <input
            type="text"
            placeholder="Juhu Beach"
            className="text-black w-full"
            value={data.drive_link}
            onChange={(e) => {
              setData((prevInfo) => ({
                ...prevInfo,
                drive_link: e.target.value,
              }));
            }}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
