'use client';

import { useState, useEffect } from "react"; // <-- Import hooks
import { X } from "lucide-react";
import Order from "@/types/Order";
import Image from "next/image";
import { getInvoiceByOrderId } from "@/libs/API/OrderAPI"; // <-- Import your API function

export default function InvoicePopup({
    order,
    onCloseInvoicePopup,
    onConfirmPayment,
}: {
    onCloseInvoicePopup: () => void;
    order : Order;
    onConfirmPayment: (orderId: number, receiptNo: string) => void;
}) {

    const [formData, setFormData] = useState("");
    const [totalAmount, setTotalAmount] = useState<number | null>(null);

    useEffect(() => {
        if (!order || order.orderId === 0) {
            return;
        }

        const fetchTotal = async () => {
            try {
                const amount = await getInvoiceByOrderId(order.orderId);
                setTotalAmount(amount); 
            } catch (error) {
                console.error(`Failed to fetch total for order ${order.orderId}:`, error);
                setTotalAmount(0);
            }
        };

        fetchTotal();
    }, [order.orderId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setFormData(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirmPayment(order.orderId, formData);
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className="flex flex-col bg-white p-6 rounded shadow-lg">
                <div className="flex justify-end mb-2">
                    <button onClick={onCloseInvoicePopup} className="cursor-pointer"><X /></button>
                </div>
                <p>Amount to paid : {totalAmount === null ? "Loading..." : `${totalAmount} ฿`}</p>
                <p>Account No. : 064-393-1516 KPlus</p>
                <Image 
                    src="/PromptPayQR.jpg"
                    alt="QR"
                    width={250}
                    height={250}
                    className="my-4 mx-auto"
                />
                <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                    <input
                        type="text"
                        name="recieptNo"
                        value={formData}
                        onChange={handleChange}
                        placeholder="Receipt No."
                        className="border rounded px-2"
                        required
                    />
                    <button type="submit" className={`${order.status === "Paid" ? "hidden" : "bg-blue-400 p-2 px-4 rounded-xl shadow-2xl hover:shadow hover:bg-blue-500"}`}>Confirm</button>
                </form>
            </div>
        </div>
    );
}