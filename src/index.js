import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoContextProvider } from './Context/TodoContext';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoContextProvider>
    <App />
    <Toaster position="bottom-right" reverseOrder={true}/>
  </TodoContextProvider>
);


