'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authUser } from "@/libs/API/UserAPI";
import { LoginResponse } from "@/types/LoginResponse";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const validationData = await authUser(username, password);
    if (!validationData.success) {
      alert("Invalid username or password");
      return;
    }

    localStorage.setItem("userId", String(validationData.userId));
    if (validationData.userType === "Customer") {
      router.push("/customer");
    } else if (validationData.userType === "Staff") {
      router.push("/staff");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen gap-2">
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-full outline-2 px-3" placeholder="Username"></input>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full outline-2 px-3" placeholder="Password"></input>
      <div className="flex gap-2">
        <button onClick={() => router.push("/register")} className="border-2 rounded-2xl py-1 px-3">Register</button>
        <button onClick={handleLogin} className="border-2 rounded-2xl py-1 px-3">Login</button>
      </div>
    </div>
  );
}
