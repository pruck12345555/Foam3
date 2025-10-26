export interface ItemProps {
    itemId: number;
    title: string;
    onClickDelete: (itemId: number) => void;
}

export interface ItemAddButtonProps {
    onClickAdd: () => void;
}

//TODO Add reserve quantity
export interface Item {
    itemId: number,
    itemName: string,
    currentPrice: number,
    size: string,
    stockQuantity: number,
    reservedQuantity: number,
    status: string
};