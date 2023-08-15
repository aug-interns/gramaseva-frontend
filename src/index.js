import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@asgardeo/auth-react';
import { RESOURCE_URLS } from './configs';

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {
  signInRedirectURL: "http://localhost:3000/home",
  signOutRedirectURL: "http://localhost:3000/home",
  clientID: "Pxs3QfEoddu4FtcX_SPfGoIAc68a",
  baseUrl: "https://api.asgardeo.io/t/zetcco",
  scope: [ 
    "openid", 
    "profile",
    "app_roles",
    "urn:zetcco:identitycheckserviceendpo:check_identity urn:zetcco:addresscheckserviceendpoi:address_check urn:zetcco:supportserviceendpoint909:request_help"],
  resourceServerURLs: [
    ...Object.values(RESOURCE_URLS)
  ]
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
