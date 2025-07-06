import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );


        // console.log(response.data)

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error fetching employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  // if (!employee) return <p className="text-center mt-10">Employee not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={`http://localhost:3000/public/uploads/${employee.userId.profileImage}`}
            alt={employee.userId.name || "Employee"}
            className="rounded-full border w-72 h-72 object-cover"
          />
        </div>
        <div>
          <Detail label="Name" value={employee.userId.name} />
          <Detail label="Employee ID" value={employee.userId.employeeId} />
          <Detail
            label="Date Of Birth"
            value={new Date(employee.dob).toLocaleDateString()}
          />
          <Detail label="Department" value={employee.department?.dep_name} />
        </div>
      </div>
    </div>
  );
};


const Detail = ({ label, value }) => (
  <div className="flex space-x-3 mb-5">
    <p className="text-lg font-bold">{label}:</p>
    <p className="font-medium">{value || "N/A"}</p>
  </div>
);

export default View;
