import React from "react";

function MainContent() {
  return (
    <div className="p-6 flex flex-col space-y-6">
      <div className="flex space-x-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
          <h2 className="text-2xl font-bold text-blue-600">11</h2>
          <p className="text-gray-600">Total Leaves</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
          <h2 className="text-2xl font-bold text-blue-600">1</h2>
          <p className="text-gray-600">Casual Leaves</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
          <input
            type="text"
            placeholder="Search Employee ID"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2"
          />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
