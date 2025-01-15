import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector.ts';
import { fetchCryptoData } from '../store/cryptoSlice.ts';
import { updateLayout, removeComponent } from '../store/layoutSlice.ts';
import Table from './Table.tsx';
import Graph from './Graph.tsx';
import SummaryCard from './SummaryCard.tsx';
import AddComponentButton from './AddComponentButton.tsx';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { IoCloseSharp } from "react-icons/io5";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector((state) => state.layout.items);
  const cryptoData = useAppSelector((state) => state.crypto.data);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const [isDraggable, setIsDraggable] = useState(false);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLayoutChange = (newLayout: any) => {
    dispatch(updateLayout(newLayout));
  };

  const handleRemoveComponent = (id: string) => {
    dispatch(removeComponent(id));
  };

  const handleDoubleClick = () => {
    setIsDraggable(true);
    setTimeout(() => setIsDraggable(false), 3000); // Disable dragging after 3 seconds
  };

  const renderComponent = (item: any) => {
    switch (item.i.split('-')[0]) {
      case 'table':
        return <Table data={cryptoData} />;
      case 'graph':
        return <Graph data={cryptoData} />;
      case 'summary':
        return <SummaryCard data={cryptoData} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
      onDoubleClick={handleDoubleClick} // Enable dragging on double-click
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={isDraggable} // Control draggable dynamically
        isResizable={true}
        onDragStart={(layout, oldItem, newItem, placeholder, event, element) => {
          console.log("Drag started");
        }}
        onDrag={(layout, oldItem, newItem, placeholder, event, element) => {
          console.log("Dragging...");
        }}
        onDragStop={(layout, oldItem, newItem, placeholder, event, element) => {
          console.log("Drag stopped");
        }}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}
          >
            <button
              className="float-right text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 p-1 rounded-full hover:bg-red-100"
              onClick={() => handleRemoveComponent(item.i)}
            >
              <IoCloseSharp />
            </button>
            {renderComponent(item)}
          </div>
        ))}
      </ResponsiveGridLayout>
      <AddComponentButton />
    </div>
  );
};

export default Dashboard;
