'use client';

import { useState, useEffect } from "react";

import Item from "@/types/Item"
import Order from "@/types/Order";
import Order_Items from "@/types/Order_Items";
import useCart from "./hooks/useCart";
import { getItems, searchItem } from "@/libs/API/ItemsAPI";
import { postOrder } from "@/libs/API/OrderAPI";
import { postOrderItems } from "@/libs/API/Order_Items_API";

import ItemGrid from "./components/ItemGrid";
import Popup from "./components/Popup";
import CartButton from "./components/CartButton";
import SearchBar from "./components/SearchBar";
import CartItem from "@/types/Cart";

export default function CustomerPage() {
    const [list, setList] = useState<Item[]>([]);
    const [activePopup, setActivePopup] = useState<"ITEM" | "CART" | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item>({
        id: 0,
        item_name: "",
        current_price: 0,
        size: "",
        stock_quantity: 0,
        reserve_quantity: 0,
        status: ""
    });
    const { cart, addItemToCart, removeItemFromCart } = useCart();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getItems();
                displayList(data);
            } catch (err) {
                console.error("Failed to fetch data");
            }
        }

        getData();
    }, []);

    const displayList = (items: Item[]) => {
        setList(items)
    }

    const getItem = (id: number) => {
        const item = list.find(i => i.id === id);
        setSelectedItem(item!);
    }

    const handleOpenItemPopup = (id: number) => {
        getItem(id)
        setActivePopup("ITEM");
    }

    const handleAddItemToCart = (item: Item, amount: number) => {
        addItemToCart(item, amount);
        setActivePopup(null);
    }

    const handleRemoveItemFromCart = (id : number) => {
        removeItemFromCart(id);
    }
    
    const handleCheckout = async (cart : CartItem[], address : string) => {
        try {
            const newOrder = await postOrder({
                orderDate: new Date(),
                address: address,
                status: "Pending",
                paymentStatus: "Unpaid" 
            });

            const orderId = newOrder.orderId

            try {
                const orderItems = cart.map(cart => ({
                    orderId : orderId,
                    itemId : cart.item.id,
                    quantity : cart.amount,
                    totalPrice : cart.amount * cart.item.current_price
                }));

                await postOrderItems(orderItems);
            } catch (err) {
                console.error("Items sent failed :", err);
            }
        } catch (err) {
            console.error("Checkout failed :", err);
        }
    }

    const checkNULL = (query: string) => {
        if (query == null || query == '') {
            return true;
        }
        return false;
    }

    const search = async (query : string) => {
        if (checkNULL(query)) {
            return;
        }
        const result = await searchItem(query);
        displayList(result);
    }

    return (
        <div>
            <SearchBar
                onSearch={search}
            />
            <CartButton
                onOpenCart={() => setActivePopup("CART")}
            />
            <ItemGrid
                items={list}
                onClickItem={handleOpenItemPopup}
            />
            <Popup
                activePopup={activePopup}
                item={selectedItem}
                cart={cart}
                onClose={() => setActivePopup(null)}
                onAddItemToCart={handleAddItemToCart}
                onRemoveItemFromCart={handleRemoveItemFromCart}
                onCreateOrder={handleCheckout}
            />
        </div>
    );
}