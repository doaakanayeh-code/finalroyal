import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import PrimarySearchAppBar from "../Component/Tobbar";
import { useState } from "react";

export default function DashboardLayout() {
  const [mode, setMode] = useState("light");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      <SideBar />

      <div
        style={{
          flex: 1,

          marginLeft: "240px",

    width: "calc(100% - 240px)",
          }}
      >
        <PrimarySearchAppBar
          mode={mode}
          setMode={setMode}
          isDashboard={true}
        />

        <div
          style={{
            padding: "30px",
            marginTop: "80px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}