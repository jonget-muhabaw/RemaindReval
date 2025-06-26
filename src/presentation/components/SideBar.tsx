import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Update: Use useNavigate for v6
import { FiLogOut } from "react-icons/fi";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaPlusCircle,
  FaCog,
} from "react-icons/fa";
import logo from "../../assets/main-icon.png";
import { useLogout } from "../../hooks/userAuth";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
  };

  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
   
    }
  };

  return (
    <div>
      {/* Toggle Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="p-2 mb-4 text-white bg-primary rounded-md fixed top-4 left-4 z-50 sm:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 sm:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-16 border-b border-primary-light p-4">
            <img src={logo} alt="Logo" className="h-12 w-auto rounded-full" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-4 mt-4">
            <SidebarLink
              to="/dashboard"
              label="Dashboard"
              icon={<FaTachometerAlt size={20} />}
              onClick={toggleSidebar}
            />
            <SidebarLink
              to="/create"
              label="Create New"
              icon={<FaPlusCircle size={20} />}
              onClick={toggleSidebar}
            />
            <SidebarLink
              to="/settings"
              label="Settings"
              icon={<FaCog size={20} />}
              onClick={toggleSidebar}
            />
            {/* Logout Link */}
            <div
              onClick={handleLogout}
              className="flex items-center px-4 py-3 rounded-md transition-all hover:bg-primary hover:text-white text-gray-700 cursor-pointer"
            >
              <span className="mr-3">
                <FiLogOut size={20} />
              </span>
              <span className="text-base font-medium">Logout</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  label,
  icon,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-3 rounded-md transition-all hover:bg-primary hover:text-white text-gray-700"
  >
    <span className="mr-3">{icon}</span>
    <span className="text-base font-medium">{label}</span>
  </Link>
);

export default Sidebar;
