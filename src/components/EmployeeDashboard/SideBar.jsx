import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCog,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authcontext";

const SideBar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 p-4 space-y-6">
      <h3 className="text-2xl font-bold mb-6">Employee MS</h3>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-3 hover:bg-gray-700 p-2 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={
            user
              ? `/employee-dashboard/profile/${user._id}`
              : "/employee-dashboard/profile"
          }
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-3 hover:bg-gray-700 p-2 rounded`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-3 hover:bg-gray-700 p-2 rounded`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        {user && (
          <NavLink
            to={`/employee-dashboard/salary/${user._id}`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-3 hover:bg-gray-700 p-2 rounded`
            }
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>
        )}

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-3 hover:bg-gray-700 p-2 rounded`
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
