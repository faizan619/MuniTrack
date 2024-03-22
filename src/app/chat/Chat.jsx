"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../../../public/assets/delete1.png";
import Send from "../../../public/assets/send.png";
import Image from "next/image";
import { deleteMessage } from "./DeleteMessage";
import { serif,arima,kushan } from "../element/fonts"; 

export default function Chat() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const userName = auth.currentUser?.displayName;

  const submitData = async (e) => {
    e.preventDefault();
    if (msg) {
      setLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_CHAT_DOMAIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg,
          userName,
          timestamp: serverTimestamp(),
        }),
      });
      if (res) {
        toast.remove();
        toast.success("Message Sent!");
        setMsg("");
        setLoading(false);
      } else {
        toast.remove();
        toast.error("Network Issue. Please Refresh!");
        setLoading(false);
      }
    } else {
      toast.remove();
      toast.error("Enter Message!");
    }
  };

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[90vh] wallpaper1">
        Only Logined Users can view this page
      </div>
    );
  }
  return (
    <div className="h-[90vh] wallpaper1 p-1">
      <div className="h-[85%] md:h-full ">
        <div className="flex flex-col-reverse gap-3 h-full overflow-auto px-2">
          <form
            className="flex gap-2 md:mb-1 z-50 mb-14 pt-2 w-full fixed pr-10"
            onSubmit={submitData}
          >
            <input
              type="text"
              autoFocus
              placeholder="Enter Message... "
              className={`w-full px-2 text-lg border border-black py-3 ${arima.className} rounded-lg text-black`}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-5 text-white hover:bg-gray-800 hover:text-black uppercase bg-gray-700 rounded-lg transition-all ${serif.className}`}
            >
              <Image
                    src={Send}
                    height={40}
                    width={30}
                    alt="delete"
                    className="hover:scale-125 transition-all hover:text-white"
                    onClick={() => handleDeleteClick(key)}
                  />
            </button>
          </form>
          <Chatting msg={msg} />
        </div>
      </div>
    </div>
  );
}

const Chatting = ({ msg }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const userName = auth.currentUser?.displayName;
  const { user } = useAuthContext();
  const router = useRouter();

  const handleDeleteClick = (messageId) => {
    deleteMessage(messageId);
    toast.loading("Deleting... ");
    router.refresh("/chat");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_CHAT_DOMAIN, {
          cache: "no-cache",
        });
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError("Error Fetching the Chats.");
      }
    };
    fetchData();
  }, [msg]);

  if (error) return <div className="text-white">Error Fetching the Chats.</div>;
  if (!details)
    return (
      <div className="w-16 md:mb-16 mb-28 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    );
  return (
    <div className="flex flex-col gap-3 pt-2 pb-28 md:pb-16">
      {Object.entries(details).map(([key, chat], index) => (
        <div
          key={index}
          className={`flex ${
            chat.userName === userName ? "justify-end" : "justify-start"
          }`}
        >
          <div className=" flex flex-col max-w-[70%] text-gray-800  rounded-md overflow-hidden">
            <h1
              className={`text-sm bg-transparent items-center gap-5 justify-between ${
                chat.userName === userName ? "hidden" : "flex"
              }`}
            >
              <span className={`capitalize ${serif.className} border px-3 py-1 bg-white rounded-t-md`}>
                {chat.userName}
              </span>
              {user.emailVerified ? null : (
                <div className=" scale-105 px-2">
                  <Image
                    src={Delete}
                    height={30}
                    width={20}
                    alt="delete"
                    className="hover:scale-125 transition-all hover:text-white"
                    onClick={() => handleDeleteClick(key)}
                  />
                </div>
              )}
            </h1>
            <p
              className={`inline-block py-3 rounded-tr-lg rounded-b-lg text-lg px-2 ${
                chat.userName === userName
                  ? "bg-gray-700 text-white"
                  : "bg-white"
              }  p-1 ${arima.className}`}
            >
              {chat.msg}
            </p>
            <p
              className={`text-sm px-1 ${serif.className} flex px-1 py-2 text-gray-400 ${
                chat.userName === userName ? "justify-end" : ""
              }`}
            >
              {user.emailVerified
                ? new Date(chat.timestamp).toLocaleString("en-US", {
                  month:'long',
                  day:'numeric',
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12:true
                  })
                : (new Date(chat.timestamp).toLocaleString())}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
