import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper.jsx";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/leaves", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const formattedLeaves = response.data.leaves.map((leave, index) => {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const timeDiff = Math.abs(end - start);
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

            const employee = leave.employeeId;
            const name = employee?.userId?.name || "N/A";
            const empId = employee?.employeeId || "N/A";
            const department = employee?.department?.dep_name || "N/A";

            return {
              _id: leave._id,
              sno: index + 1,
            //   employeeId: empId,
              name: name,
              leaveType: leave.leaveType,
              department:leave.dep_name,
            //   department: department,
              days: isNaN(days) ? "N/A" : days,
              status: leave.status || "Pending",
              action: <LeaveButtons id={leave._id} />,
            };
          });

          setLeaves(formattedLeaves);
          setFilteredLeaves(formattedLeaves);
        } else {
          setLeaves([]);
          setFilteredLeaves([]);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Failed to fetch leaves");
        setLeaves([]);
        setFilteredLeaves([]);
      }
    };

    fetchLeaves();
  }, []);

  useEffect(() => {
    if (!leaves) return;

    let updatedLeaves = [...leaves];

    if (statusFilter) {
      updatedLeaves = updatedLeaves.filter(
        (leave) => leave.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      updatedLeaves = updatedLeaves.filter(
        (leave) =>
          leave.name.toLowerCase().includes(lowerSearch) ||
          leave.employeeId.toLowerCase().includes(lowerSearch) ||
          leave.leaveType.toLowerCase().includes(lowerSearch) ||
          leave.department.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredLeaves(updatedLeaves);
  }, [searchTerm, statusFilter, leaves]);

  if (leaves === null) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <>
      {leaves ? (
        <div className="p-6">
          <h3 className="text-2xl font-bold text-center mb-6">Manage Leaves</h3>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name, ID, type, or department"
              className="px-4 py-2 border rounded w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex gap-2 flex-wrap">
              {["Pending", "Approved", "Rejected"].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded text-white ${
                    statusFilter === status
                      ? {
                          Pending: "bg-yellow-500",
                          Approved: "bg-green-600",
                          Rejected: "bg-red-600",
                        }[status]
                      : {
                          Pending: "bg-yellow-400 hover:bg-yellow-500",
                          Approved: "bg-green-500 hover:bg-green-600",
                          Rejected: "bg-red-500 hover:bg-red-600",
                        }[status]
                  }`}
                  onClick={() =>
                    setStatusFilter((prev) => (prev === status ? "" : status))
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredLeaves}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent="No leaves found"
          />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Table;
