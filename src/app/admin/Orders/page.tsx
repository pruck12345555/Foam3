'use client';

import Order from "@/types/Order";
import { getOrders, updateOrderStatus, updateOrderTrackingNo } from "@/libs/API/OrderAPI";
import { useEffect, useState } from "react";

import OrderList from "../components/OrderList";

export default function OrdersManagement() {
    const [list, setList] = useState<Order[]>([])

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
        setList(orders)
    }

    const changeOrderStatus = async (id : number , status : string) => {
        await updateOrderStatus(id , status);
    }

    const setTrackingNo = async (id : number, trackNo : string) => {
        await updateOrderStatus(id, "Shipped")
        await updateOrderTrackingNo(id, trackNo);
    }

    return (
        <div>
            <OrderList
                list={list}
                onReadyToShip={(id : number) => changeOrderStatus(id, "Ready to Ship")}
                onShipping={(id : number, trackNo : string) => setTrackingNo(id, trackNo)}
                onCompleteOrder={(id : number) => changeOrderStatus(id, "Completed")}
            />
        </div>
    );
}