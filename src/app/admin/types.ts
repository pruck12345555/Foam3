export interface ItemProps {
    item_id: number;
    title: string;
    onClickDelete: (item_id: number) => void;
}

export interface ItemAddButtonProps {
    onClickAdd: () => void;
}

//TODO Add reserve quantity
export interface Item {
    item_id: number,
    itemName: string,
    current_price: number,
    size: string,
    stock_quantity: number,
    reserved_quantity: number,
    status: string
};