import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./presentation/components/SideBar";
import Login from "./presentation/components/Login";
import Dashboard from "./presentation/components/Dashboard";
import Settings from "./presentation/components/Settings";
import RemainderForm from "./presentation/components/RemainderForm";

import Signup from "./presentation/components/Signup";
import UpdateDocument from "./presentation/components/UpdateDocument";

const App: React.FC = () => {
  const location = useLocation();

  const hideSidebarPaths = ["/", "/signup", "/forgot"];

  // Check if the current path matches one where the sidebar should be hidden
  const isSidebarHidden = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex">
      {/* Conditionally render the Sidebar */}
      {!isSidebarHidden && <Sidebar />}

      {/* Main Content */}
      <div
        className={`flex-grow ${
          isSidebarHidden ? "ml-0" : "ml-0 sm:ml-20 md:ml-64"
        } transition-all duration-300`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create" element={<RemainderForm />} />
          <Route path="/update-document/:id" element={<UpdateDocument />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
