import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import LayoutProvider  from './contexts/LayoutContext.jsx';
// import { AuthProvider } from './context/AuthContext';
createRoot(document.getElementById('root')).render(
   <React.StrictMode>
<BrowserRouter>
{/* <AuthProvider> */}
<LayoutProvider> 
<App />
{/* </AuthProvider> */}
</LayoutProvider>
</BrowserRouter>
</React.StrictMode>
)
