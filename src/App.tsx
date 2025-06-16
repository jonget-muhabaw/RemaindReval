import React from "react";
import Sidebar from "./presentation/components/SideBar";
import Login from "./presentation/components/Login";
import Dashboard from "./presentation/components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Settings from "./presentation/components/Settings";
import RemainderForm from "./presentation/components/RemainderForm";

const App: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow ml-0 sm:ml-20 md:ml-64 transition-all duration-300">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create" element={<RemainderForm/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
