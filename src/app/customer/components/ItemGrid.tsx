'use client';

import Item from "@/types/Item";
import ItemPane from "./ItemPane";

export default function ItemGrid({ items } : { items: Item[] }) {
    return (
        <div className="grid grid-cols-5 gap-3 m-4">
            {items.map((item) => (
                <ItemPane key={item.item_id} item={item} />
            ))}
        </div>
    );
}