'use client';
import React, { Suspense, useState } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";
import { getActivities, getTeamMembers } from "@/lib/data";
import BarChart from "@/components/BarChart"
import Link from "next/link";

interface Props {
  params: {
    lang: Locale;
  };
}

interface PageContentProps {
  locale: Locale;
}

export default function Page({ params: { lang: locale } }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

async function PageContent({ locale }: PageContentProps) {
  const [activeTab, setActiveTab] = useState("chart");
  return (
    <div>
      <div className="border-b mb-4">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-3 py-2 font-medium ${
              activeTab === "chart"
                ? "border-b-2 border-gray-600 text-gray-600"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            Patient Outcomes
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`px-3 py-2 font-medium ${
              activeTab === "info"
                ? "border-b-2 border-gray-600 text-gray-600"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            Clinic Operations 
          </button>
        </nav>
      </div>

      <div>
        {activeTab === "chart" && 
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
                  <span
                    className={`${
                      kpi.isPositive ? "text-green-600" : "text-red-600"
                    } font-semibold`}
                  >
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
      }
        {activeTab === "info" && (
          <div>
            <Card>
            <CardHeader>Analytics Overview</CardHeader>
              <CardBody>
                <p>This tab contains general information and context for your analytics dashboard.</p>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
