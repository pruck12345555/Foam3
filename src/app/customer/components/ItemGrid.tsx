'use client';

import Item from "@/types/item";
import ItemPane from "./ItemPane";

export default function ItemGrid( { 
    items,
    onClickItem
} : { 
    items: Item[]; 
    onClickItem : (id : number) => void;
} ) {
    return (
        <div className="grid grid-cols-5 gap-3 m-4">
            {items.map((item) => (
                <ItemPane key={item.itemId} item={item} onClickItem={() => onClickItem(item.itemId)} />
            ))}
        </div>
    );
}