export default function StatusSelect() {
    return (
        <div className="flex bg-blue-400 w-fit mx-4 my-4 p-2 gap-5">
            <div className="hover:bg-blue-500">
            <button>All</button>
            </div>
            <div className="hover:bg-blue-500">
            <button>Awaiting Payment</button>
            </div>
            <div className="hover:bg-blue-500">
            <button>Paid</button>
            </div>
            <div className="hover:bg-blue-500">
            <button>Ready to Ship</button>
            </div>
            <div className="hover:bg-blue-500">
            <button>Shipped</button>
            </div>
            <div className="hover:bg-blue-500">
            <button>Completed</button>
            </div>
        </div>
    );
}