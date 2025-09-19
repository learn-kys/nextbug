"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error Occured");
      toast.error("Error Occured");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing" : <Link className="text-blue-500" href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
      <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User Details</button>
    </div>
  );
}
