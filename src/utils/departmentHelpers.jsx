/* eslint-disable react-refresh/only-export-components */

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Do you want to delete this department?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/department/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          alert("Department deleted successfully!");
          onDepartmentDelete(_id); // notify parent if needed
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error deleting department");
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-4 py-1 bg-red-500 text-white rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
