export class Item {
    constructor (
        public item_id: number,
        public itemName: string,
        public currentPrice: number,
        public size: string,
        public stockQuantity: number,
        public reservedQuantity: number,
        public status: string
    ) {}
}