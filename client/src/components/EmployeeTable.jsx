import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Modal } from "flowbite-react";

function EmployeeTable() {
  const [openModal, setOpenModal] = useState(false);
  const [opencolumn, setOpencolumn] = useState(false);
  const [employees, setEmployees] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employee", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        setEmployees(data); // Assuming `data` is an array of employees
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 ">
      <div className="overflow-x-scroll overflow-y-scroll">
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
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr
                  key={emp._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="py-2 px-4 border relative">
                    <HiOutlineDotsHorizontal
                      onClick={() => setOpenModal(true)}
                    />
                  </td>
                  <td className="py-2 px-4 border">{emp.employeeId}</td>
                  <td className="py-2 px-4 border">{emp.department}</td>
                  <td className="py-2 px-4 border">{emp.insuranceName}</td>
                  <td className="py-2 px-4 border">{emp.typeOfLeave}</td>
                  <td className="py-2 px-4 border">{emp.startDate}</td>
                  <td className="py-2 px-4 border">{emp.endDate}</td>
                  <td className="py-2 px-4 border">{emp.carNumber}</td>
                  <td className="py-2 px-4 border">{emp.insuranceCompany}</td>
                  <td className="py-2 px-4 border">{emp.grossPremium}</td>
                  <td className="py-2 px-4 border">{emp.premium}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-4 px-6 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Action Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)} className="">
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="hover:bg-gray-300 p-2 cursor-pointer">Edit</p>
            <p
              className="hover:bg-gray-300 p-2 cursor-pointer"
              // onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Column Show/Hide Modal */}
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
