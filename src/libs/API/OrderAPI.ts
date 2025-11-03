import Order from "@/types/Order"
import ReportData from "@/types/SalesReportData";
import StockReportData from "@/types/StockReportData";
const API_URL = "http://localhost:8080/api/orders"; // Base URL

export const getOrders = async (): Promise<Order[]> => {
    try {
        // Fetch from the base API URL (e.g., GET http://localhost:8080/api/orders)
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
           const errorText = await response.text();
           console.error("Failed to fetch orders:", response.status, errorText);
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

// export async function getOrders() {
//     const res = await fetch("http://localhost:3000/testOrderData");
//     const data = await res.json();
//     return data;
// }

// export async function postOrder(order : Omit<Order, "orderId">) {
//     const res = await fetch("http://localhost:3000/testOrderData", {
//         method : "POST",
//         headers : { "Content-Type" : "application/json" },
//         body : JSON.stringify(order),
// 
export async function getOrdersById(id : number) {
    const res = await fetch(`${API_URL}/orderId?id=${id}`);
    const data = await res.json();
    return data;
}

export const postOrder = async (orderData: Omit<Order, "orderId">): Promise<Order> => {
  try {
    const response = await fetch(API_URL, { // POST goes to the base /api/items URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the form data (without id) as JSON
      body: JSON.stringify(orderData), 
    });

    if (!response.ok) {
      // If the server responded with an error, log it and throw an error
      const errorText = await response.text();
      console.error("Failed to post order:", response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response (the created order, including its new ID)
    const createdOrder: Order = await response.json();
    console.log("Item created successfully:", createdOrder);
    return createdOrder; // Return the full order object from the backend

  } catch (error) {
    console.error("Error sending post request:", error);
    // Re-throw the error so the component knows something went wrong
    throw error; 
  }
};

// export async function postOrder(order : Omit<Order, "orderId">) {
//     const res = await fetch("http://localhost:3000/testOrderData", {
//         method : "POST",
//         headers : { "Content-Type" : "application/json" },
//         body : JSON.stringify(order),
//     });
// 
//     return res.json();
// }

export async function searchOrder(query : string) {
    const res = await fetch(`http://localhost:3000/testOrderData?search=${query}`);
    const data = await res.json();
    return data;
}

export async function updateOrder(order : Order) {
    const res = await fetch("http://localhost:3000/testOrderData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });

    const data = await res.json();
    return data;
}

export async function updateOrderStatus(orderId : number, status : string) {
    const res = await fetch(`${API_URL}/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status : status }),
    });
}

// export async function updateOrderStatus(orderId : number, status : string) {
//     const res = await fetch(`http://localhost:3000/orders/${orderId}/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status : status }),
//     });
// }

export async function updateOrderTrackingNo(orderId: number, trackingNo : string) {
    const res = await fetch(`${API_URL}/${orderId}/trackingNo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNo : trackingNo }),
    });
}

export async function paidInvoice(orderId: number, receiptNo: string) {
    const res = await fetch(`http://localhost:8080/api/invoices/paid/${orderId}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // Send a JSON object with a 'receiptNo' key
        body: JSON.stringify({ receiptNo: receiptNo }), 
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update receipt: ${errorText}`);
    }
    return res.json();
}

export async function getInvoiceByOrderId(orderId: number) : Promise<number> {
    const res = await fetch(`http://localhost:8080/api/invoices/totalAmount/${orderId}`);
    return await res.json();
}

export async function getSalesReport(startDate: string, endDate: string): Promise<ReportData> {
    // Pass dates as query parameters
    const response = await fetch(`${API_URL}/salesReport?startDate=${startDate}&endDate=${endDate}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch sales report");
    }
    return response.json();
}

// export async function updateOrderTrackingNo(orderId: number, trackingNo : string) {
//     const res = await fetch(`http://localhost:3000/orders/${orderId}/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ trackingNo : trackingNo }),
//     });
// }

