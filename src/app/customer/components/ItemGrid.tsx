'use client';

import Item from "@/types/Item";
import ItemPane from "./ItemPane";
import CartItem from "@/types/Cart";

export default function ItemGrid( { 
    items,
    onClickItem,
    cart
} : { 
    items: Item[]; 
    onClickItem : (id : number) => void;
    cart: CartItem[];
} ) {
    return (
        <div className="grid grid-cols-5 gap-3 m-4">
            {items.map((item) => (
                <ItemPane key={item.itemId} item={item} onClickItem={() => onClickItem(item.itemId)} cart={cart} />
            ))}
        </div>
    );
}