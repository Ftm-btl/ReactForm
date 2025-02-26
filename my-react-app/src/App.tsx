import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './Form';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
);
export default Form;