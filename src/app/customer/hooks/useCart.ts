import { useEffect, useState } from 'react';
import Item from '@/types/Item';
import CartItem from '@/types/Cart';

export default function useCart() {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addItemToCart = (item: Item, amount: number) => {
        if (amount <= 0)
            return;

        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(c => c.item.id === item.id);
            const updatedCart = [...prevCart];

            if (existingItemIndex >= 0) {
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    amount: updatedCart[existingItemIndex].amount + amount
                };
            } else {
                updatedCart.push({ item, amount });
            }

            return updatedCart;
        });
    };

    const clearCart = () => setCart([]);

    const removeItemFromCart = (id: number) => {
        setCart(prev => prev.filter(c => c.item.id !== id));
    };

    const updateItemAmountInCart = (id: number, amount: number) => {
        setCart(prev => {
            return prev.map(cartItem =>
                cartItem.item.id === id
                    ? { ...cartItem, amount }
                    : cartItem                
            );
        });
    };

    return { cart, addItemToCart, clearCart, removeItemFromCart, updateItemAmountInCart };
}
