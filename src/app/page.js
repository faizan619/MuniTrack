import { connectDB } from "@/mongodb/database/conn";
import Home from "./element/pages/Home";

export const metadata = {
  title: "Home : MuniTrack",
  description: "Generated by create next app",
};
connectDB()
export default function Page() {
  return (
    <div className="min-h-[90vh] selection:underline ">
    <Home/>
    </div>
  );
}
