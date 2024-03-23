"use client"
import { useRouter } from "next/navigation";
import { kushan,arima } from "./fonts";
export default function NotAuth({name}){
    const router = useRouter();
    return(
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
              className={`text-red-600 uppercase ${kushan.className} text-md`}
            >
              Login
            </span>{" "}
            to continue with the{" "}
            <span
              className={`text-red-600 text-md uppercase ${kushan.className}`}
            >
              {name}
            </span>
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
    )
}