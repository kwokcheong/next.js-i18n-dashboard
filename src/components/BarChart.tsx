"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import Card from "@/components/Card";

ChartJS.register(
  ChartDataLabels,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.plugins.datalabels = {
  display: false,
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeLabels = [
  "0800",
  "0900",
  "1000",
  "1100",
  "1200",
  "1300",
  "1400",
  "1500",
  "1600",
  "1700",
  "1800",
  "1900",
  "2000",
  "2100",
  "2200",
];
const paymentMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const cashInData = [6050, 5200, 6500, 5020, 7060, 2100];
const cashOutData = [1000, 1200, 1100, 1500, 1300, 500];

export default function BarChart() {
  const [isClient, setIsClient] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("Nov");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stackedData = {
    labels: paymentMonths,
    datasets: [
      {
        label: "Cash In",
        data: cashInData,
        backgroundColor: "rgba(98, 213, 164, 0.7)",
      },
      {
        label: "Cash Out",
        data: cashOutData,
        backgroundColor: "rgba(239, 100, 100, 0.6)",
      },
    ],
  };

  const stackedOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Copayment Overview (SGD)",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Amount (SGD)",
        },
      },
    },
    onClick: (_evt: any, elements: any) => {
      if (elements.length > 0) {
        const chartIndex = elements[0].index;
        const month = paymentMonths[chartIndex];
        setSelectedMonth(month);
      }
    },
  };

  const pieDataByMonth: Record<string, number[]> = {
    Nov: [15, 30, 40, 15],
    Dec: [16, 30, 20, 34],
    Jan: [30, 15, 20, 35],
    Feb: [12, 27, 28, 33],
    Mar: [50, 20, 15, 15],
    Apr: [31, 12, 19, 38],
  };

  const pieData: ChartData<"pie", number[], string> = {
    labels: ["CHAS", "MediSave", "MediShield Life", "Out-of-pocket"],
    datasets: [
      {
        data: pieDataByMonth[selectedMonth ?? "Jan"],
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(99, 102, 241, 0.6)",
          "rgba(96, 165, 250, 0.6)",
          "rgba(239, 100, 100, 0.6)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        display: true,
        formatter: (value: number, context: any) => {
          const total = context.chart._metasets[0].total;
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%`;
        },
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  const appointmentData: ChartData<"bar" | "line", number[], string> = {
    labels: dayLabels,
    datasets: [
      {
        label: "Show",
        data: [23, 22, 24, 20, 25, 21, 27],
        backgroundColor: "rgba(98, 213, 164, 0.6)",
        type: "bar",
      },
      {
        label: "No Show",
        data: [9, 8, 5, 2, 5, 7, 3],
        backgroundColor: "rgba(239, 100, 100, 0.4)",
        type: "bar",
      },
      {
        label: "Patient Return Rate (%)",
        data: [3, 2, 4, 1, 2, 3, 5],
        borderColor: "rgba(75, 85, 99, 0.6)",
        backgroundColor: "rgba(75, 85, 99, 0.8)",
        borderWidth: 2,
        type: "line",
        yAxisID: "y2",
        tension: 0.3,
        pointRadius: 4,
        fill: false,
      },
    ],
  };

  const appointmentOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "[Previous Week] Appointment Show vs No Show Rates",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Appointments" },
      },
      y2: {
        beginAtZero: true,
        position: "right",
        title: { display: true, text: "Return Rate (%)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  const volumeTimeData: ChartData<"line", number[], string> = {
    labels: timeLabels,
    datasets: [
      {
        label: "Mon",
        data: [6, 4, 6, 10, 8, 7, 9, 6, 5, 4, 3, 2, 2, 1, 1],
        borderColor: "rgba(98, 213, 164, 0.7)",
        backgroundColor: "rgba(98, 213, 164, 0.1)",
      },
      {
        label: "Tue",
        data: [5, 3, 5, 7, 10, 8, 8, 6, 5, 5, 4, 2, 1, 1, 0],
        borderColor: "rgba(239, 100, 100, 0.7)",
        backgroundColor: "rgba(239, 100, 100, 0.1)",
      },
      {
        label: "Wed",
        data: [4, 3, 4, 6, 9, 7, 7, 5, 4, 4, 3, 2, 1, 1, 1],
        borderColor: "rgba(96, 165, 250, 0.7)",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
      },
      {
        label: "Thu",
        data: [6, 5, 6, 8, 10, 9, 8, 6, 5, 4, 3, 3, 2, 1, 1],
        borderColor: "rgba(251, 191, 36, 0.7)",
        backgroundColor: "rgba(251, 191, 36, 0.1)",
      },
      {
        label: "Fri",
        data: [5, 4, 7, 9, 10, 8, 7, 5, 4, 3, 3, 2, 1, 1, 0],
        borderColor: "rgba(99, 102, 241, 0.7)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
      },
      {
        label: "Sat",
        data: [4, 3, 5, 6, 7, 6, 6, 4, 3, 2, 2, 1, 1, 0, 0],
        borderColor: "rgba(75, 85, 99, 0.6)",
        backgroundColor: "rgba(75, 85, 99, 0.1)",
      },
      {
        label: "Sun",
        data: [5, 2, 4, 5, 6, 6, 5, 3, 2, 2, 1, 1, 1, 0, 0],
        borderColor: "rgba(255, 159, 64, 0.7)",
        backgroundColor: "rgba(190, 18, 60, 0.1)",
      },
    ].map((day) => ({
      ...day,
      tension: 0.4,
      pointRadius: 3,
      borderWidth: 2,
      fill: true,
    })),
  };

  const volumeTimeOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "[Previous Week] Hourly Patient Volume",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Patients" },
      },
    },
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="relative w-full h-[400px]">
            {isClient && <Chart type="line" data={volumeTimeData} options={volumeTimeOptions} />}
          </div>
        </Card>

        <Card>
          <div className="relative w-full h-[400px]">
            {isClient && <Chart type="bar" data={appointmentData} options={appointmentOptions} />}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="relative w-full h-[500px]">
            {isClient && (
              <div className="h-full">
                <Chart type="bar" data={stackedData} options={stackedOptions} />
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="relative w-full h-[500px] flex flex-col items-center justify-center p-4">
            <h4 className="text-center font-semibold mb-4">Government Support Usage ({selectedMonth ?? "—"})</h4>
            {isClient && (
              <div className="relative w-full h-full px-6">
                <Pie data={pieData} options={pieOptions} />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
