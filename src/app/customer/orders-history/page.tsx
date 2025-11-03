'use client';

import OrderList from "../components/OrderList";
import Order from "@/types/Order";
import { useEffect, useState } from "react";
import { getOrdersById, paidInvoice } from "@/libs/API/OrderAPI";
import OrderHistoryTopBar from "../components/OrderHistoryTopBar";
import OrderHistoryPagePopup from "../components/OrderHistoryPagePopup";
import { useRouter } from "next/navigation";

export default function OrdersHistoryPage() {
    const router = useRouter();
    const [selectedOrder, setSelectedOrder] = useState<Order>({
        orderId : 0,
        customerId : 0,
        orderDate : new Date(),
        address : "",
        trackingNo : "",
        status : ""
    })
    const [list, setList] = useState<Order[]>([])
    const [activePopup, setActivePopup] = useState<"INVOICE" | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getOrdersById(Number(localStorage.getItem("userId")));
                displayList(data);
            } catch (err) {
                console.error("Failed to fetch data");
            }
        }

        getData();
    }, []);

    const displayList = (orders: Order[]) => {
        setList(orders)
    }
    
    const getSelectedOrder = (id : number) => {
        const order = list.find(i => i.orderId === id);
        setSelectedOrder(order!);
    }

    const handleOpenInvoicePopup = (id : number) => {
        getSelectedOrder(id);
        setActivePopup("INVOICE")
    }

    const openUserMenu = () => {
        router.push("/customer/profile-change");
    }

    const handleConfirmPayment = async (orderId: number, receiptNo: string) => {
        try {
            await paidInvoice(orderId, receiptNo);

            setActivePopup(null); 
            
            const data = await getOrdersById(Number(localStorage.getItem("userId"))); 
            displayList(data);

        } catch (err) {
            console.error("Failed to confirm payment:", err);
            alert("Payment confirmation failed. Please try again.");
        }
    };

    return (
        <div>
            <OrderHistoryTopBar
                onClickPfp={openUserMenu}
            />
            <OrderList
                onClickOrder={handleOpenInvoicePopup}
                list={list}
            />
            <OrderHistoryPagePopup
                activePopup={activePopup}
                order={selectedOrder}
                onCloseInvoicePopup={() => setActivePopup(null)}
                onConfirmPayment={handleConfirmPayment}
            />
        </div>
    );
}