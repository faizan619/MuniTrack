"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Chat() {
  const { user } = useAuthContext();
  const router = useRouter(); 
  const auth = getAuth(); 
  const [msg,setMsg] = useState("");  

  const userName = auth.currentUser?.displayName;

  const submitData = async (e)=>{
    e.preventDefault();
    if(msg){
      const res = await fetch("https://munitrack-1-default-rtdb.firebaseio.com/chat.json",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          msg,
          userName,
          timestamp:serverTimestamp()
        }),
      });
      if(res){
        toast.remove();
        toast.success("Message Sent!");
        setMsg("");
      }
      else{
        toast.remove();
        toast.error("Network Issue. Please Refresh!")
      }
    }
    else{
      toast.remove();
      toast.error("Enter Message!")
    }
  }

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]); 

  if (!user) {
    return <div>Only Logined Users can view this page</div>;
  }
  return (
    <div className="h-[91.5vh] wallpaper p-1">
      <div className="h-[85%] md:h-full ">
        <div className="flex flex-col-reverse gap-3 h-full overflow-auto px-2">
        <form className="flex gap-2 pt-2 w-full" onSubmit={submitData}>
          <input
            type="text"
            autoFocus
            placeholder="Enter Message... "
            className="w-full px-2 py-1 text-lg rounded-md text-black"
            value={msg}
            onChange={(e)=>setMsg(e.target.value)}
          />
          <button type="submit" className="border px-5 text-white hover:bg-white hover:text-black bg-green-900">
            Sent
          </button>
        </form>
          <Chatting msg={msg} />
        </div>
      </div>
    </div>
  );
}


const Chatting = ({msg})=>{
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth(); 
  const userName = auth.currentUser?.displayName;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://munitrack-1-default-rtdb.firebaseio.com/chat.json",
          { cache: "no-cache" }
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError("Error Fetching the Chats.");
      }
    };
    fetchData();
    console.log("fetching...")
  },[msg]);

  if (error) return <div>Error Fetching the Chats.</div>;
  if (!details) return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>;
  return(
    <div className="flex flex-col gap-3">
      {Object.values(details).map((chat, index) => (
        <div key={index} className={`flex ${chat.userName === userName?"justify-end":"justify-start"}`}>
          <div className="border flex flex-col max-w-[70%] text-gray-800 bg-white rounded-md overflow-hidden">
            <h1 className="text-sm inline-block bg-gray-300 p-1 cursor-pointer hover:underline">
              {chat.userName}
            </h1>
            <p className={`inline-block text-lg ${chat.userName === userName?"bg-white":"bg-gray-700 text-white"}  p-1`}>{chat.msg}</p>
            <p className="text-sm text-gray-500">{new Date(chat.timestamp).toLocaleString()}</p> {/* Display the timestamp */}
          </div>
        </div>
      ))}
    </div>
  )
}