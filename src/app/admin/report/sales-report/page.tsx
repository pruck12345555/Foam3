"use client";
import { useState, useEffect } from "react";
import { getSalesReport } from "@/libs/API/OrderAPI";
import SalesReportData from "@/types/SalesReportData";


export default function SalesReportingPage() {
    const [report, setReport] = useState<SalesReportData | null>(null);
    const [startDate, setStartDate] = useState("2025-09-10");
  const [endDate, setEndDate] = useState("2025-10-10");

  const fetchReport = async () => {
    try {
      const data = await getSalesReport(startDate, endDate);
      setReport(data);
    } catch (error) {
      console.error("Failed to load report data:", error);
      alert("Failed to load report data");
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReport(); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="border border-gray-400 rounded-xl p-6 w-[360px] text-center">
        <h1 className="text-xl mb-4">Sales Reporting</h1>

        <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-500 rounded px-2 py-[2px] w-[120px] text-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-500 rounded px-2 py-[2px] w-[120px] text-sm"
          />
          <button type="submit" className="border border-gray-600 rounded-full px-3 py-[2px] text-sm hover:bg-gray-100">
            Search
          </button>
        </form>

        <div className="text-left text-sm space-y-2 mb-4">
          <p>
            <span className="inline-block w-40">Order Total</span> : {report?.orderTotal}
          </p>
          <p>
            <span className="inline-block w-40">Order Awaiting Payment</span> :{" "}
            {report?.awaitingPayment}
          </p>
          <p>
            <span className="inline-block w-40">Order Ready To Ship</span> :{" "}
            {report?.readyToShip}
          </p>
          <p>
            <span className="inline-block w-40">Order Completed</span> : {report?.completed}
          </p>
          <p>
            <span className="inline-block w-40">Total Income</span> : {report?.totalIncome} Baht
          </p>
        </div>

        <button className="border border-gray-600 rounded-full px-5 py-[2px] text-sm hover:bg-gray-100">
          Back
        </button>
      </div>
    </div>
  );
}
