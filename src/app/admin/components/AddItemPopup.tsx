'use client';

import { useState } from "react";
import { X } from "lucide-react";
import  Item  from "@/types/Item"

// Base URL of your Spring Boot API for items
const API_URL = "http://localhost:8080/api/items";
export default function AddItemPopup({ 
    onCloseNewItemPopup, 
    onClickAddItem
} : { 
    onCloseNewItemPopup: () => void; 
    onClickAddItem: (formData : Omit<Item, "itemId">) => void ;
} ) {
    const [newItemFormData, setNewItemFormData] = useState<Omit<Item, "itemId">>({
        itemName: '',
        currentPrice: 0,
        size: 'S',
        stockQuantity: 0,
        reservedQuantity: 0,
        status: 'AVAILABLE'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewItemFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClickAddItem(newItemFormData);
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className="flex flex-col bg-white p-6 rounded shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onCloseNewItemPopup} className="cursor-pointer"><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
                    <label htmlFor="itemName" className="text-sm font-medium text-gray-700">
                        Item Name
                    </label>
                    <input 
                            type="text"
                            name="itemName"
                            value={newItemFormData?.itemName}
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
                                min={0}
                                value={newItemFormData?.currentPrice}
                                onChange={handleChange}
                                placeholder="Price"
                                className="border rounded px-3 py-2 w-20"
                                required 
                            />
                        </div>

                        {/* BUG Must select to get value */}
                        <div className="flex flex-col">
                            <label htmlFor="size" className="text-sm font-medium text-gray-700">
                                Size
                            </label>
                            <select 
                                className="border rounded px-3 py-2 grow"
                                name="size"
                                value={newItemFormData?.size}
                                onChange={handleChange}
                                >
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
                                value={newItemFormData?.stockQuantity}
                                min={0}
                                onChange={handleChange}
                                placeholder="Stock"
                                className="border rounded px-3 py-2 w-20"
                                required
                            />
                        </div>
                    </div>

                        <button type="submit" className="bg-green-400 p-2 px-4 rounded-xl shadow-2xl hover:shadow hover:bg-green-500">Add Item</button>
                </form>
            </div>
        </div>
    );
}