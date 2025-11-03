'use client';

import Order from "@/types/Order";
import InvoiceTotal from "./InvoiceTotal"; 
import OrderItemsList from "./OrderItemsList";

export default function OrderList( { 
    list,
    onClickOrder
} : {
    list : Order[];
    onClickOrder : (id : number) => void;
} ) {

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
                        <InvoiceTotal orderId={order.orderId} />
                        <button className={`${order.status !== "Awaiting Payment" ? "hidden" : "bg-blue-400 p-2 px-4 mt-2 rounded-xl shadow-2xl hover:shadow hover:bg-blue-500"}`} onClick={() => onClickOrder(order.orderId)}>Pay</button>
                    </div>
                    <div className="flex-1 gap-3">
                        <OrderItemsList orderId={order.orderId} />
                    </div>
                </div>
            ))}
        </div>
    );
}