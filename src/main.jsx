import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import MenuProvider from "./Context/MenuContext";
import WindowContext from "./Context/Windowcontext";
import { BrowserRouter as Router } from "react-router-dom";
import './i18n/config';
import { LanguageProvider } from "./Context/LanguageContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { HelmetProvider } from 'react-helmet-async';
createRoot(document.getElementById('root')).render(
  
 <WindowContext>
       <MenuProvider>
        <LanguageProvider>
          <ThemeProvider>

       <HelmetProvider>
         <Router>
           <App />
         </Router>
         </HelmetProvider>
            </ThemeProvider>
           </LanguageProvider>
       </MenuProvider>
     </WindowContext> 

)
