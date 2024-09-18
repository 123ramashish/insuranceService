import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Modal } from "flowbite-react";

function EmployeeTable() {
  const [openModal, setOpenModal] = useState(false);
  const [opencolumn, setOpencolumn] = useState(false);
  const [employees, setEmployees] = useState([]); // Initialize as an empty array

  // State to manage show/hide for each column
  const [hideshow, setHideshow] = useState({
    empId: true,
    dept: true,
    ins: true,
    tol: true,
    sd: true,
    ed: true,
    cn: true,
    ic: true,
    grossp: true,
    pre: true,
  });

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

  // Handle checkbox changes to show/hide columns
  const handleCheckboxChange = (column) => {
    setHideshow((prevState) => ({
      ...prevState,
      [column]: !prevState[column], // Toggle column visibility
    }));
  };

  return (
    <div className="px-4 ">
      <div className="overflow-x-scroll overflow-y-scroll">
        <table className=" bg-white border border-gray-300 ">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4 border">
                <IoEyeOutline onClick={() => setOpencolumn(true)} />
              </th>
              {hideshow.empId && (
                <th className="text-left py-2 px-4 border">Employee ID</th>
              )}
              {hideshow.dept && (
                <th className="text-left py-2 px-4 border">Department</th>
              )}
              {hideshow.ins && (
                <th className="text-left py-2 px-4 border">Insurance Name</th>
              )}
              {hideshow.tol && (
                <th className="text-left py-2 px-4 border">Type of Leave</th>
              )}
              {hideshow.sd && (
                <th className="text-left py-2 px-4 border">Start Date</th>
              )}
              {hideshow.ed && (
                <th className="text-left py-2 px-4 border">End Date</th>
              )}
              {hideshow.cn && (
                <th className="text-left py-2 px-4 border">Car Number</th>
              )}
              {hideshow.ic && (
                <th className="text-left py-2 px-4 border">
                  Insurance Company
                </th>
              )}
              {hideshow.grossp && (
                <th className="text-left py-2 px-4 border">Gross Premium</th>
              )}
              {hideshow.pre && (
                <th className="text-left py-2 px-4 border">Premium</th>
              )}
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
                  {hideshow.empId && (
                    <td className="py-2 px-4 border">{emp.employeeId}</td>
                  )}
                  {hideshow.dept && (
                    <td className="py-2 px-4 border">{emp.department}</td>
                  )}
                  {hideshow.ins && (
                    <td className="py-2 px-4 border">{emp.insuranceName}</td>
                  )}
                  {hideshow.tol && (
                    <td className="py-2 px-4 border">{emp.typeOfLeave}</td>
                  )}
                  {hideshow.sd && (
                    <td className="py-2 px-4 border">{emp.startDate}</td>
                  )}
                  {hideshow.ed && (
                    <td className="py-2 px-4 border">{emp.endDate}</td>
                  )}
                  {hideshow.cn && (
                    <td className="py-2 px-4 border">{emp.carNumber}</td>
                  )}
                  {hideshow.ic && (
                    <td className="py-2 px-4 border">{emp.insuranceCompany}</td>
                  )}
                  {hideshow.grossp && (
                    <td className="py-2 px-4 border">{emp.grossPremium}</td>
                  )}
                  {hideshow.pre && (
                    <td className="py-2 px-4 border">{emp.premium}</td>
                  )}
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
            <p className="hover:bg-gray-300 p-2 cursor-pointer">Delete</p>
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
                <input
                  type="checkbox"
                  id="employeeId"
                  checked={hideshow.empId}
                  onChange={() => handleCheckboxChange("empId")}
                />
                Employee ID
              </label>
            </div>

            <div>
              <label htmlFor="department" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="department"
                  checked={hideshow.dept}
                  onChange={() => handleCheckboxChange("dept")}
                />
                Department
              </label>
            </div>

            <div>
              <label
                htmlFor="insuranceType"
                className="flex gap-4 items-center"
              >
                <input
                  type="checkbox"
                  id="insuranceType"
                  checked={hideshow.ins}
                  onChange={() => handleCheckboxChange("ins")}
                />
                Insurance Name
              </label>
            </div>

            <div>
              <label htmlFor="typeOfLeave" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="typeOfLeave"
                  checked={hideshow.tol}
                  onChange={() => handleCheckboxChange("tol")}
                />
                Type of Leave
              </label>
            </div>

            <div>
              <label htmlFor="startDate" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="startDate"
                  checked={hideshow.sd}
                  onChange={() => handleCheckboxChange("sd")}
                />
                Start Date
              </label>
            </div>

            <div>
              <label htmlFor="endDate" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="endDate"
                  checked={hideshow.ed}
                  onChange={() => handleCheckboxChange("ed")}
                />
                End Date
              </label>
            </div>

            <div>
              <label htmlFor="carNumber" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="carNumber"
                  checked={hideshow.cn}
                  onChange={() => handleCheckboxChange("cn")}
                />
                Car Number
              </label>
            </div>

            <div>
              <label
                htmlFor="insuranceCompany"
                className="flex gap-4 items-center"
              >
                <input
                  type="checkbox"
                  id="insuranceCompany"
                  checked={hideshow.ic}
                  onChange={() => handleCheckboxChange("ic")}
                />
                Insurance Company
              </label>
            </div>

            <div>
              <label htmlFor="grossPremium" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="grossPremium"
                  checked={hideshow.grossp}
                  onChange={() => handleCheckboxChange("grossp")}
                />
                Gross Premium
              </label>
            </div>

            <div>
              <label htmlFor="premium" className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  id="premium"
                  checked={hideshow.pre}
                  onChange={() => handleCheckboxChange("pre")}
                />
                Premium
              </label>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EmployeeTable;
