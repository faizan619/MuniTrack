"use client";
import { usePathname } from "next/navigation";
import {listData} from "./listData";
import { serif,arima,kushan } from "@/app/element/fonts";

export default function TAC() {
  const pathname = usePathname();

  return (
    <div className="min-h-[90vh] py-5 px-3 flex items-center flex-col text-white gap-3">
      <div className="md:w-3/4">
        <h1 className={`text-center font-bold underline ${serif.className} pb-3 text-lg`}>
          Municipal Grievance Tracker Terms and Conditions
        </h1>
        <p className={`text-center md:px-10 ${arima.className}`}>
          Welcome to the{" "}
          <span className={`font-bold capitalize ${serif.className} text-green-600`}>
            Municipal Grievance Tracker app
          </span>
          . Before using our services, please read these terms and conditions
          carefully. By accessing or using our app, you{" "}
          <span className={`font-bold capitalize ${serif.className} text-green-600`}>agree</span> to be bound by
          these{" "}
          <span className={`font-bold capitalize ${serif.className} text-green-600`}>terms and conditions</span>. If
          you do not agree with any part of these terms, please do not use our
          app.
        </p>
      </div>
      <ol className="list-decimal md:w-3/4 list-inside flex flex-col gap-5 pb-16 md:pb-0">
        {listData.map((section, index) => (
          <div key={index} className="bg-gray-700 rounded-md text-white p-3">
            <li className={`font-bold capitalize ${serif.className}`}>{section.title}</li>
            <ul className={`list-disc list-inside ${arima.className}`}>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </ol>
    </div>
  );
}
