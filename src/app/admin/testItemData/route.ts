import { NextRequest, NextResponse } from "next/server";

const testItemData = [
        { itemId: 1, itemName: "Box A", currentPrice: 10, size: "S", stockQuantity: 10, status: "Active"},
        { itemId: 2, itemName: "Box B", currentPrice: 20, size: "M", stockQuantity: 20, status: "Discontinued"},
        { itemId: 3, itemName: "Box C", currentPrice: 30, size: "L", stockQuantity: 30, status: "Active"},
    ];

let lastId = 3;

export async function GET() {
    return NextResponse.json(testItemData);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newItem = { id: lastId + 1, ...body };
    testItemData.push(newItem);
    lastId = lastId + 1;
    return NextResponse.json(newItem)
}

export async function PUT(req: NextRequest) {
    const updatedItem = await req.json(); // Expect full Item with id
    const index = testItemData.findIndex(i => i.itemId === updatedItem.itemId);

    if (index === -1) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    testItemData[index] = updatedItem;

    return NextResponse.json(testItemData[index]);
}