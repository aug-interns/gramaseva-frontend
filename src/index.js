import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@asgardeo/auth-react';
import { RESOURCE_URLS } from './configs';

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {
  signInRedirectURL: "http://localhost:3000",
  signOutRedirectURL: "http://localhost:3000",
  clientID: "ypp8Y7VofAxvhKJBra8oos_KhpYa",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope: [ 
    "openid app_roles", 
    "profile",
    "urn:interns:indentitycheckserviceendp:check_nic urn:interns:policecheckserviceapiendp:check_police urn:interns:supportserviceivkendpoint:request_support urn:interns:addresscheckserviceendpoi:check_address urn:interns:requestserviceendpoint808:create_request urn:interns:requestserviceendpoint808:update_request urn:interns:requestserviceendpoint808:view_requests"],
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
