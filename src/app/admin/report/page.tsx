'use client'; 

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleSalesReport = () => {
        router.push('/admin/report/sales-report');
    }

    const handleStockReport = () => {
        router.push('/admin/report/stock-report');
    }

    return (
    <main className="flex min-h-screen items-center justify-center">
      
      <div className="flex flex-col gap-4"> 
        
        <button 
          className="rounded-lg bg-gray-200 px-6 py-3 text-black shadow hover:bg-blue-600"
          onClick={handleSalesReport}
        >
          Sales-Report
        </button>
        
        <button 
          className="rounded-lg bg-gray-200 px-6 py-3 text-black shadow hover:bg-gray-300"
          onClick={handleStockReport}
        >
            Stock-Report
        </button>

      </div>
    </main>
  );
}