import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector.ts';

interface SummaryCardProps {
  data: any[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const highestPrice = Math.max(...data.map(coin => coin.current_price));
  const lowestPrice = Math.min(...data.map(coin => coin.current_price));
  
  
  // Calculate average market cap
  const averageMarketCap = data.reduce((sum, coin) => sum + coin.market_cap, 0) / data.length;
  const totalCoins =  data.length;

  // Format average market cap (in billions)
  const formattedMarketCap = averageMarketCap >= 1_000_000_000
    ? (averageMarketCap / 1_000_000_000).toFixed(2) + 'B' // in billions
    : averageMarketCap.toLocaleString(); // otherwise show the raw number

  // Format prices
  const formattedHighestPrice = highestPrice.toLocaleString();
  const formattedLowestPrice = lowestPrice < 0 ? `${lowestPrice.toFixed(2)}` : lowestPrice.toLocaleString();

  return (
    <div className={`p-4 overflow-x-auto h-full rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="space-y-2">
        <p>Highest Price: ${formattedHighestPrice}</p>
        <p>Average Market Cap: ${formattedMarketCap}</p>
        <p>Lowest Price: ${formattedLowestPrice}</p>
        <p>Total Coins: {totalCoins}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
