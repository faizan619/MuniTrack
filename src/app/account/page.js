import details from "./accountInfo"
export default function Page(){
    console.log(details)
    console.log(details[1].name)
    return(
        <div className="px-3 flex flex-col justify-between min-h-[30rem] ">
            <div>
                {
                    details.map((item)=>(
                        <div key={item.key} className="flex border border-black border-b-white py-3 justify-between text-lg uppercase">
                            <p>{item.logo}</p>
                            <p>{item.name}</p>
                            <p></p>
                        </div>
                    ))
                }
            </div>
            <button className="border w-full rounded-md py-2 hover:bg-green-600 font-bold transition-all">Logout</button>
        </div>
    )
}