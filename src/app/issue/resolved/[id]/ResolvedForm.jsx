"use client";
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
  } else {
    return (
      <div className="flex flex-col justify-center items-center gap-5 min-h-[90vh] wallpaper1 text-white">
        <h1>Resolve Page</h1>
        <select
          className="text-black"
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
          <div>
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
        )}
        <button
          onClick={handleIssue}
          className="border border-black px-3 py-1 rounded-md hover:scale-105"
        >
          Submit
        </button>
        {JSON.stringify(info)}
      </div>
    );
  }
}
