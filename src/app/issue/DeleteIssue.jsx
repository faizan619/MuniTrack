"use client";
import { storage } from "@/firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteIssue({ dltItem }) {
  const [loading, setLoading] = useState(false);
  let removePost = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the Post?"
    );
    if (!confirmed) return;
    toast.loading("Deleting The Issue !");
    const imageUrl = dltItem?.issue_image_url;
    if (imageUrl) {
      setLoading(true);
      const regex = /(?<=o\/)[^?]+/;
      const match = imageUrl.match(regex);
      const imagePath = match ? match[0] : null;
      const decodedFilename = decodeURIComponent(imagePath);
      if (imagePath) {
        const imageRef = ref(storage, decodedFilename);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/id/${dltItem._id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            toast.remove();
            toast.success("Issue is Deleted Successfully !");
            try{
                await deleteObject(imageRef)
                toast.success("Image Deleted form storage")
            }
            catch(error){toast.remove();toast.error("Failed to Delete from storage !")}
            setLoading(false);
          } else {
            toast.remove();
            toast.error("Failed to delete data");
            setLoading(false);
          }
        } catch (error) {
          toast.remove();
          toast.error("Failed to delete data");
          console.error(error);
          setLoading(false);
        }
      } else {
        toast.remove();
        toast.error("No Image Path Found");
      }
    } else {
      toast.remove();
      toast.error("No Image Url Found");
    }
  };
  return (
    <button className="bg-red-700 px-3 py-2 rounded-md hover:scale-105 hover:bg-red-800 text-white" onClick={removePost} disabled={loading} >
      {loading?"Deleting":"Delete"}
    </button>
  );
}
