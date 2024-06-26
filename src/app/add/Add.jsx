"use client";

import { v4 } from "uuid";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Add() {
  const auth = getAuth();
  const router = useRouter();

  const [file, setFile] = useState("");
  const [imgLink, setimgLink] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  let u_name = auth.currentUser.displayName;
  let u_email = auth.currentUser.email;

  let [data, setData] = useState({
    issue_image_url: "",
    issue_title: "",
    issue_describe: "",
    issue_location: "",
    issue_manual_location: "",
    issue_user_name: u_name,
    issue_user_email: u_email,
  });

  const [imageUpload, setImageUpload] = useState(false);
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInBytes > 5 * 1024 * 1024) {
        toast.remove();
        toast.error(
          `Cannot Upload File greater than 5mb. Your file size is: ${fileSizeInMB.toFixed(
            2
          )} MB`
        );
        e.target.value = "";
        setPreviewUrl(null);
        setImageUpload(false);
      } else {
        toast.remove();
        toast.success(`File added Successfully!!`);
        const url = URL.createObjectURL(file);
        setFile(file);
        setPreviewUrl(url);
        setImageUpload(true);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const [location, setLocation] = useState({ name: "", lat: "", lng: "" });

  const identifyLocation = async (e) => {
    e.preventDefault();
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
      );
      const data = await response.json();
      // const location = data.locality + "," + data.city;
      const location =
        data.localityInfo.administrative[
          data.localityInfo.administrative.length - 1
        ].name;
      setLocation({
        name: location,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setData((prevInfo) => ({ ...prevInfo, issue_location: location }));
      var map = L.map("mapid").setView(
        // [position.coords.latitude, position.coords.longitude],
        [location.lat, location.lng],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );
      L.marker([location.lat, location.lng])
        .addTo(map)
        // .bindPopup(
        //   `Latitude: ${position.coords.latitude},Longitude: ${position.coords.longitude}`
        // )
        .bindPopup(
          `Latitude: ${location.lat},Longitude: ${location.lng}`
        )
        .openPopup();
    } catch (err) {
      console.error(err.message);
    }
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please Upload the Image!");
    } else if (!data.issue_title || !data.issue_describe) {
      toast.remove();
      toast.error("Please Enter all the Credentials!");
    } else if (!data.issue_location) {
      toast.remove();
      toast.error("Please Give the Location Permission");
    } else {
      setLoading(true);
      toast.loading("Uploading your Complaint!");
      let filename = file.name;
      let parts = filename.split(".");
      const storageRef = ref(storage, `/munitrack/${v4()}.${parts[1]}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setimgLink(url);
        setData((prevInfo) => ({ ...prevInfo, issue_image_url: url }));
        let issue_info = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, issue_image_url: url }),
          }
        );
        if (!issue_info.ok) {
          throw new Error("Please Describe the Issue in Brief !");
        }
        issue_info = await issue_info.json();
        if (issue_info.success) {
          toast.remove();
          toast.success("Form Sent for confirmation from Admin");
          setPreviewUrl(null);
          setImageUpload(false);
          setData({
            issue_image_url: "",
            issue_title: "",
            issue_describe: "",
            issue_location: "",
            issue_manual_location: "",
          });
          router.refresh("/issue");
          setTimeout(() => {
            router.push("/issue");
          }, 500);
        } else {
          toast.remove();
          toast.error("Server Issue . Please Refresh!");
        }
        setLoading(false);
      } catch (error) {
        toast.remove();
        // toast.error(`Error : Give Location permission`);
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  // const resetButton = () => {
  //   if (
  //     previewUrl ||
  //     data.issue_image_url ||
  //     data.issue_describe ||
  //     data.issue_title
  //   ) {
  //     setPreviewUrl(null);
  //     setImageUpload(false);
  //     setLoading("");
  //     setLocation({
  //       name: "",
  //     });
  //     setData({
  //       issue_title: "",
  //       issue_describe: "",
  //       issue_location: "",
  //     });
  //     toast.remove();
  //     toast.success("Data Successfully Cleared!");
  //   } else {
  //     toast.success("Data is Already Empty!");
  //   }
  // };

  const [inpFile, SetinpFile] = useState(true);
  const [inpLocation, SetinpLocation] = useState(false);
  const [inpIssue, SetinpIssue] = useState(false);

  const showFile = () => {
    SetinpFile(true);
    SetinpIssue(false);
    SetinpLocation(false);
  };
  const showLocation = (e) => {
    e.preventDefault();
    if (!file) {
      toast.remove();
      toast.error("Please Upload the Image of the Issue!");
    } else {
      SetinpFile(false);
      SetinpLocation(true);
      SetinpIssue(false);
    }
  };
  const showIssue = (e) => {
    e.preventDefault();
    if (!data.issue_location) {
      toast.error("Please Allow us to get the location!");
    } else {
      SetinpIssue(true);
      SetinpFile(false);
      SetinpLocation(false);
    }
  };

  return (
    <div className="h-[90vh] wallpaper1 flex flex-col text-white overflow-auto text-center">
      <div className="h-full pt-5 ">
        <form className="flex flex-col gap-5  justify-center pb-20 px-5 md:px-20 lg:px-36">
          {inpFile ? (
            <>
              <div className="flex flex-col gap-5">
                <input
                  type="file"
                  accept="image/* "
                  onChange={handleChange}
                  multiple="true"
                  className={`text-white border border-dashed rounded-md p-2 ${
                    imageUpload
                      ? "file:bg-gray-600 file:text-white file:px-2"
                      : "bg-gray-700"
                  } `}
                />
                {previewUrl != null && (
                  <Image
                    src={previewUrl}
                    height={0}
                    width={350}
                    alt="image"
                    className={`self-center rounded-md  bg-red-700  `}
                  />
                )}
              </div>

              {imageUpload ? (
                <>
                  <label>
                    <p className="text-left">Name:</p>
                    <input
                      type="text"
                      required
                      placeholder="Issuer Name"
                      readOnly
                      value={auth.currentUser.displayName}
                      className="p-2 rounded-md text-black selection:bg-transparent w-full hover:cursor-not-allowed"
                    />
                  </label>
                  <label>
                    <p className="text-left">Email:</p>

                    <input
                      type="text"
                      required
                      placeholder="Issuer Email"
                      value={auth.currentUser.email}
                      readOnly
                      className="text-black p-2 rounded-md selection:bg-transparent w-full  hover:cursor-not-allowed"
                    />
                  </label>
                  <p className="text-red-700 text-sm italic">
                    Name and Email are auto generated according to your login
                    credentials and it cannot be modified
                  </p>
                </>
              ) : null}
              <button
                onClick={showLocation}
                className="border bg-green-700 text-center hover:bg-green-800 py-2 flex-1 rounded-md cursor-pointer"
              >
                Next
              </button>
            </>
          ) : null}

          {inpLocation ? (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={location.name}
                  readOnly
                  placeholder="Click the Button"
                  className={`text-black p-2 w-full rounded-md flex-1 ${
                    location.name ? "block" : "hidden"
                  }`}
                />
                <button
                  onClick={identifyLocation}
                  className={`p-2 flex-1 rounded-md border bg-green-700 ${
                    location.name ? "hidden" : "block"
                  } `}
                >
                  Get Location
                </button>
              </div>
              {/* <p>{location.lng}</p> */}
              {data.issue_location ? (
                <>
                  <div id="mapid" className="h-[300px]"></div>
                  <label>
                    <input
                      type="text"
                      placeholder="Enter Loction Manually (Optional)"
                      className="text-black p-2 rounded-md w-full"
                      value={data.issue_manual_location}
                      onChange={(e) => {
                        setData((prevInfo) => ({
                          ...prevInfo,
                          issue_manual_location: e.target.value,
                        }));
                      }}
                    />
                    <span className="text-red-600 text-sm float-left italic">
                      If the location is not correct then you can type for
                      manual location
                    </span>
                  </label>
                </>
              ) : null}

              <div className="flex gap-3 sm:gap-7 lg:gap-10">
                <button
                  onClick={showFile}
                  className="border bg-red-700 hover:bg-red-800 py-2 flex-1 rounded-md cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={showIssue}
                  className="border bg-green-700 hover:bg-green-800 py-2 flex-1 rounded-md cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          ) : null}

          {inpIssue ? (
            <>
              <label>
                <p className="text-left">Enter Issue Title</p>
                <input
                  type="text"
                  required
                  placeholder="Issue Title"
                  value={data.issue_title}
                  onChange={(e) => {
                    setData((prevInfo) => ({
                      ...prevInfo,
                      issue_title: e.target.value,
                    }));
                  }}
                  className="text-black p-2 rounded-md w-full"
                />
              </label>
              <label>
                <p className="text-left">Description Your Issue</p>
                <textarea
                  type="text"
                  required
                  placeholder="Describe Issue"
                  cols={0}
                  rows={10}
                  value={data.issue_describe}
                  onChange={(e) => {
                    setData((prevInfo) => ({
                      ...prevInfo,
                      issue_describe: e.target.value,
                    }));
                  }}
                  className="text-black p-2 rounded-md min-h-10 w-full"
                />
              </label>
              <div className="flex gap-3 sm:gap-7 lg:gap-10">
                <button
                  onClick={showLocation}
                  className="border bg-red-700 hover:bg-red-800 py-2 flex-1 rounded-md cursor-pointer"
                >
                  Back
                </button>
                <input
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="border bg-green-700 hover:bg-green-800 py-2 flex-1 rounded-md cursor-pointer"
                  value={loading ? "Uploading..." : "Submit"}
                />
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}
