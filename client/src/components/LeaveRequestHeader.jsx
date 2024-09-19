import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { Drawer } from "flowbite-react";
import { useDispatch } from "react-redux";
import { getEmployeeSuccess } from "../redux/employee/employeeSlice.js";

function LeaveRequestHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    insuranceType: "",
    department: "",
    typeOfLeave: "",
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

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/employee/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            insuranceType: formData.insuranceType,
            department: formData.department,
            typeOfLeave: formData.typeOfLeave,
            startDate: formData.startDate,
            endDate: formData.endDate,
            carNumber: formData.carNumber,
            insuranceCompany: formData.insuranceCompany,
            premium: formData.premium,
            grossPremium: formData.grossPremium,
            reason: formData.reason,
          }),
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        // Try to parse the error response as JSON
        let errorMessage = "An error occurred";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || "Data not found!";
        } catch (e) {
          // If parsing JSON fails, handle plain text response
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      // Parse the response as JSON if it's OK
      const data = await response.json();
      console.log(data);
      dispatch(getEmployeeSuccess(data));

      // Reset the form data
      setFormData({
        insuranceType: "",
        department: "",
        typeOfLeave: "",
        startDate: "",
        endDate: "",
        carNumber: "",
        insuranceCompany: "",
        premium: "",
        grossPremium: "",
        reason: "",
      });

      // Close the drawer after search
      setIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-4 border-b border-gray-200 w-full">
        <h1 className="text-lg font-semibold">All Leave Requests</h1>

        <div className="flex space-x-2">
          <button
            className="p-2 border border-gray-300 rounded"
            onClick={() => setIsOpen(true)}
          >
            <FiSearch className="w-5 h-5 text-gray-500" />
          </button>
          <a href="/addrequest" className="p-2 bg-blue-500 text-white rounded">
            <HiPlus className="w-5 h-5" />
          </a>
        </div>
      </div>

      <Drawer open={isOpen} position="right" onClose={() => setIsOpen(false)}>
        <Drawer.Header title="" />

        <Drawer.Items>
          <div className="p-4 max-w-lg">
            {/* Insurance Type */}
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
            </div>

            {/* Type of Leave */}
            <div className="mb-4">
              <label htmlFor="typeOfLeave" className="block">
                Type of Leave
              </label>
              <select
                id="typeOfLeave"
                name="typeOfLeave"
                value={formData.typeOfLeave}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Type of Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Public Holiday">Public Holiday</option>
                <option value="Other">Other</option>
              </select>
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
              <select
                id="insuranceCompany"
                name="insuranceCompany"
                value={formData.insuranceCompany}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Insurance Company</option>
                <option value="TATA-AIG GENERAL INSURANCE CO.LTD">
                  TATA-AIG GENERAL INSURANCE CO.LTD
                </option>
                <option value="BAJAJ">BAJAJ</option>
                <option value="KOTAK">KOTAK</option>
                <option value="IFFKO">IFFKO</option>
              </select>
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
                className="p-2 bg-blue-500 text-white rounded"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="p-2 bg-gray-500 text-white rounded"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default LeaveRequestHeader;
