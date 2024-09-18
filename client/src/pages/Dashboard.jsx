import React from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col w-full">
        <MainContent />
      </div>
    </div>
  );
}

export default Dashboard;
