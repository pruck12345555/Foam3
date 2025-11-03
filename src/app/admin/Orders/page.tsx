'use client';

import { useState, useEffect } from "react";
import Order from "@/types/Order"; 
import { getOrders, updateOrderStatus, updateOrderTrackingNo } from "@/libs/API/OrderAPI";
import OrderList from "../components/OrderList";
import OrdersTopBar from "../components/OrdersTopBar";
import StatusSelect from "../components/StatusSelect";

export default function OrdersManagement() {
    const [list, setList] = useState<Order[]>([]); 
    
    const [selectedStatus, setSelectedStatus] = useState<string>("All");

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getOrders();
                displayList(data);
            } catch (err) {
                console.error("Failed to fetch data");
            }
        }
        getData();
    }, []);

    const displayList = (orders: Order[]) => {
        setList(orders);
    }
    
    const changeOrderStatus = async (id : number , status : string) => {
        await updateOrderStatus(id , status);
        // Optimistically update the list without a full refetch
        setList(prevList => prevList.map(order => 
            order.orderId === id ? { ...order, status: status } : order
        ));
    }

    const setTrackingNo = async (id : number, trackNo : string) => {
        await updateOrderStatus(id, "Shipped")
        await updateOrderTrackingNo(id, trackNo);
         // Optimistically update the list
         setList(prevList => prevList.map(order => 
            order.orderId === id ? { ...order, status: "Shipped", trackingNo: trackNo } : order
        ));
    }

    const filteredList = list.filter(order => {
        if (selectedStatus === "All") {
            return true; // Show all
        }
        return order.status === selectedStatus;
    });

    return (
        <div>
            <OrdersTopBar/>
            
            {/* --- 3. PASS THE HANDLER to StatusSelect --- */}
            <StatusSelect onStatusSelect={setSelectedStatus} />
            
            <OrderList
                // --- 4. PASS THE FILTERED LIST to OrderList ---
                list={filteredList} 
                onReadyToShip={(id : number) => changeOrderStatus(id, "Ready to Ship")}
                onShipping={(id : number, trackNo : string) => setTrackingNo(id, trackNo)}
                onCompleteOrder={(id : number) => changeOrderStatus(id, "Completed")}
            />
        </div>
    );
}