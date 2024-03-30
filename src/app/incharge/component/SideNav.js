"use client";

import { arima } from "@/app/element/fonts";
import { usePathname, useRouter } from "next/navigation";

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  return (
    <div className={`w-20 h-[90vh] bg-gray-800 pt-3 z-20`}>
      <div className={`flex flex-col justify-evenly h-full`}>
        <div
          className={`flex justify-center items-center py-3 cursor-pointer hover:scale-110 transition-all featHide`}
          onClick={() => {
            router.push("/incharge");
          }}
        >
          <p
            className={`px-1 rounded-md relative flex flex-col items-center  py-3`}
          >
            <svg
              className={`w-12 h-8 hover:text-white`}
              fill="#6b7280"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M405.3,277.3c0,11.8-9.5,21.3-21.3,21.3
	h-85.3V384c0,11.8-9.5,21.3-21.3,21.3h-42.7c-11.8,0-21.3-9.6-21.3-21.3v-85.3H128c-11.8,0-21.3-9.6-21.3-21.3v-42.7
	c0-11.8,9.5-21.3,21.3-21.3h85.3V128c0-11.8,9.5-21.3,21.3-21.3h42.7c11.8,0,21.3,9.6,21.3,21.3v85.3H384c11.8,0,21.3,9.6,21.3,21.3
	V277.3z"
              />
            </svg>
            <p
              className={`text-black px-2 py-1 rounded-md absolute top-5 -right-20 featH bg-white`}
            >
              Upload
            </p>
            <p
              className={`text-center text-[12px] ${
                arima.className
              } mt-3 uppercase ${
                isActive("/incharge") ? "text-white" : "text-gray-700"
              }`}
            >
              Upload
            </p>
          </p>
        </div>
        <div
          className={`flex justify-center py-5 items-center cursor-pointer hover:scale-110 transition-all featHide`}
          onClick={() => {
            router.push("/incharge/search");
          }}
        >
          <p className={`p-1 rounded-md relative`}>
            <svg
              fill="#6b7280"
              className={` w-12 h-8 `}
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M35.66 29.539c1.661-2.739 2.632-5.948 2.632-9.385 0-10.029-8.115-18.15-18.146-18.154-10.022.003-18.146 8.125-18.146 18.152 0 10.018 8.125 18.139 18.152 18.139 3.44 0 6.645-.972 9.384-2.633l12.343 12.342 6.121-6.124-12.34-12.337zm-15.51 1.841c-6.202-.015-11.216-5.027-11.227-11.216.012-6.202 5.027-11.215 11.227-11.229 6.199.016 11.215 5.028 11.228 11.229-.013 6.182-5.031 11.201-11.228 11.216z" />
            </svg>
            <p
              className={`text-black px-2 py-1 rounded-md absolute top-2 -right-20 featH bg-white`}
            >
              Search
            </p>
            <p
              className={`text-center text-[12px] ${
                arima.className
              } mt-3 uppercase ${
                isActive("/incharge/search") ? "text-white" : "text-gray-700"
              }`}
            >
              Search
            </p>{" "}
          </p>
        </div>
        <div
          className={`flex justify-center py-5 items-center cursor-pointer hover:scale-110 transition-all featHide`}
          onClick={() => {
            router.push("/incharge/feedback");
          }}
        >
          <p
            className={`px-1 flex flex-col items-center rounded-md relative py-3`}
          >
            <svg
              fill="#6b7280"
              className={`w-12 h-8 `}
              viewBox="0 0 52 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M27.4133467,3.10133815 L32.0133467,18.1013381 C32.2133467,18.7013381 32.8133467,19.0013381 33.4133467,19.0013381 L48.4133467,19.0013381 C49.9133467,19.0013381 50.5133467,21.0013381 49.3133467,21.9013381 L37.1133467,30.9013381 C36.6133467,31.3013381 36.4133467,32.0013381 36.6133467,32.6013381 L42.4133467,48.0013381 C42.8133467,49.4013381 41.3133467,50.6013381 40.1133467,49.7013381 L27.0133467,39.9013381 C26.5133467,39.5013381 25.8133467,39.5013381 25.2133467,39.9013381 L12.0133467,49.7013381 C10.8133467,50.6013381 9.21334668,49.4013381 9.71334668,48.0013381 L15.3133467,32.6013381 C15.5133467,32.0013381 15.3133467,31.3013381 14.8133467,30.9013381 L2.61334668,21.9013381 C1.41334668,21.0013381 2.11334668,19.0013381 3.51334668,19.0013381 L18.5133467,19.0013381 C19.2133467,19.0013381 19.7133467,18.8013381 19.9133467,18.1013381 L24.6133467,3.00133815 C25.0133467,1.60133815 27.0133467,1.70133815 27.4133467,3.10133815 Z M26.0133467,12.8023264 C26,14.1700393 26,33.5426636 26,34.4953918 C26.1865845,34.6476135 28.9331193,36.6890643 34.2396046,40.6197441 C34.9394191,41.144605 35.8141872,40.4447905 35.5809157,39.6283403 L35.5809157,39.6283403 L32.3085327,31.0201416 C31.9597778,30.2501831 32.3085327,29.7487793 32.7398682,29.4849854 L32.7398682,29.4849854 L39.6048489,24.6961622 C40.3046634,24.1713013 39.9547562,23.0049438 39.0799881,23.0049438 L39.0799881,23.0049438 L31.0206299,23.0049438 C30.6707226,23.0049438 29.7518921,22.8880615 29.5025635,21.9888306 L29.5025635,21.9888306 L26.8332347,13.4436151 C26.7175852,13.0388421 26.3602784,12.8204102 26.0133467,12.8023264 Z" />
            </svg>
            <p
              className={`text-black px-2 py-1 rounded-md absolute top-5 -right-24 featH bg-white`}
            >
              Feedback
            </p>
            <p
              className={`text-center mt-3 text-[12px] ${arima.className} ${
                isActive("/incharge/feedback") ? "text-white" : "text-gray-600"
              }`}
            >
              Feedback
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
