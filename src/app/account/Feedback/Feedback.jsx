"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FeedbackPage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackMessage === "" || selectedEmoji === "") {
      return;
    } else {
      if (feedbackMessage === "") {
        toast.success("Please Enter Feedback message");
      } else {
        toast.remove();
        toast.success(selectedEmoji+"Form Submitted");
        setSelectedEmoji("");
        setFeedbackMessage("");
      }
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col pt-5 items-center gap-10">
      {/* <div className="p-5 h-full border border-black"> */}
      <div className="text-center">
        <h1 className="font-bold ">Feedback</h1>
        <p>
          We are glad to give your precious time in improving the functionality
          of the app
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-3/4">
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
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          placeholder="Your feedback or any improvement in the website !"
          rows={10}
          cols={30}
          className="border border-gray-600 rounded-md p-1 min-h-9"
        />
        <button type="submit">Submit</button>
      </form>
      {/* </div> */}
    </div>
  );
};

export default FeedbackPage;
