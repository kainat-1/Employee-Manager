import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: new Date(emp.dob).toDateString(),
            profileImage: (
              <img
                src={`http://localhost:3000/public/uploads/${emp.userId?.profileImage}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ),
            action: <EmployeeButtons id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error fetching employees");
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);
  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredEmployee(records);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-5 py-0.5 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
        />
      </div>
    </div>
  );
};

export default List;
