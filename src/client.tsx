import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './App';
import './index.css';
import { hc } from 'hono/client';
import { APIType } from './api';

export const apiClient = hc<APIType>('/api')

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
