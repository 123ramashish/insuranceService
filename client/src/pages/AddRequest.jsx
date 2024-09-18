import { useState } from "react";

export default function AddRequest() {
  const [wait, setWait] = useState(false);
  const [formData, setFormData] = useState({
    insuranceType: "",
    department: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    carNumber: "",
    insuranceCompany: "",
    premium: "",
    grossPremium: "",
    reason: "",
  });

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for resetting the form
  const resetForm = () => {
    setFormData({
      insuranceType: "",
      department: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      carNumber: "",
      insuranceCompany: "",
      premium: "",
      grossPremium: "",
      reason: "",
    });
  };

  // Handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Fix the typo from 'preventDefalut'
    setWait(true);

    // Prepare the formatted data according to the API requirements
    const formattedData = {
      insuranceType: formData.insuranceType,
      department: formData.department,
      typeOfLeave: formData.leaveType,
      startDate: formData.startDate.split("-").reverse().join("/"),
      endDate: formData.endDate.split("-").reverse().join("/"),
      carNumber: formData.carNumber,
      insuranceCompany: formData.insuranceCompany,
      premium: formData.premium,
      grossPremium: formData.grossPremium,
      reason: formData.reason,
    };

    try {
      const response = await fetch("http://localhost:8000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setWait(false);
        alert("Request submitted successfully: ");
        resetForm();
      } else {
        alert("Error to submit form ");
      }
    } catch (err) {
      setWait(false);
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <>
      <div className="p-4 max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="insuranceType" className="block">
              Insurance Type
            </label>
            <select
              id="insuranceType"
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Insurance Type</option>
              <option value="Health">Health</option>
              <option value="Motor">Motor</option>
              <option value="Travel">Travel</option>
              <option value="Fire">Fire</option>
              <option value="Cyber">Cyber</option>
            </select>
          </div>

          {/* Department */}
          <div className="mb-4">
            <label htmlFor="department" className="block">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Department</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Packing">Packing</option>
              <option value="Other">Other</option>
            </select>
            {formData.department === "Other" && (
              <input
                type="text"
                name="otherDepartment"
                placeholder="Enter Other Department"
                value={formData.otherDepartment}
                onChange={handleChange}
                className="block w-full p-2 mt-2 border rounded"
              />
            )}
          </div>

          {/* Type of Leave */}
          <div className="mb-4">
            <label htmlFor="leaveType" className="block">
              Type of Leave
            </label>
            <select
              id="leaveType"
              name="leaveType"
              required
              value={formData.leaveType}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Type of Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Public Holiday">Public Holiday</option>
              <option value="Other">Other</option>
            </select>
            {formData.leaveType === "Other" && (
              <input
                type="text"
                name="otherLeaveType"
                placeholder="Enter Other Leave Type"
                value={formData.otherLeaveType}
                onChange={handleChange}
                className="block w-full p-2 mt-2 border rounded"
              />
            )}
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label htmlFor="endDate" className="block">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded"
            />
          </div>

          {/* Car Number */}
          <div className="mb-4">
            <label htmlFor="carNumber" className="block">
              Car Number
            </label>
            <input
              type="text"
              id="carNumber"
              name="carNumber"
              value={formData.carNumber}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          {/* Insurance Company */}
          <div className="mb-4">
            <label htmlFor="insuranceCompany" className="block">
              Insurance Company
            </label>
            <input
              type="text"
              id="insuranceCompany"
              name="insuranceCompany"
              value={formData.insuranceCompany}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          {/* Premium */}
          <div className="mb-4">
            <label htmlFor="premium" className="block">
              Premium
            </label>
            <input
              type="number"
              id="premium"
              name="premium"
              value={formData.premium}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          {/* Gross Premium */}
          <div className="mb-4">
            <label htmlFor="grossPremium" className="block">
              Gross Premium
            </label>
            <input
              type="number"
              id="grossPremium"
              name="grossPremium"
              value={formData.grossPremium}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label htmlFor="reason" className="block">
              Reason
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="p-2 rounded-md shadow-md bg-blue-500 hover:bg-blue-600 text-white"
            >
              {wait ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 rounded-md shadow-md bg-gray-400 hover:bg-gray-500 text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
