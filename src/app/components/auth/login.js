import track_app from "@/firebase/config";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

const auth = getAuth(track_app)

export default async function login(email,password){
    let result = null,error = null;

    try{
        result = await signInWithEmailAndPassword(auth,email,password)
    }catch(e){
        error = e;
    }
    return {result,error}
}