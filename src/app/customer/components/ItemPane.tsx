'use client';

import Item from "@/types/Item";
import Image from "next/image";
import CartItem from "@/types/Cart";

export default function ItemPane( { 
    item,
    onClickItem,
    cart
} : {
    item : Item;
    onClickItem : () => void;
    cart: CartItem[];
} ) {

    const cartItem = cart.find(c => c.item.itemId === item.itemId);
    const inCartAmount = cartItem ? cartItem.amount : 0;
    const remainingStock = item.stockQuantity - item.reservedQuantity - inCartAmount;

    return (
        <div className="outline-2 rounded-xl p-3" onClick={onClickItem}>
            <Image 
                src="/box.svg"
                alt="Box"
                width={100}
                height={100}
                className="mx-auto"
            />
            <p>{item.itemName}</p>
            <p>Price : {item.currentPrice} ฿</p>
            <p>Size : {item.size}</p>
            <p>In stock : {remainingStock < 0 ? 0 : remainingStock}</p>
        </div>
    );
}