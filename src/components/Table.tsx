import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";

interface TableProps {
  data: any[];
}

const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  } else if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const rowsPerPage = 10;
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <span className="w-4 h-4 inline-block" />;
    return sortDirection === 'asc'
      ? column === 'name'
        ? <BsSortAlphaDown />
        : <BsSortNumericDown />
      : column === 'name'
        ? <BsSortAlphaDownAlt />
        : <BsSortNumericDownAlt />;
  };
  

  return (
    <div className="overflow-x-auto h-full">
      <h1 className="text-lg font-bold p-4">Cryptocurrency Table</h1>
      <div className="flex items-center mb-2">
        <input
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm px-4 py-1 border rounded-full bg-transparent"
        />
      </div>

      <table className={`min-w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <thead>
          <tr>
            {[
              { label: 'Name', key: 'name' },
              { label: 'Price', key: 'current_price' },
              { label: 'Market Cap', key: 'market_cap' },
              { label: '24h Change', key: 'price_change_percentage_24h' },
            ].map(({ label, key }) => (
              <th
                key={key}
                className="border px-4 py-2 text-start cursor-pointer"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center gap-2">
                  {label}
                  {getSortIcon(key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((coin) => (
            <tr key={coin.id}>
              <td className="border px-4 py-2 text-start">{coin.name}</td>
              <td className="border px-4 py-2 text-start">{formatNumber(coin.current_price)}</td>
              <td className="border px-4 py-2 text-start">{formatNumber(coin.market_cap)}</td>
              <td className={`border px-4 py-2 text-start ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-full disabled:opacity-50 ${isDarkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeftLong />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-full disabled:opacity-50 ${isDarkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-100'}`}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default Table;
