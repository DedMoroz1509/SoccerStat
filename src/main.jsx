import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css'; 
import './assets/header.css';
import './assets/league-card.css';
import './assets/cards-pages.css';
import './assets/search.css';
import './assets/team-card.css';
import './assets/breadcrumbs.css';
import './assets/date-filter.css';
import './assets/match-card.css';
import './assets/pagination.css';
import './assets/match-pages.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);