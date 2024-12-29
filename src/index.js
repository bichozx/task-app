import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskProvider } from './context/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <TaskProvider>
    <App />
  </TaskProvider>
 
);
