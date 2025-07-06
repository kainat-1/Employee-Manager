import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:"70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width:"150px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width:"150px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width:"200px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width:"200px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    // center:true
  },
];
// eslint-disable-next-line react-refresh/only-export-components
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments;
    } else {
      alert(response.data.error || "Failed to fetch departments");
      return [];
    }
  } catch (error) {
    alert(error?.response?.data?.error || "Something went wrong");
    return [];
  }
};

// Employee Action Buttons Component
export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 p-2">
      <button
        className="px-4 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
      >
        View
      </button>
      <button className="px-4 py-1 bg-yellow-500 text-white rounded"
      onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </button>
      <button className="px-4 py-1 bg-red-500 text-white rounded">
        Salary
      </button>
      <button className="px-4 py-1 bg-green-500 text-white rounded">
        Leave
      </button>
    </div>
  );
};
