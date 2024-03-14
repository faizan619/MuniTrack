"use client"

import { useRouter } from "next/navigation"

export default function DetailBtn({url}){
    const router = useRouter();
    return(
        <button className="border bg-gray-600 px-3 text-white py-1 rounded-md" onClick={()=>{router.push(`/issue/${url}`)}}>View Details...</button>
    )
}