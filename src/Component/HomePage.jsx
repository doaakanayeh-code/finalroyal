import MainComponent from "./MainComponent";
import React from "react";
import PrimarySearchAppBar from "./Tobbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../Css/bars.css";

export default function HomePage({ mode, setMode }) {
  return (
    <div>
      
      <PrimarySearchAppBar mode={mode} setMode={setMode} />

      <div className="d-flex" style={{ marginTop: "70px" }}>
    
        {/* <Sidebar /> */}

        <div style={{ flex: 1 }}>
          <div style={{ padding: "20px" }}>
               <Outlet />
               <Footer />
            
          </div>
        </div>
      </div>
    </div>
  );
}
