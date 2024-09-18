import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";

function LeaveRequestHeader() {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200 w-full">
      <h1 className="text-lg font-semibold">All Leave Requests</h1>

      <div className="flex space-x-2">
        <button className="p-2 border border-gray-300 rounded">
          <FiSearch className="w-5 h-5 text-gray-500" />
        </button>

        <a href="/addrequest" className="p-2 bg-blue-500 text-white rounded">
          <HiPlus className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export default LeaveRequestHeader;
