"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Img1 from "../../../../public/assets/img7.jpg";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      toast.remove();
      toast.error("Please login to continue!");
      router.push("/google");
    }
  }, [user, router]);

  if (!user) {
    return <div className="wallpaper1 h-[90vh] text-white">Only Logined Users can view this page</div>;
  }

  return (
    <div>
      <section className="flex relative justify-center items-center h-[90vh] px-3 sm:px-10 text-white overflow-hidden">
        <Image
          src={Img1}
          alt="bg image"
          className="absolute z-0 brightness-50 w-screen h-screen"
        />
        <div className="text-center z-20 brightness-110 sm:backdrop-blur-sm shadow-sm shadow-white px-5 md:px-14 pb-10 pt-20 rounded-xl flex flex-col gap-5">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
              MuniTrack
            </h1>
            <p className="md:text-md italic">
              ` Take a Step in Making your Country a Beautiful place. by first
              start improving your society `
            </p>
          </div>
          <div className="py-3 flex gap-5 flex-wrap justify-center md:py-7">
            {user.emailVerified ? (
              <>
                <button
                  onClick={() => {
                    router.push("/add");
                  }}
                  className="px-7 py-3 text-xl uppercase rounded-md bg-gray-700 hover:scale-105 transition-all text-white"
                >
                  Post Issue
                </button>
                <button
                  onClick={() => {
                    router.push("/issue");
                  }}
                  className="px-7 py-3 text-xl uppercase rounded-md  hover:scale-105 transition-all text-white"
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
                  className="px-7 py-3 text-xl uppercase rounded-md border font-bold hover:scale-105 transition-all text-white"
                >
                  View 
                </button>
                <button
                  onClick={() => {
                    router.push("/drive");
                  }}
                  className="px-7 py-3 text-xl uppercase rounded-md border font-bold hover:scale-105 transition-all text-white"
                >
                  Create 
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}