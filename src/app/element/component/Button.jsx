"use client"
import { useRouter } from "next/navigation";
const Button = (props) => {
    const router = useRouter();
    return (
        <button onClick={()=>router.push(props.url)} className="uppercase px-2 border mx-3">
            {props.title}
        </button>
    );
}

export default Button;