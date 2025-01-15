import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the updated import
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx';
import './index.css';

// Get the root DOM element
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a root and render the app
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}
