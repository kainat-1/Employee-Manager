import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leaves/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        } else {
          setLeave(null);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error fetching leave details");
        setLeave(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/leaves/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      } else {
        setLeave(null);
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Error updating leave status");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!leave) return <p className="text-center mt-10">Leave not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={
              leave?.employeeId?.userId?.profileImage
                ? `http://localhost:3000/public/uploads/${leave.employeeId.userId.profileImage}`
                : "https://dummyimage.com/150x150/ccc/000&text=No+Image"
            }
            alt="Employee"
            className="rounded-full border w-72 h-72 object-cover"
          />
        </div>
        <div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">
              {leave?.employeeId?.userId?.name || "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Employee ID:</p>
            <p className="font-medium">
              {leave?.employeeId?.employeeId || "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Date Of Birth:</p>
            <p className="font-medium">
              {leave?.employeeId?.dob
                ? new Date(leave.employeeId.dob).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">
              {leave?.employeeId?.department?.dep_name || "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Leave Type:</p>
            <p className="font-medium">{leave?.leaveType || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Start Date:</p>
            <p className="font-medium">
              {leave?.startDate
                ? new Date(leave.startDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">End Date:</p>
            <p className="font-medium">
              {leave?.endDate
                ? new Date(leave.endDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-4">
            <p className="text-lg font-bold">Reason:</p>
            <p className="font-medium">{leave?.reason || "N/A"}</p>
          </div>

          {/* Conditionally render Status or Action */}
          {leave?.status === "Pending" ? (
            <>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">Action:</p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                  onClick={() => changeStatus(leave._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                  onClick={() => changeStatus(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-3 mb-4">
              <p className="text-lg font-bold">Status:</p>
              <p className="font-medium">
                {leave?.status
                  ? leave.status.charAt(0).toUpperCase() + leave.status.slice(1)
                  : "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
