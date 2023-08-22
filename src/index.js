import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@asgardeo/auth-react';
import { RESOURCE_URLS } from './configs';
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {
  signInRedirectURL: process.env.REACT_APP_AUTH_SIGN_IN_URL,
  signOutRedirectURL: process.env.REACT_APP_AUTH_SIGN_OUT_URL,
  clientID: process.env.REACT_APP_AUTH_ASGARDEO_CLIENT_ID,
  baseUrl: process.env.REACT_APP_AUTH_ASGARDEO_ORG_URL,
  scope: [ 
    "openid app_roles", 
    "profile",
    process.env.REACT_APP_AUTH_ASGARDEO_SCOPES
  ],
  resourceServerURLs: [
    ...Object.values(RESOURCE_URLS)
  ]
}

const theme = createTheme(
  
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider config={config}>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
