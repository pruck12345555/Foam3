'use client';

import Order from "@/types/Order";

export default function OrderList( { 
    list,
    onClickOrder
} : {
    list : Order[];
    onClickOrder : (id : number) => void;
} ) {

    //TODO : Pull total amount from invoice
    return (
        <div className="flex flex-col m-4 gap-2">
            {list.map(order => (
                <div key={order.orderId} className="outline-2 rounded-xl p-3" >
                    <p>ID : {order.orderId}</p>
                    <p>Address : {order.address}</p>
                    <p>Date : {String(order.orderDate)}</p>
                    <p>Tracking No. : {order.trackingNo}</p>
                    <p>Status : {order.status}</p>
                    <p>Total Amount : 100</p>
                    <button className={`${order.status === "Paid" ? "hidden" : "bg-blue-400 p-2 px-4 mt-2 rounded-xl shadow-2xl hover:shadow hover:bg-blue-500"}`} onClick={() => onClickOrder(order.orderId)}>Pay</button>
                </div>

            ))}
            
        </div>
    );
}