import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css'; 
import './assets/header.css';
import './assets/league-card.css';
import './assets/leagues-page.css';
import './assets/search.css';
import './assets/team-card.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);