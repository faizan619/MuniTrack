"use client"
import {onAuthStateChanged,getAuth} from "firebase/auth"
// import apna_app from "@/firebase/config"
import track_app from "@/firebase/config"
import { createContext, useContext, useEffect, useState } from "react"
const auth = getAuth(track_app)
export const AuthContext = createContext({})
export const useAuthContext = ()=>useContext(AuthContext);

export const AuthContextProvider = ({
    children,
})=>{
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
                console.log("user is :",user)
            }
            else{
                setUser(null);
            }
            setLoading(false)
        })
        return ()=>unsubscribe();
    },[]);

    return(
        <AuthContext.Provider value={{user}}>
            {loading?<div>Loading...</div>:children}
        </AuthContext.Provider>
    )
}