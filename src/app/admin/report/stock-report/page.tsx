"use client";
import { useState, useEffect } from "react";
import { getStockReport } from "@/libs/API/ItemsAPI"; 
import StockReportData from "@/types/StockReportData";
import { useRouter } from "next/navigation";

export default function StockReportingPage() {
  const router = useRouter();
  const [report, setReport] = useState<StockReportData | null>(null);
  
  const fetchReport = async () => {
    try {
      const data = await getStockReport();
      setReport(data);
    } catch (error) {
      console.error("Failed to load report data:", error);
      alert("Failed to load report data");
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="border border-gray-400 rounded-xl p-6 w-[360px] text-center">
        <h1 className="text-xl mb-4">Stock Reporting</h1>
        <div className="text-left text-sm space-y-2 mb-4">
          <p>
            <span className="inline-block w-40">Item Total</span> : {report?.itemTotal}
          </p>
          <p>
            <span className="inline-block w-40">Item Available</span> :{" "}
            {report?.itemAvailable}
          </p>
          <p>
            <span className="inline-block w-40">Item Discontinued</span> :{" "}
            {report?.itemDiscontinued}
          </p>
          <p>
            <span className="inline-block w-40">Total Reserved Quantity</span> : {report?.totalReservedQuantity} Items
          </p>
          <p>
            <span className="inline-block w-40">Total Stock Quantity</span> : {report?.totalStockQuantity} Items
          </p>
        </div>

        <button className="border border-gray-600 rounded-full px-5 py-[2px] text-sm hover:bg-gray-100" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}
