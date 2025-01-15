import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Dashboard from './components/Dashboard.tsx';
import { toggleTheme } from './store/themeSlice.ts';
import { useAppDispatch, useAppSelector } from './hooks/useAppSelector.ts';
import { updateLayout } from './store/layoutSlice.ts';
import { Sun, Moon } from 'lucide-react';
import { BiExport, BiImport  } from "react-icons/bi";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const layout = useAppSelector((state) => state.layout.items);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleExportJSON = () => {
    const config = {
      layout,
      isDarkMode,
    };
    const jsonString = JSON.stringify(config);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string);
          dispatch(updateLayout(config.layout));
          if (config.isDarkMode !== isDarkMode) {
            dispatch(toggleTheme());
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Provider store={store}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <nav className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
          <div className="space-x-4 flex ">
            <button
              className="px-4 py-2 rounded border"
              onClick={handleThemeToggle}
            >
              {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              className="px-4 py-2 rounded bg-green-500 text-white font-bold"
              onClick={handleExportJSON}
            >
              <BiExport />
            </button>
            <label className="px-4 py-2 rounded bg-yellow-500 text-white cursor-pointer font-bold">
            <BiImport  />
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportJSON}
              />
            </label>
          </div>
        </nav>
        <Dashboard />
      </div>
    </Provider>
  );
};

export default App;
