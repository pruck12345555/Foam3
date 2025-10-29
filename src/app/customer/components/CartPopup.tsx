import CartItem from "@/types/Cart";
import Image from "next/image";

import { X } from "lucide-react";
import { useState } from "react";

export default function CartPopup({
    cart,
    onCloseCartPopup,
    onRemoveItemFromCart,
    onClickCreateOrder
}: {
    cart: CartItem[];
    onCloseCartPopup : () => void;
    onRemoveItemFromCart : (id : number) => void;
    onClickCreateOrder : (cart : CartItem[], formData : string) => void;
}) {

    const [formData, setFormData] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setFormData(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClickCreateOrder(cart, formData);
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className="bg-white p-6 rounded shadow-lg">
                <div className="flex justify-end mb-2">
                    <button onClick={onCloseCartPopup} className="cursor-pointer"><X /></button>
                </div>
                <div className={`min-w-[50vw] ${cart.length === 0 ? "flex justify-center items-center" : "grid grid-cols-5 gap-3 m-4"}`}>
                    {cart.length === 0 ? (<p className="grid-cols-3">No item in cart</p>) : 
                    (cart.map(({ item, amount }) => 
                            (
                            <div key={item.id} className="border-2 rounded-xl p-3">
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => onRemoveItemFromCart(item.id)} className="cursor-pointer"><X /></button>
                                </div>
                                <Image
                                    src="/box.svg"
                                    alt="Box"
                                    width={50}
                                    height={50}
                                    className="mx-auto"
                                />
                                <p>{item.item_name}</p>
                                <p>Size : {item.size}</p>
                                <p>Amount : {amount}</p>
                                <p>Total price : {item.current_price * amount}</p>
                            </div>
                            )
                        )
                    )}
                </div>
                {cart.length === 0 ? (<p></p>) : (
                    <div className="flex gap-2">
                        <form onSubmit={handleSubmit} className="flex-grow">
                            <input
                                type="text"
                                name="address"
                                value={formData}
                                onChange={handleChange}
                                placeholder="Address"
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </form>
                        <button type="submit" className="bg-blue-400 p-2 px-4 rounded-xl shadow-2xl hover:shadow hover:bg-green-500">Create Order</button>
                    </div>
                )}
            </div>
        </div>
    );
}