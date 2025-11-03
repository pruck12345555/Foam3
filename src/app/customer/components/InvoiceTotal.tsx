'use client';

import { useState, useEffect } from "react";
import { getInvoiceByOrderId } from "@/libs/API/OrderAPI"; 

export default function InvoiceTotal({ orderId }: { orderId: number }) {
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const amount = await getInvoiceByOrderId(orderId);
                setTotal(amount);
            } catch (error) {
                console.error(`Failed to fetch total for order ${orderId}:`, error);
                setTotal(0); 
            }
        };

        fetchTotal();
    }, [orderId]); 

    if (total === null) {
        return <p>Total Amount : Failed to load</p>;
    }
    return <p>Total Amount : {total} ฿</p>;
}