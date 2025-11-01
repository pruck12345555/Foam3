import { NextRequest, NextResponse } from "next/server";

const testOrderData = [
    {
        orderId : 1,
        customerId : 1,
        orderDate : new Date(),
        address : "12/35",
        trackingNo : "0000001",
        status : "Awaiting Payment",
    }, 
    {
        orderId: 2,
        customerId : 1,
        orderDate: new Date(),
        address: "46/75",
        trackingNo: "0000002",
        status: "Paid",
    },
    {
        orderId: 3,
        customerId : 2,
        orderDate: new Date(),
        address: "96/87",
        trackingNo: "0000003",
        status: "Ready to Ship",
    }
    ];

let lastId = 3;

export async function GET() {
    return NextResponse.json(testOrderData);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newOrder = { id: lastId + 1, ...body };
    testOrderData.push(newOrder);
    lastId = lastId + 1;
    return NextResponse.json(newOrder)
}

export async function PUT(req: NextRequest) {
    const updatedOrder = await req.json();
    const index = testOrderData.findIndex(i => i.orderId === updatedOrder.orderId);

    if (index === -1) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    testOrderData[index] = updatedOrder;

    return NextResponse.json(testOrderData[index]);
}