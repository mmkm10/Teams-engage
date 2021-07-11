import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';



ReactDOM.render(
  <Auth0Provider domain="dev-h-x7kqxh.us.auth0.com"
    clientId="NLmmjXH6lG0yBXljqFV4KyuZeo6WJTdv"
    redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);


