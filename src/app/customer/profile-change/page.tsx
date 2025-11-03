'use client';

import { Customer } from "@/types/User";
import { useState, useEffect } from "react";
import { changeProfileDetail, getCustomerDataById, checkUsernameExist } from "@/libs/API/UserAPI";
import OrdersTopBar from "../../admin/components/OrdersTopBar";

export default function ProfileChangePage() {
    const [formData, setFormData] = useState<Omit<Customer, "customerId" | "password">>({
        firstName : "",
        lastName : "",
        email : "",
        phoneNumber : "",
        username : ""
    });

    const [oldUsername, setOldUsername] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch the user's current data
                const profileData = await getCustomerDataById(); 
                setOldUsername(profileData.username);
                setFormData({
                    username: profileData.username,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    email: profileData.email,
                    phoneNumber: profileData.phoneNumber
                });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                alert("Could not load your profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Email is in wrong format\nEmail Format : xxxxxx@xxxx.xxx");
            return; 
        }

        // Check Phone number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            alert("Phone number is in wrong format\nPhone Number Format : 0123456789");
            return; 
        }

        // Check username repeatition
        const usernameExists = await checkUsernameExist(formData.username);
        if (formData.username !== oldUsername && usernameExists) {
            alert("Username already exists. Please choose a different username.");
            return; 
        }

        changeProfileDetail(formData);
        alert("Profile updated successfully!");
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
            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-2">
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
                <div className="flex gap-2 justify-center">
                <button type="submit" className="border-2 rounded-2xl py-1 px-3">Save Changes</button>
                </div>
            </form>
        </div>
    );
}