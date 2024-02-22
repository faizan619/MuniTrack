"use client"
import Image from "next/image";
import Logo from "../../../public/assets/t-preview.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="h-14 px-3 bg-gray-700 flex justify-center md:justify-between items-center gap-5">
      <div className="flex gap-3 items-center cursor-context-menu">
        <Image src={Logo} height={300} width={35} alt="Logo" />
        <p className="font-extrabold text-xl font-sans text-white">
          MuniTrack
        </p>
      </div>
      <div className="hidden md:block">
        <ol className="flex gap-7 text-white">
          <Link href="/">Home</Link>
          <Link href="/">Search</Link>
          <Link href="/">Chat</Link>
          <Link href="/">Account</Link>
        </ol>
      </div>
    </div>
  );
};

export default Header;
