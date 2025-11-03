import { LoginResponse } from "@/types/LoginResponse";
import Order from "@/types/Order";
import { Customer } from "@/types/User";
import { parse } from "path";
const API_URL = "http://localhost:8080/api/auth"; // Base URL

export async function authUser(username : string, password : string) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username : username, password : password}),
    });
    const data : LoginResponse = await res.json();
    return data;
}

export async function getCustomerDataById() : Promise<Customer> {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`http://localhost:8080/api/customers/${userId}`);
    const data : Customer = await res.json();
    return data;
}

export async function register(data : Omit<Customer, "customerId">) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }); 
}

export async function changeProfileDetail(data : Omit<Customer, "customerId" | "password">) {
    const userId = localStorage.getItem("userId");
    const customerId = parseInt(userId!);

    if (!userId) {
        throw new Error("No user ID found. Please log in.");
    }

    const res = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }); 

    if (!res.ok) {
        throw new Error(`Failed to update profile ${res.statusText}`);
    }

    return res.json();
}

export async function checkUsernameExist(username: string) : Promise<Boolean>{
    const res = await fetch(`${API_URL}/check-username?username=${username}`);
    return res.json();
};