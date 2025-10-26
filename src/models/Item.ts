export class Item {
    constructor (
        public item_id: number,
        public itemName: string,
        public current_price: number,
        public size: string,
        public stock_quantity: number,
        public reserved_quantity: number,
        public status: string
    ) {}
}