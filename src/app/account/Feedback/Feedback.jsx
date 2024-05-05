"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import { serif,arima } from "@/app/element/fonts";

const FeedbackPage = () => {
  const auth = getAuth();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const { user } = useAuthContext();
  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]); 

  let name = auth.currentUser?.displayName;
  let email = auth.currentUser?.email;

  const [done, setDone] = useState(false);
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") {
      toast.error("Please Fill the Feedback form");
    } else if (selectedEmoji === "") {
      toast.error("Rate us by Selecting the Emoji");
    } else {
      try {
        setLoading(true);
        let feedback_i = await fetch( 
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message,
              selectedEmoji,
              email,
              name,
            }),
          }
        );
        if (!feedback_i.ok) {
          throw new Error("Server Error");
        }
        feedback_i = await feedback_i.json();
        if (feedback_i.success) {
          toast.remove();
          toast.success("Thanks For your Feedback !");
          confetti({
            particleCount: 600,
            spread: 300,
            origin: { y: 0.6 },
            duration: 8000,
          });
          setSelectedEmoji("");
          setMessage("");
          setDone(true);
          setLoading(false)
        }
        else{
          toast.remove();
          toast.error("Server issue. Please Refresh!");
          setLoading(false)
        }
      } catch (err) {
        toast.remove();
        toast.error("Currently Cannot Post the feedback. Sorry for inconvinience! ")
        setLoading(false)
      }
    }
  };

  return (
    <div className="min-h-[90vh] text-white flex img6 flex-col pt-5 items-center gap-10 selection:bg-green-950 selection:text-white ">
      <div className="text-center">
        <h1 className={`${serif.className} text-xl`}>Feedback</h1>
        <p className={`${arima.className}`}>
          We are glad to give your precious time in improving the functionality
          of the app
        </p>
      </div>
      {done ? (
        <div className="h-[30vh] px-32 flex flex-col gap-5 justify-center items-center rounded-md bg-green-400 shadow-md shadow-black text-xl">
          <p>
            Thanks For Your Feedback.We Appriciate your Time in Improving the
            MuniTrack
          </p>
          <button
            className="px-3 py-1 hover:scale-110 transition-all bg-gray-700 text-white rounded-md"
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-3/4">
          <div className="flex gap-5 justify-center">
            <button
              className={`hover:scale-125 bg-gray-300 p-1 rounded-md transition-all text-4xl ${
                selectedEmoji === "good" ? "scale-125" : "bg-transparent"
              }`}
              onClick={() => setSelectedEmoji("good")}
            >
              😀
            </button>
            <button
              className={`hover:scale-125 bg-gray-300 p-1 rounded-md transition-all text-4xl ${
                selectedEmoji === "like it" ? "scale-125" : "bg-transparent"
              }`}
              onClick={() => setSelectedEmoji("like it")}
            >
              😦
            </button>
            <button
              className={`hover:scale-125 bg-gray-300 p-1 rounded-md transition-all text-4xl ${
                selectedEmoji === "neutral" ? "scale-125" : "bg-transparent"
              }`}
              onClick={() => setSelectedEmoji("neutral")}
            >
              😐
            </button>
            <button
              className={`hover:scale-125 bg-gray-300 p-1 rounded-md transition-all text-4xl ${
                selectedEmoji === "need improvement"
                  ? "scale-125"
                  : "bg-transparent"
              }`}
              onClick={() => setSelectedEmoji("need improvement")}
            >
              🙁
            </button>
            <button
              className={`hover:scale-125 bg-gray-300 p-1 rounded-md transition-all text-4xl ${
                selectedEmoji === "bad" ? "scale-125" : "bg-transparent"
              }`}
              onClick={() => setSelectedEmoji("bad")}
            >
              😩
            </button>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your feedback or any improvement in the website !"
            rows={10}
            cols={30}
            className={`border border-gray-600 ${arima.className} rounded-md p-1 min-h-9 text-black`}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`border border-gray-600 py-1 rounded-md hover:bg-gray-600 hover:text-white transition-all ${serif.className}`}
          >
            {loading?"Loading...":"Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
