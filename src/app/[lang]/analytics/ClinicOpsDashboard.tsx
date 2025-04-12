"use client";
import React, { Suspense, useState } from "react";
import ClinicOpsCharts from "@/components/ClinicOpsCharts";

export default function PatientOutcomeDashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Cost of Medications and Supplies",
            value: "$5000",
            change: "+0.1%",
            previous: "$4999",
            isPositive: true,
          },
          {
            title: "Account Receivable (A/R) Days",
            value: "45 days",
            change: "+4.3%",
            previous: "43 days",
            isPositive: true,
          },
          {
            title: "Patient Billing Turnaround Time",
            value: "14 days",
            change: "+7.7%",
            previous: "13 days",
            isPositive: true,
          },
          {
            title: "Claim Denial Rate",
            value: "8.5%",
            change: "-5.6%",
            previous: "9%",
            isPositive: false,
          }
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="text-sm text-gray-600 mb-3">{kpi.title}</div>
            <div className="text-3xl font-bold text-gray-500">{kpi.value}</div>
            <div className="text-sm mt-3 flex items-center justify-between w-full">
              <div className="flex-1 flex flex-col items-start text-left">
                <span className={`${kpi.isPositive ? "text-green-600" : "text-red-600"} font-semibold`}>
                  {kpi.change}
                </span>
                <div className="text-xs text-gray-500">Versus</div>
              </div>

              <div className="h-6 w-px bg-gray-300 border-r border-dashed mx-4"></div>

              <div className="flex-1 flex flex-col items-start text-left">
                <span className="text-gray-700">{kpi.previous}</span>
                <div className="text-xs text-gray-500 whitespace-nowrap">Previous day</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ClinicOpsCharts />
      </div>
    </div>
  );
}
