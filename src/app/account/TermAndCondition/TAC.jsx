"use client";
import { usePathname } from "next/navigation";
import {listData} from "./listData";

export default function TAC() {
  const pathname = usePathname();

  return (
    <div className="min-h-[91.5vh] py-5 px-3 flex flex-col gap-3">
      <div className="">
        <h1 className="text-center font-bold underline pb-3 text-lg">
          Municipal Grievance Tracker Terms and Conditions
        </h1>
        <p className="text-center md:px-10">
          Welcome to the{" "}
          <span className="font-bold capitalize">
            Municipal Grievance Tracker app
          </span>
          . Before using our services, please read these terms and conditions
          carefully. By accessing or using our app, you{" "}
          <span className="font-bold capitalize">agree</span> to be bound by
          these{" "}
          <span className="font-bold capitalize">terms and conditions</span>. If
          you do not agree with any part of these terms, please do not use our
          app.
        </p>
      </div>
      <ol className="list-decimal list-inside flex flex-col gap-5 pb-16 md:pb-0">
        {listData.map((section, index) => (
          <div key={index} className="bg-gray-700 rounded-md text-white p-3">
            <li className="font-bold capitalize">{section.title}</li>
            <ul className="list-disc list-inside">
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
