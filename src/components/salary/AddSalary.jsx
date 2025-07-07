import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddSalary = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: "",
    department: "",
    salary: "",
    basicSalary: "",
    allowance: "",
    deduction: "",
    payDate: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDeps = async () => {
      try {
        const deps = await fetchDepartments();
        setDepartments(deps || []);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };

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
          const emp = response.data.employee;

          setFormData((prev) => ({
            ...prev,
            employeeId: emp._id,
            department: emp.department?._id || "",
            salary: emp.salary || 0,
          }));

          if (emp.department?._id) {
            const emps = await getEmployees(emp.department._id);
            setEmployeeList(emps || []);
          }
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error fetching employee");
      } finally {
        setLoading(false);
      }
    };

    fetchDeps();

    if (id) {
      fetchEmployee();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;
    setFormData((prev) => ({
      ...prev,
      department: selectedDepartment,
      employeeId: "",
    }));

    try {
      if (selectedDepartment) {
        const emps = await getEmployees(selectedDepartment);
        setEmployeeList(emps || []);
      } else {
        setEmployeeList([]);
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployeeList([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["salary", "basicSalary", "allowances", "deduction"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        formData,
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
      alert(error?.response?.data?.error || "Error adding salary");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleDepartmentChange}
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

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
              disabled={!formData.department}
            >
              <option value="">Select Employee</option>
              {Array.isArray(employeeList) &&
                employeeList.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {/* Show employee's name or email instead of employeeId */}
                    {emp.userId?.name || emp.userId?.email || emp.employeeId}
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
              min="0"
            />
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              placeholder="Insert Basic Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              min="0"
            />
          </div>

          {/* Allowance */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allowances
            </label>
            <input
              type="number"
              name="allowance"
              value={formData.allowance}
              onChange={handleChange}
              placeholder="Insert Allowance"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              min="0"
            />
          </div>

          {/* Deduction */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deduction
            </label>
            <input
              type="number"
              name="deduction"
              value={formData.deduction}
              onChange={handleChange}
              placeholder="Insert Deduction"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              min="0"
            />
          </div>
          {/* Net Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Net salary
            </label>
            <input
              type="number"
              name="netSalary"
              value={formData.netSalary}
              onChange={handleChange}
              placeholder="Net Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              min="0"
            />
          </div>

          {/* Pay Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              value={formData.payDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
