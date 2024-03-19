import ResolvedForm from "./ResolvedForm";

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

export default async function Page({params}){
    let {id} = params;
    const { issue_state } =await getIssueById(id);
    return(
        <ResolvedForm id={id} state={issue_state}/>
    )
}