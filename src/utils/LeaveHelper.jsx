import React from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,  // directly name here
    width: "120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    width: "120px",
  },
];

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/admin-dashboard/leave/${id}`);
  };


  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
      onClick={handleView}
    >
      View
    </button>
  );
};
