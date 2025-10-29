import Order_Items from "@/types/Order_Items"

const API_URL = "http://localhost:8080/api/order_items"; // Base URL
export const getOrder_Items = async (): Promise<Order_Items[]> => {
    try {
        // Fetch from the base API URL (e.g., GET http://localhost:8080/api/items)
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
           const errorText = await response.text();
           console.error("Failed to fetch order items:", response.status, errorText);
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching order items:", error);
        throw error;
    }
};

// export async function getOrder_Items() {
//     const res = await fetch("http://localhost:3000/testOrderData");
//     const data = await res.json();
//     return data;
// }

export async function postOrderItems(orderItems : Order_Items[]) {
    const res = await fetch(API_URL, {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify(orderItems),
    });

    if (!res.ok) {
        throw new Error('Failed to post order items');
    }

    return res.json(); // Return the server's response
}

// export async function postOrderItems(orderItems : Order_Items[]) {
//     const res = await fetch("http://localhost:3000/testOrderData", {
//         method : "POST",
//         headers : { "Content-Type" : "application/json" },
//         body : JSON.stringify(orderItems),
//     });
// }

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