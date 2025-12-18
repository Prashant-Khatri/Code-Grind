"use client"
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";

function RootLayout({children}){
    const [userRole,setUserRole]=useState("USER")
    const getUserRole=async ()=>{
        const res=await axios.get('/api/get-user-role')
        console.log(res)
        setUserRole(res.data.role)
    }
    useEffect(()=>{
        getUserRole()
    },[])
    return <main className="flex flex-col min-h-screen max-h-screen">
        <Navbar userRole={userRole}/>
        <div className="flex-1 flex flex-col px-4 pb-4">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] dark:bg-size-[16px_16px] bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-size-[16px_16px]" />
            {children}
        </div>
    </main>
}

export default RootLayout