import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Modal } from "flowbite-react";

function EmployeeTable() {
  const [openModal, setOpenModal] = useState(false);
  const [opencolumn, setOpencolumn] = useState(false);
  const leaveRequests = [
    {
      employeeId: "E012",
      department: "Operations",
      insuranceName: "Travel",
      typeOfLeave: "Casual Leave",
      startDate: "18-Sep-2024",
      endDate: "23-Sep-2024",
      carNumber: "DL4525",
      insuranceCompany: "BAJAJ ALLIANZ GENERAL INS. CO. LTD",
      grossPremium: "",
      premium: "",
    },
    {
      employeeId: "E011",
      department: "Marketing",
      insuranceName: "Health",
      typeOfLeave: "Sick Leave",
      startDate: "16-Sep-2024",
      endDate: "21-Sep-2024",
      carNumber: "",
      insuranceCompany: "TATA-AIG GENERAL INSURANCE CO. LTD",
      grossPremium: "",
      premium: "",
    },
  ];

  return (
    <div className="px-4 ">
      <div className=" overflow-x-auto overflow-y-auto">
        <table className="bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4 border">
                <IoEyeOutline onClick={() => setOpencolumn(true)} />
              </th>
              <th className="text-left py-2 px-4 border">Employee ID</th>
              <th className="text-left py-2 px-4 border">Department</th>
              <th className="text-left py-2 px-4 border">Insurance Name</th>
              <th className="text-left py-2 px-4 border">Type of Leave</th>
              <th className="text-left py-2 px-4 border">Start Date</th>
              <th className="text-left py-2 px-4 border">End Date</th>
              <th className="text-left py-2 px-4 border">Car Number</th>
              <th className="text-left py-2 px-4 border">Insurance Company</th>
              <th className="text-left py-2 px-4 border">Gross Premium</th>
              <th className="text-left py-2 px-4 border">Premium</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="py-2 px-4 border relative">
                  <HiOutlineDotsHorizontal onClick={() => setOpenModal(true)} />
                </td>

                <td className="py-2 px-4 border">{request.employeeId}</td>
                <td className="py-2 px-4 border">{request.department}</td>
                <td className="py-2 px-4 border">{request.insuranceName}</td>
                <td className="py-2 px-4 border">{request.typeOfLeave}</td>
                <td className="py-2 px-4 border">{request.startDate}</td>
                <td className="py-2 px-4 border">{request.endDate}</td>
                <td className="py-2 px-4 border">{request.carNumber}</td>
                <td className="py-2 px-4 border">{request.insuranceCompany}</td>
                <td className="py-2 px-4 border">{request.grossPremium}</td>
                <td className="py-2 px-4 border">{request.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} className="">
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="hover:bg-gray-300 p-2 cursor-pointer">Edit</p>
            <p className="hover:bg-gray-300 p-2 cursor-pointer">Duplicate</p>
            <p className="hover:bg-gray-300 p-2 cursor-pointer">Delete</p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={opencolumn} onClose={() => setOpencolumn(false)}>
        <Modal.Header>Show/hide column</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="employeeId" className="flex gap-4 items-center">
                <input type="checkbox" id="employeeId" />
                Employee Id
              </label>
            </div>

            <div>
              <label htmlFor="department" className="flex gap-4 items-center">
                <input type="checkbox" id="department" />
                Department
              </label>
            </div>

            <div>
              <label
                htmlFor="insuranceType"
                className="flex gap-4 items-center"
              >
                <input type="checkbox" id="insuranceType" />
                Insurance Type
              </label>
            </div>

            <div>
              <label htmlFor="typeOfLeave" className="flex gap-4 items-center">
                <input type="checkbox" id="typeOfLeave" />
                Type of Leave
              </label>
            </div>

            <div>
              <label htmlFor="startDate" className="flex gap-4 items-center">
                <input type="checkbox" id="startDate" />
                Start Date
              </label>
            </div>

            <div>
              <label htmlFor="endDate" className="flex gap-4 items-center">
                <input type="checkbox" id="endDate" />
                End Date
              </label>
            </div>

            <div>
              <label htmlFor="carNumber" className="flex gap-4 items-center">
                <input type="checkbox" id="carNumber" />
                Car Number
              </label>
            </div>

            <div>
              <label
                htmlFor="insuranceCompany"
                className="flex gap-4 items-center"
              >
                <input type="checkbox" id="insuranceCompany" />
                Insurance Company
              </label>
            </div>

            <div>
              <label htmlFor="grossPremium" className="flex gap-4 items-center">
                <input type="checkbox" id="grossPremium" />
                Gross Premium
              </label>
            </div>

            <div>
              <label htmlFor="premium" className="flex gap-4 items-center">
                <input type="checkbox" id="premium" />
                Premium
              </label>
            </div>

            <div>
              <label htmlFor="reason" className="flex gap-4 items-center">
                <input type="checkbox" id="reason" />
                Reason
              </label>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={() => setOpenModal(false)}
            className="p-2 bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          >
            Done
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeeTable;
