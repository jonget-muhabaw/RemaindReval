import React from "react";
import Sidebar from "./presentation/components/SideBar";
import Login from "./presentation/components/Login";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      {" "}
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
