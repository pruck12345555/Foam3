'use client';

// Define the prop 'onStatusSelect' which is a function that takes a string
export default function StatusSelect({ 
    onStatusSelect 
} : { 
    onStatusSelect: (status: string) => void;
}) {
    
    // Helper to make code cleaner
    const handleClick = (status: string) => {
        onStatusSelect(status);
    };

    return (
        <div className="flex bg-blue-400 w-fit mx-4 my-4 p-2 gap-5">
            {/* Add onClick handlers to each button */}
            <div className="hover:bg-blue-500">
                <button onClick={() => handleClick("All")}>All</button>
            </div>
            <div className="hover:bg-blue-500">
                <button onClick={() => handleClick("Awaiting Payment")}>Awaiting Payment</button>
            </div>
            <div className="hover:bg-blue-500">
                <button onClick={() => handleClick("Paid")}>Paid</button>
            </div>
            <div className="hover:bg-blue-500">
                <button onClick={() => handleClick("Ready to Ship")}>Ready to Ship</button>
            </div>
            <div className="hover:bg-blue-500">
                <button onClick={() => handleClick("Shipped")}>Shipped</button>
            </div>
            <div className="hover:bg-blue-500">
                <button onClick={() => handleClick("Completed")}>Completed</button>
            </div>
        </div>
    );
}