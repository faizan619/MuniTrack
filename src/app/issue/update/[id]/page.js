const getIssueById = async (id)=>{
    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/id/${id}`,{
        cache:"no-store"
     });
     if(!res.ok){
        throw new Error("Failed to Fetch Topic !!");
     }
     return res.json();
    } catch (error) {
        console.log("Error in issue/update/[id]/page : ",error);
    }
}

export default async function Page({params}){
    let {id} = params
    const {issue_title,issue_describe,issue_manual_location} = await getIssueById(id);
    return(
        <div>This is Update page for User : {id}</div>
    )
}