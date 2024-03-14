import Image from "next/image";
import DetailBtn from "../element/component/DetailBtn";

const getPost = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Fetching Error : Status :${response.status}`);
    }

    const raw_issue = await response.json();
    return raw_issue;
  } catch (error) {
    console.error("Fetching issue data failed:", error);
    return { success: false, error };
  }
};

export default async function HomePost() {
  const issues = await getPost();
  return (
    <div className="pb-20">
      
      <h1 className="text-white text-2xl text-center p-5 uppercase ">Municipal Gravience Tracker</h1>

       <div className="flex gap-5 flex-wrap p-3 justify-evenly ">
        {issues === null ? (
          <p>No Issue Available</p>
        ) : issues.length == 0 ? (
          <p>No Issue Found!</p>
        ) : (
          issues.map((item) => (
            <div
              key={item._id}
              className="border w-full sm:w-1/2 md:w-1/3 lg:w-[25%]  p-3 gap-1 rounded-md bg-white flex flex-col justify-between"
            >
              <p>
                Title :{" "}
                <span className="font-bold uppercase">{item.issue_title}</span>
              </p>
              <p>
                Location :{" "}
                <span className="font-bold">{item.issue_location}</span>
              </p>
              <p>
                Sender Name :{" "}
                <span className="font-bold">{item.issue_user_name}</span>
              </p>
              <DetailBtn url={item.issue_user_name} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
