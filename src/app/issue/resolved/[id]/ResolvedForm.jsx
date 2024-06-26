"use client";
import { arima, serif } from "@/app/element/fonts";
import { useAuthContext } from "@/context/AuthContext";
import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";

export default function ResolvedForm({ id, state }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      toast.remove();
      toast.error("Please Login to Continue");
      router.push("/google");
    }
  }, [user, router]);

  const admin_name = user?.displayName;
  const currDate = new Date().toLocaleString();

  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  let [info, setInfo] = useState({
    state: state,
    resolved_on: currDate,
    resolved_by: admin_name,
    resolve_image: file,
  });
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

  const handleIssue = async (e) => {
    e.preventDefault();
    if (info.state !== "pending") {
      if (!file) {
        toast.remove();
        toast.error("Please Upload the Resolve Photo of issue");
      } else {
        toast.loading("Uploading your Complaint!");
        let filename = file.name;
        let parts = filename.split(".");
        const storageRef = ref(
          storage,
          `/${admin_name}Resolve/${v4()}.${parts[1]}`
        );
        try {
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          setInfo((prevInfo) => ({
            ...prevInfo,
            resolve_image: url,
          }));
          let res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/resolve/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({ ...info, resolve_image: url }),
            }
          );
          if (!res.ok) {
            toast.remove();
            toast.error("Network Issue Occured! Please Refresh");
          }
          toast.remove();
          toast.success("Issue Resolved Successfully !");
          router.push(`/issue/${id}`);
        } catch (error) {
          console.log("Error in issue/resolve/[id]ResolvedForm : " + error);
        }
      }
    } else {
      toast.remove();
      toast.error("You didn`t Resolve the Issue !");
    }
  };

  if (user?.emailVerified) {
    return <div>Sorry! Only Admin Can Resolve a Issue</div>;
  }else if(state!=="pending"){
    return(
      <div className={`${arima.className} text-xl cursor-pointer h-[90vh] flex justify-center items-center text-white wallpaper1`}><p className="shadow-sm shadow-white px-5 py-2 hover:scale-105 transition-all">The Issue Is Already Resolved. You Can`t Edit That Now.</p></div>
    )
  }
   else {
    return (
      <div
        className={`flex pt-10 justify-center min-h-[90vh] wallpaper1 pb-28`}
      >
        <div className={`w-[80%] rounded-md py-8 px-2 flex flex-col items-center gap-5`}>
          <select
            className={`text-black text-lg ${arima.className} border p-3 rounded-md w-[80%] md:w-1/2 bg-white border-black`}
            value={info.state}
            onChange={(e) => {
              setInfo((prevInfo) => ({
                ...prevInfo,
                state: e.target.value,
              }));
            }}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>

          {info.state === "pending" ? null : (
            <div className={`w-full flex flex-col items-center gap-5`}>
              <input
                type="file"
                accept="image/* "
                onChange={handleChange}
                multiple="true"
                className={`border border-green-700 text-white border-dashed file:bg-white file:border-2 file:px-3 file:rounded-md file:border-dashed rounded-md w-[80%] md:w-1/2 px-2 py-3 ${
                  imageUpload
                    ? "border-double file:border-double"
                    : ""
                } ${arima.className}`}
              />
              {previewUrl != null && (
                <Image
                  src={previewUrl}
                  height={0}
                  width={350}
                  alt="image"
                  className={`object-contain shadow-md w-[80%] shadow-white rounded-md h-80`}
                />
              )}
            </div>
          )}
          <button
            onClick={handleIssue}
            className={`w-[80%] md:w-1/2 bg-green-700 border-white px-3 py-2 rounded-md hover:scale-105 transition-all text-white ${serif.className} uppercase`}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
