'use client';

import { useState } from "react";
import CartItem from "@/types/Cart";
import Item from "@/types/Item";
import { X } from "lucide-react";

export default function ItemPopup( {
    item,
    onCloseItemPopup,
    sendData,
    cart
} : {
    item : Item
    onCloseItemPopup : () => void;
    sendData : (item : Item, amount : number) => void;
    cart: CartItem[];
} ) {
    const [formData, setFormData] = useState(0);
    const itemInCart = cart.find(cartItem => cartItem.item.itemId === item.itemId);
    const amountInCart = itemInCart ? itemInCart.amount : 0;
    const remainingStock = item.stockQuantity - item.reservedQuantity - amountInCart;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        let numValue = Number(value);

        if (numValue > remainingStock) {
            numValue = remainingStock;
        }
        setFormData(numValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendData(item, formData);
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className="flex flex-col bg-white p-6 rounded shadow-lg">
                <div className="flex justify-end mb-2">
                    <button onClick={onCloseItemPopup} className="cursor-pointer"><X /></button>
                </div>
                <p>{item.itemName}</p>
                <p>Price : {item.currentPrice} ฿</p>
                <p>Size : {item.size}</p>
                <p>In stock : {remainingStock}</p>
                <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                    <input
                        type="number"
                        name="currentPrice"
                        value={formData}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border rounded px-3 py-2 w-20"
                        required
                        min = {1}
                        max = {remainingStock}
                    />
                    <button type="submit" className="bg-blue-400 p-2 px-4 rounded-xl shadow-2xl hover:shadow hover:bg-blue-500">Add to cart</button>
                </form>
            </div>
        </div>
    );
}