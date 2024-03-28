"use client";
import Image from "next/image";
import Logo from "../../../../public/assets/t-preview.png";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { kushan,arima,serif} from "../fonts";

const Header = () => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const pathname = usePathname();
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user?.displayName);
      } else {
        setName("unknown");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const puto = auth.currentUser?.photoURL;

  const isActive = (path) => path === pathname;
  return (
    <div className="z-50 h-16 px-7 bg-gray-800 flex justify-center md:justify-between items-center gap-5 sticky top-0">
      <div className="flex gap-3 items-center cursor-context-menu">
        <Image src={Logo} height={300} width={35} alt="Logo" />
        <p className={`text-2xl ${kushan.className} text-white`}>MuniTrack</p>
      </div>
      <div className="hidden md:block">
        <ol className={`flex gap-5 text-white items-center uppercase ${serif.className}`}>
          <Link
            className={`px-3 py-1 rounded-md hover:bg-gray-600 transition-all ${
              isActive("/") ? "bg-gray-600" : "text-white"
            }
            `}
            href="/"
          >
            Home
          </Link>
          {user === null ? null : (
            <>
              <Link
                className={`px-3 py-1 rounded-md hover:bg-gray-600 transition-all ${
                  isActive("/issue") ? "bg-gray-600" : "text-white"
                }
            `}
                href="/issue"
              >
                View
              </Link>
              {user?.emailVerified ? null : (
                <Link
                  className={`px-3 py-1 rounded-md hover:bg-gray-600 transition-all ${
                    isActive("/incharge") ? "bg-gray-600" : "text-white"
                  }
            `}
                  href="/incharge"
                >
                  Admin
                </Link>
              )}
              <Link
                className={`px-3 py-1 rounded-md hover:bg-gray-600 transition-all ${
                  isActive("/chat") ? "bg-gray-600" : "text-white"
                }
            `}
                href="/chat"
              >
                Chat
              </Link>
            </>
          )}
          {name === "unknown" ? null : (
            <Link href={"/account"}>
              <Image
                src={puto === null ? Logo : puto}
                height={0}
                width={40}
                alt="Account"
                className="rounded-full cursor-pointer"
              />
            </Link>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Header;
