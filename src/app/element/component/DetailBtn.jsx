"use client"

import { useRouter } from "next/navigation"

export default function DetailBtn({url}){
    const router = useRouter();
    return(
        <button className="border bg-gray-600 hover:scale-110 transition-all px-2 text-white py-1 rounded-md" onClick={()=>{router.push(`/issue/${url}`)}}>View Detail</button>
    )
}