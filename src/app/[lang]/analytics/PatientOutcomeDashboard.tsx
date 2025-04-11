"use client";
import React, { Suspense, useState } from "react";
import BarChart from "@/components/BarChart";

export default function PatientOutcomeDashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Patients Visited",
            value: "33",
            change: "10%",
            previous: "30",
            isPositive: true,
          },
          {
            title: "Average Patient Wait Time",
            value: "15mins",
            change: "-15%",
            previous: "10mins",
            isPositive: false,
          },
          {
            title: "Average Consultation Time",
            value: "10mins",
            change: "+10%",
            previous: "11mins",
            isPositive: true,
          },
          {
            title: "Patient Return Rate",
            value: "3.8%",
            change: "+0.1%",
            previous: "3.9%",
            isPositive: true,
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="text-sm text-gray-600 mb-3">{kpi.title}</div>
            <div className="text-3xl font-bold text-gray-500">{kpi.value}</div>
            <div className="text-sm mt-3 flex items-center justify-between">
              <div className="flex-1 flex flex-col items-start text-left">
                <span className={`${kpi.isPositive ? "text-green-600" : "text-red-600"} font-semibold`}>
                  {kpi.change}
                </span>
                <div className="text-xs text-gray-500">Versus</div>
              </div>

              <div className="h-6 w-px bg-gray-300 border-r border-dashed mx-4"></div>

              <div className="flex-1 flex flex-col items-start text-center">
                <span className="text-gray-500">
                  <span className="text-gray-700">{kpi.previous}</span>
                  <div className="text-xs text-gray-500 whitespace-nowrap">Previous day</div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <BarChart />
      </div>
    </div>
  );
}
