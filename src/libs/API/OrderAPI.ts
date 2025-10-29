import Order from "@/types/Order"

export async function getOrders() {
    const res = await fetch("http://localhost:3000/testOrderData");
    const data = await res.json();
    return data;
}

export async function postOrder(order : Omit<Order, "orderId">) {
    const res = await fetch("http://localhost:3000/testOrderData", {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify(order),
    });

    return res.json();
}

export async function searchOrder(query : string) {
    const res = await fetch(`http://localhost:3000/testOrderData?search=${query}`);
    const data = await res.json();
    return data;
}

export async function updateItem(order : Order) {
    const res = await fetch("http://localhost:3000/testOrderData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });

    const data = await res.json();
    return data;
}