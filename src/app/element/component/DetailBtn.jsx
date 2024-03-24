"use client"

import { useRouter } from "next/navigation"

export default function DetailBtn({url}){
    const router = useRouter();
    return(
        <button className="bg-gray-900 px-3 py-2 rounded-md hover:scale-105 hover:bg-gray-800 text-white" onClick={()=>{router.push(`/issue/${url}`)}}>Details</button>
    )
}