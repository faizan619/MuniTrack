export default function CampComp({ camps }) {
  return (
    <div className="">
      <p className="text-white text-xl pl-7">
        Total Issues : [{camps?.length}]
      </p>
      <div className="flex gap-5 flex-wrap p-3 justify-evenly">
        {camps === undefined ? (
          <p className="text-white">No Issue Available</p>
        ) : camps.length === 0 ? (
          <p>No Issue Found!</p>
        ) : (
          camps.map((item) => (
            <div
              key={item._id}
              className="relative rounded-md text-white border overflow-hidden m-2"
            >
                <p>Drive Hosted By : {item.drive_host_name}</p>
                <p>Drive Title : {item.drive_title}</p>
                <p>Info : {item.drive_describe}</p>
                <p>Location : {item.drive_location}</p>
                <p>at timing : {item.drive_time}</p>
                <p>Will be Held on : {item.drive_on}</p>
                <p>WhatApp Link : {item.drive_link}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
