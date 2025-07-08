import React from "react";
// import { useAuth } from "../context/authcontext";
import SideBar from "../components/EmployeeDashboard/SideBar.jsx";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  // const { user } = useAuth();

  return (
    <div className=" flex ">
      <SideBar />
      <div className="flex-1 ml-64  bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default EmployeeDashboard;
