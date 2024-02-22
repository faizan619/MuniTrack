import Image from "next/image";
import Button from "./components/Button";
import { connectDB } from "@/mongodb/database/conn";
import Home from "./components/Home";

export const metadata = {
  title: "Home : MuniTrack",
  description: "Generated by create next app",
};
connectDB()
export default function Page() {
  return (
    <Home/>
  );
}
