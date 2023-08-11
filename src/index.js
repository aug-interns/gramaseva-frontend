import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@asgardeo/auth-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {
  signInRedirectURL: "http://localhost:3000/home",
  signOutRedirectURL: "http://localhost:3000/home",
  clientID: "fWyActxSEiVGXDBSqodjplYt6qUa",
  baseUrl: "https://api.asgardeo.io/t/zetcco",
  scope: [ "openid","profile", "app_roles"]
}

root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
