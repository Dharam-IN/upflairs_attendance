import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context from './component/ContextProvider/Context';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context>
);

