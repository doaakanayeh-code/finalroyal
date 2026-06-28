import MainComponent from "./MainComponent";
import React from "react";
import PrimarySearchAppBar from "./Tobbar";
import AIAssistant from "./AIAssistant";
import AIChatAssistant from "./AIChatAssistant";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../Css/bars.css";
export default function HomePage({ mode, setMode, siteName, siteLogo }) {
  return (
    <div>
  
      <PrimarySearchAppBar 
        mode={mode} 
        setMode={setMode} 
        siteName={siteName} 
        siteLogo={siteLogo} 
      />
      <div className="d-flex" style={{ marginTop: "70px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ padding: "20px" }}>
               <Outlet />
               <Footer />
            
          </div>
        </div>
      </div>
      <AIAssistant />
      <AIChatAssistant />
    </div>
  );
}