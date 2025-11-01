import Order from "@/types/Order";
import InvoicePopup from "./InvoicePopup";

export default function OrderHistoryPagePopup({
    order,
    activePopup,
    onCloseInvoicePopup
}: {
    order : Order
    activePopup: "INVOICE" | null;
    onCloseInvoicePopup : () => void;
}) {

    switch (activePopup) {
        case "INVOICE":
            return (
                <InvoicePopup
                    order={order}
                    onCloseInvoicePopup={onCloseInvoicePopup}
                />
            );

        default:
            return null;
    }
}