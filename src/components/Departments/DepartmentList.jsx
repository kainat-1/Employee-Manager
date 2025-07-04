import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, DepartmentButtons } from "../../utils/departmentHelpers";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  const onDepartmentDelete = (id) => {
    const updatedList = departments.filter((dep) => dep._id !== id);
    setDepartments(updatedList);
    setFilteredDepartments(updatedList);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                _id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));

          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Error fetching departments");
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const keyword = e.target.value.toLowerCase();
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(keyword)
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-5 py-0.5 border rounded"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>

      {depLoading ? (
        <div>Loading...!</div>
      ) : (
        <div className="mt-5">
          <DataTable columns={columns} data={filteredDepartments} pagination />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
