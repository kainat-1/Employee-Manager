import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import axios from "axios";

const LeaveList = () => {
  const { user } = useAuth();

  // Destructure user ID and role to avoid infinite effect loop
  const userId = user?._id;
  const userRole = user?.role;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = userRole === "admin";

  useEffect(() => {
    if (!userId) return;

    const fetchLeaves = async () => {
      setLoading(true);
      try {
        // Admin fetches all leaves, employees fetch their own leaves
        const url = isAdmin
          ? "http://localhost:3000/api/leaves"
          : `http://localhost:3000/api/leaves/${userId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setLeaves(Array.isArray(response.data.leaves) ? response.data.leaves : []);
        } else {
          setLeaves([]);
        }
      } catch (error) {
        console.error("Failed to fetch leave:", error);
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [userId, isAdmin]);

  if (loading) {
    return <div className="p-6 text-center text-xl">Loading leaves...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-1 border rounded"
        />
        <Link
          to="/employee-dashboard/add-leaves"
          className="px-4 py-2 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
      </div>

      {leaves.length === 0 ? (
        <div className="text-center text-gray-500">No leaves found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Leave Type</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Applied On</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave._id} className="bg-white border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{leave.leaveType || "N/A"}</td>
                  <td className="px-4 py-2">
                    {leave.startDate
                      ? new Date(leave.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {leave.endDate
                      ? new Date(leave.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">{leave.reason || "N/A"}</td>
                  <td className="px-4 py-2">
                    {leave.appliedAt
                      ? new Date(leave.appliedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">{leave.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
