'use client';

import { useState } from "react";

import AddItemPopup from "./AddItemPopup";
import ItemDetailPopup from "./ItemDetailPopup";
import ItemDiscontinueConfirmPopup from "./ItemDiscontinueConfirmPopup";
import Item from "@/types/item";

export default function ItemManagementPopup({
    activePopup,
    item,
    onClose,
    onAddItem,
    onUpdateItem,
    onOpenConfirmPopup,
    onOpenLastItemDetailPopup
} : {
    activePopup : "DETAIL" | "ADD" | "CONFIRM" | null;
    item : Item
    onClose : () => void;
    onAddItem : (item: Omit<Item, "itemId">) => void;
    onUpdateItem : (item : Item) => void;
    onOpenConfirmPopup : () => void;
    onOpenLastItemDetailPopup : () => void;
} ) {

    const [discontinueAction, setDiscontinueAction] = useState<(() => void)>(() => { });

    switch (activePopup) {
        case "ADD":
            return (
                <AddItemPopup
                    onCloseNewItemPopup={onClose}
                    onClickAddItem={onAddItem}
                />
            );

        case "DETAIL":
            return (
                <ItemDetailPopup
                    item={item}
                    onClickUpdateItem={onUpdateItem}
                    onCloseItemDetailPopup={onClose}
                    onOpenItemDiscontinueConfirmPopup={onOpenConfirmPopup}
                    setDiscontinueAction={setDiscontinueAction}
                />
            );

        case "CONFIRM":
            return (
                <ItemDiscontinueConfirmPopup
                    onNo={onClose}
                    onOpenLastItemDetailPopup={onOpenLastItemDetailPopup}
                    onConfirm={discontinueAction}
                />
            );

        default:
            return null;
    }
}