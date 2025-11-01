import { LoginResponse } from "@/types/LoginResponse";
import Order from "@/types/Order";
import { Customer } from "@/types/User";
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

export async function getCustomerDataById(id : number) {
    const res = await fetch(`http://localhost:3000/testCustomerData?id=${id}`);
    const data : Order[] = await res.json();
    return data;
}

export async function register(data : Omit<Customer, "customerId">) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }); 
}