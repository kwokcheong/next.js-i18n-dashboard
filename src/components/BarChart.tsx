"use client";
import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import Card from "@/components/Card"
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
export default function BarChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const},
            title: { display: true, text: 'My Bar Chart' },
        },
        };
        
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    
        const data = {
        labels,
        datasets: [
            {
            label: 'Sales',
            data: [30, 1, 28, 80, 60],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
            },
        ],
        };
    
    return (
        <div>
        <div className="grid grid-cols-2 gap-10">
        <Card>
            <Bar data={data} options={options} />
        </Card>
        <Card>
            <Bar data={data} options={options} />
        </Card>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-5">
        <Card>
            <Bar data={data} options={options} />
        </Card>
        <Card>
            <Bar data={data} options={options} />
        </Card>
        <Card>
            <Bar data={data} options={options} />
        </Card>
        </div>
        </div>
        
    );
}