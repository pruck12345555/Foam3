'use client';

import { Customer } from "@/types/User";
import { useState } from "react";
import { register } from "@/libs/API/UserAPI";

export default function RegisterPage() {
    const [formData, setFormData] = useState<Omit<Customer, "customerId">>({
        firstName : "",
        lastName : "",
        email : "",
        phoneNumber : "",
        username : "",
        password : ""
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        register(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col justify-center items-center m-auto h-screen gap-4">
            <form onSubmit={handleRegister} className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="firstName"
                        value={formData?.firstName}
                        onChange={handleChange}
                        className="rounded-full outline-2 px-3"
                        placeholder="First Name"
                        required
                        >
                    </input>
                    <input
                        type="text"
                        name="lastName"
                        value={formData?.lastName}
                        onChange={handleChange}
                        className="rounded-full outline-2 px-3"
                        placeholder="Last Name"
                        required
                        >
                    </input>
                </div>
                <div className="flex gap-2">
                    <input 
                        type="text"     
                        name="username"
                        value={formData?.username} 
                        onChange={handleChange} 
                        className="rounded-full outline-2 px-3" 
                        placeholder="Username"
                        required
                        >
                    </input>
                    <input 
                        type="text"     
                        name="password"
                        value={formData?.password} 
                        onChange={handleChange} 
                        className="rounded-full outline-2 px-3" 
                        placeholder="Password"
                        required
                        >
                    </input>
                </div>
                <input
                    type="text"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    className="rounded-full outline-2 px-3"
                    placeholder="Email"
                    required
                    >
                </input>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData?.phoneNumber}
                    onChange={handleChange}
                    className="rounded-full outline-2 px-3"
                    placeholder="Phone Number"
                    required
                >
                </input>
                <div className="flex gap-2">
                <button type="submit" className="border-2 rounded-2xl py-1 px-3">Confirm</button>
                </div>
            </form>
        </div>
    );
}