import { LoginResponse } from "@/types/LoginResponse";
import { Customer } from "@/types/User";

export async function authUser(username : string, password : string) {
    const res = await fetch("http://localhost:3000/admin/testItemData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username : username, password : password}),
    });
    const data : LoginResponse = await res.json();
    return data;
}

export async function register(data : Omit<Customer, "customerId">) {
    const res = await fetch("http://localhost:3000/admin/testItemData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }); 
}