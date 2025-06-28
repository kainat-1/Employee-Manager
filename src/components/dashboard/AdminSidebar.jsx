import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCog,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 p-4 space-y-6">
      <h3 className="text-2xl font-bold mb-6">Employee MS</h3>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/admin-dashboard"
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
          to="/employees"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-3 hover:bg-gray-700 p-2 rounded`
          }

          // className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        <NavLink
          to="/leaves"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to="/salaries"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaBuilding,
//   FaCalendarAlt,
//   FaCog,
//   FaMoneyBillWave,
//   FaTachometerAlt,
//   FaUsers,
// } from "react-icons/fa";

// const AdminSidebar = () => {
//   return (
//     <div>
//       <div className="bg-gray-800 text-white h=screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
//         <h3>Employee MS</h3>
//       </div>
//       <div>
//         <NavLink
//           to="/admin-dashboard"
//           className="flex item-center space-x-4 py-2.5 px-4 rounded"
//         >
//           <FaTachometerAlt />
//           <span>Dashboard</span>
//         </NavLink>
//         <NavLink to="/admin-dashboard">
//           <FaUsers />
//           <span>Employees</span>
//         </NavLink>
//         <NavLink to="/admin-dashboard">
//           <FaBuilding />
//           <span>Department</span>
//         </NavLink>
//         <NavLink to="/admin-dashboard">
//           <FaCalendarAlt />
//           <span>Leaves</span>
//         </NavLink>
//         <NavLink to="/admin-dashboard">
//           <FaMoneyBillWave />
//           <span>Salary</span>
//         </NavLink>
//         <NavLink to="/admin-dashboard">
//           <FaCog />
//           <span>settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };
// export default AdminSidebar;
