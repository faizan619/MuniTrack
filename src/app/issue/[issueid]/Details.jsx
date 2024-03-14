"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Details({ name }) {
    const [data, setData] = useState([]); 

    const getIssue = async () => {
        try {
            let response = await fetch(
                `${process.env.NEXT_PUBLIC_DOMAIN_URL}/issue/id/${name}`,
                {
                    cache: "no-store",
                }
            );
            if (!response.ok) {
                throw new Error(`Fetching Error : Status :${response.status}`);
            }
            response = await response.json();
            // console.log("response :", response);
            setData(response); 
        } catch (err) {
            console.log("Fetching Details Failed !", err);
            toast.error("Failed to Fetch Details ! Please Refresh or Try again Later")
        }
    };

    useEffect(() => {
        getIssue();
    }, [name]);

    return (
        <div className="h-[90vh] text-center">
            {data && (
                <>
                    <div className="font-extrabold text-xl">Data here</div>
                    <p>{data._id}</p>
                    <p>{data.issue_title}</p>
                    <p>{data.issue_describe}</p>
                    <p>{data.issue_state}</p>
                    <p>{data.issue_location}</p>
                    <p>{data.issue_manual_location}</p>
                    <p>{data.issue_public_view}</p>
                </>
            )}
        </div>
    );
}
