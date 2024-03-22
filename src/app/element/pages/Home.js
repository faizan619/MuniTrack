"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Img1 from "../../../../public/assets/img7.jpg";
import { serif, arima, kushan, rye, car } from "../fonts";
export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) {
    return (
      <div className="wallpaper1 h-[90vh] text-white flex justify-center items-center text-center ">
        <div className="flex flex-col gap-6 p-7 rounded-md">
          <div>
            <h1 className={`text-4xl ${kushan.className} font-bold`}>
              Welcome to MuniTrack
            </h1>
            <p className={`capitalize text-md ${arima.className}`}>
              (Municipal grievance Tracker)
            </p>
          </div>
          <p className="italic text-sm">
            You need to{" "}
            <span
              className={`text-red-600 uppercase font-bold ${kushan.className} text-md`}
            >
              Login
            </span>{" "}
            to Continue Using the app
          </p>
          <button
            className={`uppercase text-lg border py-1 rounded-lg bg-red-600 border-none hover:scale-105 ${kushan.className} transition-all`}
            onClick={() => {
              router.push("/google");
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="flex relative justify-center items-center h-[90vh] px-3 sm:px-10 text-white overflow-hidden">
        <Image
          src={Img1}
          alt="bg image"
          loading="eager"
          className="absolute z-0 brightness-50 w-screen h-screen"
        />
        <div className="text-center z-20 brightness-110 sm:backdrop-blur-sm shadow-sm shadow-white px-5 md:px-14 pb-10 pt-20 rounded-xl flex flex-col gap-5">
          <div>
            <h1
              className={`text-5xl md:text-6xl ${kushan.className} font-extrabold mb-3`}
            >
              MuniTrack
            </h1>
            <p className={`md:text-md ${serif.className}`}>
              Take a Step in Making your Country a Beautiful place, by first
              start improving your society
            </p>
          </div>
          <div className="py-3 flex gap-5 flex-wrap justify-center md:py-7">
            {user.emailVerified ? (
              <>
                <button
                  onClick={() => {
                    router.push("/add");
                  }}
                  className={`px-7 py-3 text-xl uppercase rounded-md bg-gray-800 hover:scale-105 transition-all ${serif.className} text-white`}
                >
                  Post Issue
                </button>
                <button
                  onClick={() => {
                    router.push("/issue");
                  }}
                  className={`relative uppercase ml-3 flex items-center ${serif.className} transition-all cursor-pointer text-xl before:bg-gray-500  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:scale-105`}
                >
                  View Issue
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    router.push("/issue");
                  }}
                  className={`px-7 py-3 text-xl uppercase bg-gray-800 rounded-md font-bold hover:scale-105 transition-all ${serif.className} text-white`}
                >
                  View
                </button>
                <button
                  onClick={() => {
                    router.push("/drive");
                  }}
                  className={`relative uppercase ml-3 flex items-center ${serif.className} transition-all cursor-pointer text-xl before:bg-gray-500  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:scale-105`}
                >
                  Campaign
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
