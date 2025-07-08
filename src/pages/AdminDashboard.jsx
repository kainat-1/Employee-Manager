import React from "react";
// import { useAuth } from "../context/authcontext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // const { user } = useAuth();

  return (
    <div className=" flex ">
      <EmployeeSidebar />
      <div className="flex-1 ml-64  bg-gray-100 h-screen">
        <Navbar />
        <Outlet/>
        {/* <AdminSummary /> */}
      </div>
    </div>
  );
};
export default AdminDashboard;
