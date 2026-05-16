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

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <WindowContext>
       <MenuProvider>
         <Router>
           <App />
         </Router>
       </MenuProvider>
     </WindowContext> 
  </StrictMode>,
)
