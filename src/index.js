/* eslint-disable react/function-component-definition */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
// this creates the store with the reducers
const root = createRoot(document.getElementById('main'));

root.render(
  <App />,
);
