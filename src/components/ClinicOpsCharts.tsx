"use client";

import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  BubbleController,
  LineController,
} from 'chart.js';
import Card from "@/components/Card";

ChartJS.register(
  ChartDataLabels,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BubbleController,
  LineController
);

ChartJS.defaults.plugins.datalabels = {
  display: false,
};

const symptomOptions = ["Fever", "Cough", "Headache", "Back Pain", "Sore Throat"];

const mockMedicationsBySymptom: Record<string, { name: string; used: number; left: number }[]> = {
  "Fever": [
    { name: "Paracetamol", used: 90, left: 40 },
    { name: "Ibuprofen", used: 70, left: 60 },
    { name: "Aspirin", used: 50, left: 80 },
    { name: "Naproxen", used: 30, left: 90 },
    { name: "Diphenhydramine", used: 65, left: 55 },
    { name: "Acetaminophen", used: 95, left: 25 },
    { name: "Cefixime", used: 40, left: 100 },
    { name: "Erythromycin", used: 55, left: 75 },
    { name: "Ciprofloxacin", used: 45, left: 85 },
    { name: "Doxycycline", used: 60, left: 70 },
  ],
  "Cough": [
    { name: "Codeine", used: 80, left: 34 },
    { name: "Guaifenesin", used: 60, left: 51 },
    { name: "Dextromethorphan", used: 70, left: 60 },
    { name: "Bromhexine", used: 55, left: 70 },
    { name: "Ambroxol", used: 85, left: 21 },
    { name: "Salbutamol", used: 40, left: 90 },
    { name: "Theophylline", used: 35, left: 95 },
    { name: "Levosalbutamol", used: 50, left: 84 },
    { name: "Prednisolone", used: 65, left: 58 },
    { name: "Montelukast", used: 75, left: 15 },
  ],
  "Headache": [
    { name: "Acetaminophen", used: 100, left: 30 },
    { name: "Ibuprofen", used: 80, left: 55 },
    { name: "Aspirin", used: 77, left: 40 },
    { name: "Naproxen", used: 60, left: 67 },
    { name: "Sumatriptan", used: 40, left: 90 },
    { name: "Propranolol", used: 30, left: 102 },
    { name: "Metoprolol", used: 35, left: 95 },
    { name: "Topiramate", used: 21, left: 110 },
    { name: "Amitriptyline", used: 50, left: 70 },
    { name: "Ergotamine", used: 25, left: 105 },
  ],
  "Back Pain": [
    { name: "Ibuprofen", used: 85, left: 25 },
    { name: "Naproxen", used: 75, left: 55 },
    { name: "Paracetamol", used: 95, left: 35 },
    { name: "Diclofenac", used: 65, left: 65 },
    { name: "Tramadol", used: 42, left: 90 },
    { name: "Celecoxib", used: 50, left: 80 },
    { name: "Gabapentin", used: 30, left: 105 },
    { name: "Cyclobenzaprine", used: 24, left: 110 },
    { name: "Methocarbamol", used: 55, left: 35 },
    { name: "Carisoprodol", used: 60, left: 71 },
  ],
  "Sore Throat": [
    { name: "Lozenges", used: 90, left: 45 },
    { name: "Paracetamol", used: 81, left: 50 },
    { name: "Ibuprofen", used: 70, left: 30 },
    { name: "Amoxicillin", used: 54, left: 83 },
    { name: "Azithromycin", used: 45, left: 85 },
    { name: "Erythromycin", used: 60, left: 106 },
    { name: "Penicillin V", used: 55, left: 75 },
    { name: "Cefuroxime", used: 33, left: 100 },
    { name: "Clarithromycin", used: 25, left: 105 },
    { name: "Chlorhexidine Gargle", used: 35, left: 95 },
  ],
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxMeds = [90, 85, 92, 88, 95, 91, 89];
const minMeds = [20, 25, 15, 30, 22, 28, 26];
const maxLabels = ["Ibuprofen", "Paracetamol", "Amoxicillin", "Aspirin", "Cefixime", "Acetaminophen", "Loratadine"];
const minLabels = ["Aspirin", "Doxycycline", "Ibuprofen", "Amoxicillin", "Azithromycin", "Ciprofloxacin", "Diphenhydramine"];

export default function ClinicOpsCharts() {
  const [isClient, setIsClient] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState("Fever");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [...mockMedicationsBySymptom[selectedSymptom]]
    .sort((a, b) => a.left - b.left);

  const chartData: ChartData<"bar", number[], string> = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: "Used",
        data: data.map(d => d.used),
        backgroundColor: "rgba(239, 68, 68, 0.6)",
      },
      {
        label: "Left",
        data: data.map(d => d.left),
        backgroundColor: "rgba(34, 197, 94, 0.6)",
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y",
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Top 10 Medications Prescribed for ${selectedSymptom}`,
      },
      datalabels: {
        display: true,
        anchor: 'center',
        align: 'center',
        color: '#fff',
        font: {
          weight: 'bold' as const,
          size: 12,
        },
        formatter: (value: number) => value,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: "Quantity" },
      },
      y: {
        stacked: true,
      },
    },
  };

  const lollipopChartData: ChartData<"bubble" | "line", any, string> = {
    labels: days,
    datasets: [
      ...days.map((day, i) => ({
        type: "line" as const,
        label: `Stick - ${day}`,
        data: [
          { x: day, y: minMeds[i] },
          { x: day, y: maxMeds[i] }
        ],
        borderColor: "rgba(100, 100, 100, 0.5)",
        borderWidth: 2,
        pointRadius: 0,
        showLine: true,
        segment: { borderDash: [4, 4] },
        datalabels: { display: false },
      })),
  
      {
        type: "bubble" as const,
        label: "Most",
        data: maxMeds.map((v, i) => ({
          x: days[i],
          y: v,
          r: 6,
          medication: maxLabels[i],
        })),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
      {
        type: "bubble" as const,
        label: "Least",
        data: minMeds.map((v, i) => ({
          x: days[i],
          y: v,
          r: 6,
          medication: minLabels[i],
        })),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ]
  };
  
  const lollipopOptions: ChartOptions<"bubble" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          filter: function (legendItem, data) {
            return legendItem.text !== undefined &&
              legendItem.text !== "" &&
              legendItem.text !== "Stick" &&
              !legendItem.text.startsWith("Stick");
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const dayIndex = context.dataIndex;
            const datasetLabel = context.dataset.label;
            if (datasetLabel === "Most") return `${maxLabels[dayIndex]}: ${maxMeds[dayIndex]}`;
            if (datasetLabel === "Least") return `${minLabels[dayIndex]}: ${minMeds[dayIndex]}`;
            return "";
          },
        },
      },
      title: {
        display: true,
        text: "Most and Least Medications Left Per Day",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity Left",
        },
      },
    },
  };
  

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4 space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
              <label className="text-sm font-medium whitespace-nowrap">Select Symptom:</label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="text-sm border rounded px-2 py-1 h-7 w-36"
              >
                {symptomOptions.map((symptom) => (
                  <option key={symptom} value={symptom}>{symptom}</option>
                ))}
              </select>
            </div>
            <div className="relative w-full h-[500px]">
              {isClient && <Chart type="bar" data={chartData} options={chartOptions} />}
            </div>
          </div>
        </Card>

        <Card>
          <div className="relative w-full h-[500px] p-6">
            {isClient && <Chart type="bubble" data={lollipopChartData} options={lollipopOptions} />}
          </div>
        </Card>
      </div>
    </div>
  );
}
