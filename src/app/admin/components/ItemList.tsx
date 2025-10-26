import Image from "next/image";
import { Item } from "@/app/admin/types"

export default function ItemList({ list, onClickItem } : { list : Item[]; onClickItem : (item_id : number) => void; }) {
    console.log("Checking keys in ItemList:", list.map(item => item.item_id));
    console.log("Full list data in ItemList:", list);
    return (
        <div className="grid grid-cols-5 gap-3 m-4">
            {list.map(item => (
                <div key={item.item_id} className="outline-2 rounded-xl p-3" onClick={() => onClickItem(item.item_id)}>
                    <Image 
                        src="/box.svg"
                        alt="Box"
                        width={100}
                        height={100}
                        className="mx-auto"
                    />
                    <p>ID : {item.item_id}</p>
                    <p>{item.itemName}</p>
                    <p>{item.current_price} ฿</p>
                    <p>Size : {item.size}</p>
                    <p>Stock : {item.stock_quantity}</p>
                    <p>Status : {item.status}</p>
                </div>
            ))}
        </div>
    );
}