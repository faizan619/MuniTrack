export default function Page() {
  return (
    <div className="px-3 flex flex-col justify-between min-h-[30rem]  ">
      <div className="flex-1  flex flex-col justify-evenly items-center">
        <div className="flex py-2 px-2 border border-black hover:border-b-green-600 cursor-pointer hover:text-green-600 justify-between text-lg uppercase">
          <p></p>
          <p>Profile</p>
          <p></p>
        </div>

        <div className="flex py-2 px-2 border border-black hover:border-b-green-600 cursor-pointer hover:text-green-600 justify-between text-lg uppercase">
          <p></p>
          <p>View issues</p>
          <p></p>
        </div>

        <div className="flex py-2 px-2 border border-black hover:border-b-green-600 cursor-pointer hover:text-green-600 justify-between text-lg uppercase">
          <p></p>
          <p>Community Chat</p>
          <p></p>
        </div>
        <div className="flex py-2 px-2 border border-black hover:border-b-green-600 cursor-pointer hover:text-green-600 justify-between text-lg uppercase">
          <p></p>
          <p>Report</p>
          <p></p>
        </div>
        <div className="flex py-2 px-2 border border-black hover:border-b-green-600 cursor-pointer hover:text-green-600 justify-between text-lg uppercase">
          <p></p>
          <p>Terms and Condition</p>
          <p></p>
        </div>

      </div>

      <button className="border w-full rounded-md py-2 hover:bg-green-600 text-xl font-bold transition-all">
        Logout
      </button>
    </div>
  );
}
