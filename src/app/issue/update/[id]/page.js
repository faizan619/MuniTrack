import Editform from "./Editform";

const getIssueById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/id/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to Fetch Topic !!");
    }
    return res.json();
  } catch (error) {
    console.log("Error in issue/update/[id]/page : ", error);
  }
};

export default async function Page({ params }) {
  let { id } = params;
  const { issue_title, issue_describe, issue_manual_location,issue_user_email,issue_user_name } =
    await getIssueById(id);
  return <Editform id={id} title={issue_title} describe={issue_describe} location={issue_manual_location} u_email={issue_user_email} u_name={issue_user_name} />;
}
