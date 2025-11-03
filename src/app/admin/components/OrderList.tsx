'use client';

import Order from "@/types/Order";
import { useState } from "react";

export default function OrderList( { 
    list,
    onReadyToShip,
    onShipping,
    onCompleteOrder
} : {
    list : Order[];
    onReadyToShip : (id : number) => void;
    onShipping : (id : number, trackNo : string) => void;
    onCompleteOrder : (id : number) => void;
} ) {
    
    const [trackNo, setTrackNo] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTrackNo(value);
    };

    return (
            <div className="flex flex-col m-4 gap-2">
                {list.map(order => (
                    <div key={order.orderId} className="flex outline-2 rounded-xl p-3" >
                        <div className="flex-1">
                            <p>ID : {order.orderId}</p>
                            <p>Address : {order.address}</p>
                            <p>Date : {String(order.orderDate)}</p>
                            <p>Tracking No. : {order.trackingNo}</p>
                            <p>Status : {order.status}</p>
                            <div className="flex gap-2">
                                <button className={`${order.status !== "Paid" ? "hidden" : "border-2 rounded-2xl p-2"}`} onClick={() => onReadyToShip(order.orderId)}>Ready to Ship</button>
                                <div>
                                    <input
                                        type="text"
                                        name="trackNo"
                                        value={trackNo}
                                        onChange={handleChange}
                                        placeholder="Item Name"
                                        className={`${order.status !== "Ready to Ship" ? "hidden" : "border rounded px-3 py-2"}`}
                                        required
                                    />
                                    <button className={`${order.status !== "Ready to Ship" ? "hidden" : "border-2 rounded-2xl p-2"}`} onClick={() => onShipping(order.orderId, trackNo)}>Set Tracking No</button>
                                </div>
                                <button className={`${order.status !== "Shipped" ? "hidden" : "border-2 rounded-2xl p-2"}`} onClick={() => onCompleteOrder(order.orderId)}>Completed</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
}