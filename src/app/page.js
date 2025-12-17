"use client"
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const onBoardUser=async ()=>{
    await axios.post('/api/onboard-user')
  }
  useEffect(()=>{
    onBoardUser()
  },[])
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserButton/>
    </div>
  );
}
