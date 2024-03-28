"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  const { user } = useAuthContext();

  return (
    <>
      {user === null ? null : (
        <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-2 left-1/2 dark:bg-gray-700 dark:border-gray-600 md:hidden">
          <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
            <button
              onClick={() => router.push("/")}
              data-tooltip-target="tooltip-home"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-green-200 rounded-s-full  dark:hover:bg-gray-800 group "
            >
              <svg
                className={`w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-green-600 ${
                  isActive("/") ? "text-green-600" : ""
                } dark:group-hover:text-green-500`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span className="sr-only">Home</span>
            </button>
            <button
              onClick={() => router.push("/issue")}
              data-tooltip-target="tooltip-settings"
              type="button"
              className="inline-flex flex-col items-center hover:bg-green-200 justify-center px-5 dark:hover:bg-gray-800 group "
            >
              <svg
                className={`w-5 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-green-600 ${
                  isActive("/issue") ? "text-green-600" : ""
                } dark:group-hover:text-green-500`}
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
              <span className="sr-only">View Issue</span>
            </button>
            <div className="flex items-center justify-center">
              <button
                onClick={() => router.push("/add")}
                data-tooltip-target="tooltip-new"
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 font-medium bg-green-600 rounded-full hover:bg-green-700 group focus:ring-4 focus:ring-green-300 focus:outline-none dark:focus:ring-green-800"
              >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                <span className="sr-only">New item</span>
              </button>
            </div>

            <button
              onClick={() => router.push("/chat")}
              data-tooltip-target="tooltip-wallet"
              type="button"
              className="flex flex-col items-center hover:bg-green-200 justify-center px-5 dark:hover:bg-gray-800 group"
            >
              <svg
                className={`w-7 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-green-600 ${
                  isActive("/chat") ? "text-green-600" : ""
                } dark:group-hover:text-green-500`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  id="primary"
                  d="M18.81,16.23,20,21l-4.95-2.48A9.84,9.84,0,0,1,12,19c-5,0-9-3.58-9-8s4-8,9-8,9,3.58,9,8A7.49,7.49,0,0,1,18.81,16.23Z"
                ></path>
              </svg>
              <span className="sr-only">Wallet</span>
            </button>
            <button
              onClick={() => router.push("/account")}
              data-tooltip-target="tooltip-profile"
              type="button"
              className="inline-flex flex-col items-center hover:bg-green-200 justify-center px-5 rounded-e-full  dark:hover:bg-gray-800 group"
            >
              <svg
                className={`w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-green-600  ${
                  isActive("/account") ? "text-green-600" : ""
                } dark:group-hover:text-green-500`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <span className="sr-only">Profile</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
