import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state
  const { id } = useParams();

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error("Failed to fetch salary:", error);
      alert("Failed to fetch salary data");
    } finally {
      setLoading(false);
    }
  };

  const filterSalaries = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = salaries.filter((sal) =>
      sal?.employeeId?.name?.toLowerCase().includes(keyword)
    );
    setFilteredSalaries(filtered);
  };

  return (
    <>
      {loading ? (
        <div className="p-5">Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">Salary History</h2>
          </div>
          <div className="flex justify-end mb-3">
            <input
              type="text"
              placeholder="Search by Employee Name"
              className="border px-2 py-1 rounded-md border-gray-300"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Basic Salary</th>
                  <th className="px-4 py-2">Allowances</th>
                  <th className="px-4 py-2">Deductions</th>
                  <th className="px-4 py-2">Net Salary</th>
                  <th className="px-4 py-2">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr key={salary._id} className="bg-white border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{salary.basicSalary}</td>
                    <td className="px-4 py-2">{salary.allowances}</td>
                    <td className="px-4 py-2">{salary.deduction}</td>
                    <td className="px-4 py-2">{salary.netSalary}</td>
                    <td className="px-4 py-2">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No Records Found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
