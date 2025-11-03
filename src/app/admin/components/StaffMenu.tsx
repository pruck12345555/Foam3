'use client';

import { Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StaffMenu() {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(true);

    const goTo = (path: string) => {
        router.push(`/admin/${path}`);
    };

    return (
        <div>

            <div className="fixed top-4 left-4 z-50">
                <Menu
                    onClick={() => setCollapsed(prev => !prev)}
                    className="hover:border-2 cursor-pointer"
                />
            </div>


            <div
                className={`fixed top-0 left-0 h-screen bg-blue-400 transition-all duration-300
                ${collapsed ? '-translate-x-full' : 'translate-x-0 w-1/6'}`}
            >
                <div className="mt-16 flex flex-col w-full text-center">
                    <button
                        onClick={() => goTo('ItemManagement')}
                        className="hover:bg-blue-500 p-1 cursor-pointer"
                    >
                        Items Management
                    </button>
                    <button
                        onClick={() => goTo('Orders')}
                        className="hover:bg-blue-500 p-1 cursor-pointer"
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => goTo('report/sales-report')}
                        className="hover:bg-blue-500 p-1 cursor-pointer"
                    >
                        Sales Report
                    </button>
                    <button
                        onClick={() => goTo('report/stock-report')}
                        className="hover:bg-blue-500 p-1 cursor-pointer"
                    >
                        Stock Report
                    </button>
                </div>
            </div>
        </div>
    );
}
