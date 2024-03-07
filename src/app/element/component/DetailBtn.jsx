"use client"

import { useRouter } from "next/navigation"

export default function DetailBtn({url}){
    const router = useRouter();
    return(
        <button className="border bg-gray-600 text-white py-1 rounded-md" onClick={()=>{router.push(`detail/${url}`)}}>View Details...</button>
    )
}