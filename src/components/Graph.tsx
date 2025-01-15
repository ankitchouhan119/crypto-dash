import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2'; // Import both Line and Bar chart components
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { FaArrowRightLong } from 'react-icons/fa6';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface GraphProps {
  data: any[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  
  const [chartType, setChartType] = useState<'line' | 'bar'>('line'); // State to track the chart type

  const chartData = {
    labels: data.slice(0, 20).map(coin => coin.name),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map(coin => coin.current_price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: chartType === 'bar' ? 'rgba(75, 192, 192, 0.2)' : 'transparent', // Set background for bar chart
        tension: 0.1,
        fill: chartType === 'line', // Fill for line chart
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cryptocurrency Prices',
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
    },
  };

  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'bar' : 'line'); // Toggle between 'line' and 'bar'
  };

  return (
    <div className='overflow-x-auto h-full'>
      <div className="flex justify-start mb-4">
        <button
          onClick={toggleChartType}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <span className='flex text-center items-center gap-1'>

          <FaArrowRightLong /> {chartType === 'line' ? 'Bar' : 'Line'} Chart
          </span>
        </button>
      </div>
     
      {chartType === 'line' ? (
        <Line data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default Graph;
