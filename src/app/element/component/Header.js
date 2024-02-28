"use client"
import Image from "next/image";
import Logo from "../../../../public/assets/t-preview.png";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {usePathname} from "next/navigation"

const Header = () => {
  const auth = getAuth();
  const [name, setName] = useState(""); 
  const pathname = usePathname();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setName(user.displayName);
      } else {
        setName("unknown");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const isActive = (path) => path === pathname;
  return (
    <div className="h-14 px-3 bg-gray-700 flex justify-center md:justify-between items-center gap-5 sticky top-0">
      <div className="flex gap-3 items-center cursor-context-menu">
        <Image src={Logo} height={300} width={35} alt="Logo" />
        <p className="font-extrabold text-xl font-sans text-white">MuniTrack</p>
      </div>
      <div className="hidden md:block">
        <ol className="flex gap-7 text-white">
          <Link className={isActive("/") ? 'text-green-400 underline' : 'text-white'} href="/">Home</Link>
          <Link className={isActive("/search") ? 'text-green-400 underline' : 'text-white'} href="/search">Search</Link>
          <Link className={isActive("/chat") ? 'text-green-400 underline' : 'text-white'} href="/chat">Chat</Link>
          <Link className={isActive("/account") ? 'text-green-400 underline' : 'text-white'} href="/account">{name}</Link> 
        </ol>
      </div>
    </div>
  );
};

export default Header; 

