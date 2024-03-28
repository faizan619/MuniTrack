"use client"

import { usePathname, useRouter } from "next/navigation";

export default function SideNav() {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = (path) => path === pathname;
  return (
    <div className={`w-20 h-[90vh] pt-3`}>
      <div className={`flex flex-col justify-evenly h-full`}>
        <div
          className={`flex justify-center items-center py-3 cursor-pointer hover:scale-110 transition-all featHide`}
          onClick={()=>{router.push("/incharge")}}
        >
          <p className={`px-1 rounded-md relative  py-3 ${
                  isActive("/incharge") ? "border" : ""
                }`}>
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
              className={`text-black px-2 py-1 rounded-md absolute top-2 -right-20 featH bg-white`}
            >
              Upload
            </p>
          </p>
        </div>
        {/* <div
          className={`flex justify-center py-5 items-center cursor-pointer hover:scale-110 transition-all featHide`}
          onClick={()=>{router.push("/incharge/feedback")}}
        >
          <p className={`p-1 rounded-md relative`}>
            <svg
              className={` w-12 h-8 `}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V4.5C15 4.88418 14.8556 5.23463 14.618 5.5C14.8556 5.76538 15 6.11582 15 6.5V8.5C15 8.88418 14.8556 9.23462 14.618 9.5C14.8556 9.76538 15 10.1158 15 10.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V10.5C0 10.1158 0.14443 9.76538 0.38195 9.5C0.144428 9.23462 0 8.88418 0 8.5V6.5C0 6.11582 0.144427 5.76538 0.381947 5.5C0.144427 5.23462 0 4.88418 0 4.5V2.5ZM2 4H5V3H2V4ZM5 8H2V7H5V8ZM2 12H5V11H2V12Z"
                fill="#6b7280"
              />
            </svg>
            <p
              className={`text-black px-2 py-1 rounded-md absolute top-2 -right-16 featH bg-white`}
            >
              Issue
            </p>
          </p>
        </div> */}
        {/* <div
          className={`flex justify-center py-5 items-center cursor-pointer hover:scale-110 transition-all featHide`}
        >
          <p className={`p-1 rounded-md relative`}>
            <svg
              className={` w-12 h-8 `}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                d="M22,4.28V15.72a2,2,0,0,1-.77,1.58,2.05,2.05,0,0,1-1.23.42,2,2,0,0,1-.48-.06L10,15.28,8.88,15H7a5,5,0,0,1-3.5-1.43A5,5,0,0,1,7,5H8.88L19.52,2.34a2,2,0,0,1,1.71.36A2,2,0,0,1,22,4.28Z"
                fill="#6b7280"
              ></path>
              <path
                d="M10,16.31V20a2,2,0,0,1-2,2H6.82a2,2,0,0,1-2-1.61L3.8,15.08a5.68,5.68,0,0,0,1.74.74A5.9,5.9,0,0,0,7,16H8.76Z"
                fill="#6b7280"
              ></path>
            </svg>
            <p
              className={`text-black px-2 py-1 rounded-md absolute top-2 -right-24 featH bg-white`}
            >
              Campaign
            </p>
          </p>
        </div> */}
        <div
          className={`flex justify-center py-5 items-center cursor-pointer hover:scale-110 transition-all featHide`}
          onClick={()=>{router.push("/incharge/feedback")}}
        >
          <p className={`px-1 rounded-md relative py-3 ${
                  isActive("/incharge/feedback") ? "border" : ""
                }`}>
            <svg
              fill="#6b7280"
              className={`w-12 h-8 `}
              viewBox="0 0 52 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M27.4133467,3.10133815 L32.0133467,18.1013381 C32.2133467,18.7013381 32.8133467,19.0013381 33.4133467,19.0013381 L48.4133467,19.0013381 C49.9133467,19.0013381 50.5133467,21.0013381 49.3133467,21.9013381 L37.1133467,30.9013381 C36.6133467,31.3013381 36.4133467,32.0013381 36.6133467,32.6013381 L42.4133467,48.0013381 C42.8133467,49.4013381 41.3133467,50.6013381 40.1133467,49.7013381 L27.0133467,39.9013381 C26.5133467,39.5013381 25.8133467,39.5013381 25.2133467,39.9013381 L12.0133467,49.7013381 C10.8133467,50.6013381 9.21334668,49.4013381 9.71334668,48.0013381 L15.3133467,32.6013381 C15.5133467,32.0013381 15.3133467,31.3013381 14.8133467,30.9013381 L2.61334668,21.9013381 C1.41334668,21.0013381 2.11334668,19.0013381 3.51334668,19.0013381 L18.5133467,19.0013381 C19.2133467,19.0013381 19.7133467,18.8013381 19.9133467,18.1013381 L24.6133467,3.00133815 C25.0133467,1.60133815 27.0133467,1.70133815 27.4133467,3.10133815 Z M26.0133467,12.8023264 C26,14.1700393 26,33.5426636 26,34.4953918 C26.1865845,34.6476135 28.9331193,36.6890643 34.2396046,40.6197441 C34.9394191,41.144605 35.8141872,40.4447905 35.5809157,39.6283403 L35.5809157,39.6283403 L32.3085327,31.0201416 C31.9597778,30.2501831 32.3085327,29.7487793 32.7398682,29.4849854 L32.7398682,29.4849854 L39.6048489,24.6961622 C40.3046634,24.1713013 39.9547562,23.0049438 39.0799881,23.0049438 L39.0799881,23.0049438 L31.0206299,23.0049438 C30.6707226,23.0049438 29.7518921,22.8880615 29.5025635,21.9888306 L29.5025635,21.9888306 L26.8332347,13.4436151 C26.7175852,13.0388421 26.3602784,12.8204102 26.0133467,12.8023264 Z" />
            </svg>
            <p
              className={`text-black px-2 py-1 rounded-md absolute top-2 -right-24 featH bg-white`}
            >
              Feedback
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
