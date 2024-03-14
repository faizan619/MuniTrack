import Details from "./Details"

export default function Issue({params}){
    let {issuename} = params
    return(
        <Details name={issuename} />
    )
}