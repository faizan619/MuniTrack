import Image from "next/image";

const getPost = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/backend/issue`,
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
      <h1 className="text-white text-2xl text-center p-5 uppercase ">Issues</h1>
      <div className="text-white flex gap-5 flex-wrap p-3 justify-evenly ">
        {issues === null ? (
          <p>No Data Available</p>
        ) : issues.length == 0 ? (
          <p>No Data Found!</p>
        ) : (
          issues.map((item) => (
            <div
              key={item._id}
              className="border w-full sm:w-1/2 md:w-1/3 lg:w-[25%]  p-3 rounded-md bg-gray-700 flex flex-col items-center "
            >
              <Image
                src={item.issue_image_url}
                height={0}
                width={250}
                alt="image"
                className="rounded-md"
              />
              <div className="py-3 w-full">
                <p>
                  Title :{" "}
                  <span className="font-bold text-red-500 underline ">
                    {item.issue_title}
                  </span>
                </p>
                <p>
                  Description :{" "}
                  <span className="font-bold text-red-500 underline ">
                    {item.issue_describe}
                  </span>
                </p>
                <p>
                  State :{" "}
                  <span className="font-bold text-red-500 underline ">
                    {item.issue_state}
                  </span>
                </p>
                <p>
                  Location :{" "}
                  <span className="font-bold text-red-500 underline ">
                    {item.issue_location}
                  </span>
                </p>
                <p>
                  Sender Name :{" "}
                  <span className="font-bold text-red-500 underline ">
                    {item.issue_user_name}
                  </span>
                </p>
                <p>
                  Sender Email :{" "}
                  <span className="font-bold text-red-500 underline ">
                    {item.issue_user_email}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
