import React from "react";

const AddLeave = () => {
  const handleChange = (e) => {};
  return (
    <div className="msx-w-4xl mx auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold md-6">Request For Leave</h2>
      <form>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            name="leaveType"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select </option>
            <option value="Sick Leave">Sick Leave </option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave ">Annual Leave </option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* from date */}
          <div>
            <label className="block text-sm font-medium text=gray-700">
              {" "}
              From Date
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=gray-700">
              {" "}
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text=gray-700">
              Description
            </label>
            <input
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300 "
            />
          </div>
        </div>
        <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddLeave;
