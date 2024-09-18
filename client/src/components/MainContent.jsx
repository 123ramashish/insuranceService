import { useState, useEffect } from "react";

function MainContent() {
  const [totalLeave, setTotalLeave] = useState(0);
  const [casualLeave, setCasualLeave] = useState(0);

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
        // Assuming data contains an array of leaves, filter by type for casual leaves
        var count = 0;
        var casualleave = 0;
        data.map((item) => {
          if (item.typeOfLeave != null) {
            count++;
          }
          if (item.typeOfLeave === "Casual Leave") {
            casualleave++;
          }
        });
        setTotalLeave(count);
        setCasualLeave(casualleave);
        console.log(totalLeave);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 flex flex-col sm:w-full ml-12 justify-start sm:justify-center sm:items-center lg:justify-start lg:items-start">
      <div className="flex space-x-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-600">{totalLeave}</h2>
          <p className="text-gray-600">Total Leaves</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-600">{casualLeave}</h2>
          <p className="text-gray-600">Casual Leaves</p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
