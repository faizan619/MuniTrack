"use client";
import { useAuthContext } from "@/context/AuthContext";
import { kushan, arima, serif } from "../element/fonts";
export default function InComp({ users }) {
  const { user } = useAuthContext();
  return (
    <div className="text-white px-5 py-3">
      {users === undefined ? (
        <div className={`text-white ${serif.className} text-xl`}>
          <div className="w-16 mb-12  border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          <p>Loading...</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-white">No Data Found</p>
      ) : (
        <div className={`flex justify-start flex-wrap ${arima.className}`}>
          <div>
            <p className={`${serif.className}`}>
              Incharge Available : [ {users.length} ]
            </p>
            <div className="flex flex-wrap gap-3">
              {users.map((item) => (
                <div key={item._id} className="flex flex-wrap mr-5 gap-5 my-3">
                  <div
                    className={`flex items-center gap-3 p-3 rounded-md ${
                      user.email === item.email
                        ? "bg-violet-600 text-white"
                        : "bg-white text-black"
                    } select-none`}
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.displayName
                      )}&size=35&rounded=true&background=black&color=fff&uppercase=false`}
                      alt={item.displayName}
                    />
                    <p className={`text-xl uppercase font-extrabold  `}>
                      {item.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
