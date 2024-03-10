export default function Issue({params}){
    let {issuename} = params
    return(
        <div className="h-[90vh] text-center">
            <p>this page gives more details about {issuename}</p>
        </div>
    )
}