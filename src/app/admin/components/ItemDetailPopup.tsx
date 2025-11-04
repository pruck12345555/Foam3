'use client';

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import  Item from "@/types/Item"

// Base URL of your Spring Boot API for items
const API_URL = "http://localhost:8080/api/items";

export default function ItemDetailPopup({ 
        item, 
        onCloseItemDetailPopup, 
        onOpenItemDiscontinueConfirmPopup, 
        onClickUpdateItem,
        setDiscontinueAction
    }: { 
        item: Item; 
        onCloseItemDetailPopup : () => void; 
        onOpenItemDiscontinueConfirmPopup : () => void; 
        onClickUpdateItem : (formData: Item) => void; 
        setDiscontinueAction : React.Dispatch<React.SetStateAction<() => void>>;
    }) {
        
    const [ItemDetailFormData, setItemDetailFormData] = useState<Item>(item)

    useEffect(() => {
        setItemDetailFormData(item);
    }, [item]);

    useEffect(() => {
        setDiscontinueAction(() => handleRemove);
    }, [item])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setItemDetailFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClickUpdateItem(ItemDetailFormData);
    }

    const handleRemove = () => {
        if(item.reservedQuantity > 0){
            alert("Cannot discontinue item with reserved quantity greater than 0.");
            return;
        }
        const updatedItem = { ...ItemDetailFormData, status: "DISCONTINUED" };
        setItemDetailFormData(updatedItem)
        onClickUpdateItem(updatedItem);
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className="flex flex-col bg-white p-6 rounded shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onCloseItemDetailPopup} className="cursor-pointer"><X /></button>
                </div>
                <h1>ID : {item.itemId}</h1>
                <h1>Status : {item.status}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
                    <label htmlFor="itemName" className="text-sm font-medium text-gray-700">
                        Item Name
                    </label>
                    <input
                        type="text"
                        name="itemName"
                        value={ItemDetailFormData?.itemName}
                        onChange={handleChange}
                        placeholder="Item Name"
                        className="border rounded px-3 py-2"
                        required
                    />

                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            <label htmlFor="currentPrice" className="text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                name="currentPrice"
                                value={ItemDetailFormData?.currentPrice}
                                onChange={handleChange}
                                placeholder="Price"
                                min = {1}
                                className="border rounded px-3 py-2 w-20"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="size" className="text-sm font-medium text-gray-700">
                                Size
                            </label>
                            <select
                                className="border rounded px-3 py-2 grow"
                                name="size"
                                value={ItemDetailFormData?.size}
                                onChange={handleChange}
                            >
                                <option value="">Select size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="stockQuantity" className="text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={ItemDetailFormData?.stockQuantity}
                                onChange={handleChange}
                                placeholder="Stock"
                                min = {0}
                                className="border rounded px-3 py-2 w-20"
                                required
                            />
                        </div>
                    </div>

                    {/*TODO Confirmation to remove*/}
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-green-400 p-2 px-4 rounded-xl shadow-2xl hover:shadow hover:bg-green-500">Update</button>
                        <button type="button" className="flex-1 bg-red-500 p-2 px-4 rounded-xl shadow-2xl hover:shadow hover:bg-red-600" onClick={() => { onCloseItemDetailPopup(); onOpenItemDiscontinueConfirmPopup(); }}>Remove</button>
                    </div>     
                </form>
            </div>
        </div>
    );
}