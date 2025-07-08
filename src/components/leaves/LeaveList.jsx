import React from "react";
import { Link } from "react-router-dom";
const LeaveList = () => {
  return (
    <div className="p-6">
      <div className=" text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex space-between items-center"></div>
      <input type="text" placeholder="Search" className="px-4 py-0.5 border" />
      <Link
        to="/employee-dashboard/add-leaves"
        className="px-4 py-1 bg-teal-600 rounded text-white"
      >
        Add New Leave
      </Link>
    </div>
  );
};
export default LeaveList;
