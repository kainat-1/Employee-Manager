import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
    // add other fields if needed, like dob, email, etc.
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

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

        if (response.data.success) {
          setEmployee(response.data.employee);

          // Initialize formData from fetched employee
          const emp = response.data.employee;
          setFormData({
            name: emp.userId?.name || "",
            department: emp.department?._id || "",
            salary: emp.salary || "",
            // add other fields here if needed
          });
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error fetching employee");
      } finally {
        setLoading(false);
      }
    };

    const fetchDeps = async () => {
      try {
        const deps = await fetchDepartments();
        setDepartments(deps);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };

    fetchEmployee();
    fetchDeps();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("department", formData.department);
      dataToSend.append("salary", formData.salary);
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }
const response = await axios.put(
  `http://localhost:3000/api/employee/${id}`,
  dataToSend,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
    },
  }
);


      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Error updating employee");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Insert Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;
