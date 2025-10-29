import Order_Items from "@/types/Order_Items"

export async function getOrder_Items() {
    const res = await fetch("http://localhost:3000/testOrderData");
    const data = await res.json();
    return data;
}

export async function postOrderItems(orderItems : Order_Items[]) {
    const res = await fetch("http://localhost:3000/testOrderData", {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify(orderItems),
    });
}

export async function searchOrderItems(query : string) {
    const res = await fetch(`http://localhost:3000/testOrderData?search=${query}`);
    const data = await res.json();
    return data;
}

export async function updateItem(orderItems : Order_Items) {
    const res = await fetch("http://localhost:3000/testOrderData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItems),
    });

    const data = await res.json();
    return data;
}