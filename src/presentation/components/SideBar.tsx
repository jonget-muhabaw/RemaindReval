import React, { useState, type JSX } from "react";
import {
  HomeIcon,
  UserIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import RemainderForm from "./RemainderForm";
import Login from "./Login";


const SettingsPage = () => <div className="p-4">Settings and Preferences</div>;

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-40 h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-primary text-white transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 sm:w-20 md:w-64 sm:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 sm:justify-center">
            <h1
              className={`text-2xl font-bold sm:hidden md:block transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Sidebar
            </h1>
            <button className="text-white sm:hidden" onClick={toggleSidebar}>
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
          <nav className="flex-1 p-2 space-y-2">
            <NavItem
              to="/dashboard"
              icon={<HomeIcon className="w-5 h-5" />}
              label="Dashboard"
            />
            <NavItem
              to="/create"
              icon={<UserIcon className="w-5 h-5" />}
              label="Create New"
            />
            <NavItem
              to="/settings"
              icon={<CogIcon className="w-5 h-5" />}
              label="Settings"
            />
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow flex flex-col ml-0 sm:ml-20 md:ml-64 transition-all duration-300">
        <header className="p-4 bg-white shadow-2xl shadow-cyan-950 mb-4">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-blue-600 text-white rounded-md sm:hidden"
          >
            {isOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
          <h1 className="text-xl font-bold text-primary">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4 bg-gray-50">
          <Routes>
           
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<RemainderForm />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-4 px-4 py-2 rounded-md transition-all hover:bg-blue-500 ${
          isActive ? "bg-blue-600" : ""
        }`
      }
    >
      {icon}
      <span className="text-sm text-white font-medium">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
