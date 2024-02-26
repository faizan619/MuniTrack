"use client"
import {onAuthStateChanged,getAuth} from "firebase/auth"
import track_app from "@/firebase/config"
import { createContext, useContext, useEffect, useState } from "react"
import Splash from "@/app/element/pages/Splash"
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
                console.log("User at AuthContext : ",user)
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
            {loading?<Splash/>:children}
        </AuthContext.Provider>
    )
}