import Image from "next/image";
import  Item  from "@/types/item"

export default function ItemList({ list, onClickItem } : { list : Item[]; onClickItem : (itemId : number) => void; }) {
    console.log("Checking keys in ItemList:", list.map(item => item.itemId));
    console.log("Full list data in ItemList:", list);
    return (
        <div className="grid grid-cols-5 gap-3 m-4">
            {list.map(item => (
                <div key={item.itemId} className="outline-2 rounded-xl p-3" onClick={() => onClickItem(item.itemId)}>
                    <Image 
                        src="/box.svg"
                        alt="Box"
                        width={100}
                        height={100}
                        className="mx-auto"
                    />
                    <p>ID : {item.itemId}</p>
                    <p>{item.itemName}</p>
                    <p>{item.currentPrice} ฿</p>
                    <p>Size : {item.size}</p>
                    <p>Stock : {item.stockQuantity}</p>
                    <p>Reserved : {item.reservedQuantity}</p>
                    <p>Status : {item.status}</p>
                </div>
            ))}
        </div>
    );
}