import Item from "@/types/Item";
import ItemPopup from "./ItemPopup";
import CartPopup from "./CartPopup";
import CartItem from "@/types/Cart";

export default function StorePopup({
    activePopup,
    item,
    cart,
    onClose,
    onAddItemToCart,
    onRemoveItemFromCart,
    onCreateOrder
}: {
    activePopup: "ITEM" | "CART" | null;
    item: Item;
    cart: CartItem[];
    onClose: () => void;
    onAddItemToCart: (item: Item, amount: number) => void;
    onRemoveItemFromCart: (id: number) => void;
    onCreateOrder: (cart: CartItem[], formData: string) => void;
}) {

    switch (activePopup) {
        case "ITEM":
            return (
                <ItemPopup
                    item={item}
                    onCloseItemPopup={onClose}
                    sendData={onAddItemToCart}
                    cart={cart}
                />
            );

        case "CART":
            return (
                <CartPopup
                    cart={cart}
                    onCloseCartPopup={onClose}
                    onRemoveItemFromCart={onRemoveItemFromCart}
                    onClickCreateOrder={onCreateOrder}
                />
            );

        default:
            return null;
    }
}