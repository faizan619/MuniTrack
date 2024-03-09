"use client";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AddButton from "../component/AddButton";
import Image from "next/image";
import Img1 from "../../../../public/assets/img7.jpg";
import SubImg1 from "../../../../public/assets/subimg1.png";
import SubImg2 from "../../../../public/assets/subimg2.png";
import SubImg3 from "../../../../public/assets/subimg3.png";
import SubImg4 from "../../../../public/assets/subimg4.png";

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
    return <div>Only Logined Users can view this page</div>;
  }

  return (
    <div>
      <section className="flex relative justify-center items-center h-[90vh] text-white overflow-hidden">
        <Image
          src={Img1}
          alt="bg image"
          className="absolute z-0 brightness-50  w-screen h-screen"
        />
        <div className="text-center z-20 brightness-110 backdrop-blur-sm px-14 pb-10 pt-20 rounded-xl flex flex-col gap-5 ">
          <div>
            <h1 className="text-6xl font-extrabold mb-3">
              MuniTrack
            </h1>
            <p className="text-md italic">
              ` Take a Step in Making your Country a Beautiful place. by first
              start improving your society ``
            </p>
          </div>
          <div className="py-7">
            <button
              onClick={() => {
                router.push("/add");
              }}
              className="px-7 py-3 text-xl uppercase rounded-md bg-gray-500 hover:bg-gray-400 text-white"
            >
              Post Issue
            </button>
          </div>
        </div>
      </section>
      <section className="min-h-[90vh] bg-gray-950 text-white  p-5">
              <h1 className="text-center text-3xl">Features</h1>
              <IssuePart title={"issue about garbage"} desc={"Raised a Issue on seeing any unnecessary dump area in your loccality"} img={SubImg1} />
              <IssuePart title={"issue about driving"} desc={"Unsafe driving can lead to thread to life.do complaint to take actions against them"} img={SubImg2} style={"flex-row-reverse"} />
              <IssuePart title={"issue about Unknown Weather"} desc={"If you are stuck but any natural clamities.raise your voice"} img={SubImg3} />
              <IssuePart title={"Global Chat Room"} desc={"Along with Raising Issues.You can Connect with Other member in improving the society"} img={SubImg4} style={'flex-row-reverse'} view={true} url={"/chat"} />


      </section>
      <section className="h-[90vh] bg-gray-800 flex justify-center items-center"><p>This Page is left to create</p></section>
    </div>
  );
}


const IssuePart = ({title,desc,img,style,view,url})=>{
  const router = useRouter();

  return(
    <div className={`flex h-[75vh] ${style} items-center`}>
          <div className=" z-10 flex justify-center items-center flex-1">
            <Image
              src={img}
              height={0}
              width={0}
              alt="image"
              className="h-full px-20"
            />
          </div>
          <div className=" z-10 flex-1 flex justify-center items-center gap-5 flex-col h-full">
            <h1 className="text-3xl font-semibold uppercase text-green-500">
              {title}
            </h1>
            <p className="capitalize px-5">
              {desc}
            </p>
            {view && <button className="border px-5 py-2 rounded-md" onClick={()=>{router.push(url)}}>Hello</button>
            }
          </div>
        </div>
  )
}