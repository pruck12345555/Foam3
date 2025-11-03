import Order from "@/types/Order";
import InvoicePopup from "./InvoicePopup";

export default function OrderHistoryPagePopup({
    order,
    activePopup,
    onCloseInvoicePopup,
    onConfirmPayment
}: {
    order : Order
    activePopup: "INVOICE" | null;
    onCloseInvoicePopup : () => void;
    onConfirmPayment: (orderId: number, receiptNo: string) => void;
}) {

    switch (activePopup) {
        case "INVOICE":
            return (
                <InvoicePopup
                    order={order}
                    onCloseInvoicePopup={onCloseInvoicePopup}
                    onConfirmPayment={onConfirmPayment}
                />
            );

        default:
            return null;
    }
}