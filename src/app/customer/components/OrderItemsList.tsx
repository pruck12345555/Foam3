'use client';

import { useState, useEffect } from "react";
import { getOrderItems } from "@/libs/API/Order_Items_API"; 
import Order_Items from "@/types/Order_Items"; 

export default function OrderItemsList({ orderId }: { orderId: number }) {
    
    const [items, setItems] = useState<Order_Items[]>([]);

    useEffect(() => {
        if (!orderId) return;

        const fetchItems = async () => {
            try {
                const data = await getOrderItems(orderId);
                setItems(data);
            } catch (error) {
                console.error(`Failed to fetch items for order ${orderId}:`, error);
            }
        };
        fetchItems();
    }, [orderId]);


    if (items.length === 0) {
        return <div>No items in this order.</div>;
    }

    return (
        <>
            {items.map(orderItem => (
                <div key={orderItem.itemId}> 
                    {orderItem.itemId} : {orderItem.quantity} : {orderItem.totalPrice}
                </div>
            ))}
        </>
    );
}