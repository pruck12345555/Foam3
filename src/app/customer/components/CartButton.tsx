import { ShoppingCart } from "lucide-react";

export default function CartButton( { 
    onOpenCart 
} : { 
    onOpenCart : () => void; 
} ) {
    return (
        <div className="fixed bottom-7 right-7 inline-flex rounded-full border-2">
            <ShoppingCart className="m-1.5" onClick={onOpenCart}/>
        </div>
    );
}