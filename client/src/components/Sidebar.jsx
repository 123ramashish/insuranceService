import React from "react";
import { FaHome, FaPlusCircle } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="bg-indigo-900 text-white w-80 p-6 flex flex-col absolute left-0 h-full">
      <div className="text-2xl font-bold mb-10">My First Project</div>

      <nav className="flex flex-col space-y-4">
        <a
          href="#"
          className="flex items-center space-x-2 py-2 px-4 bg-indigo-700 rounded-md"
        >
          <FaHome />
          <span>Home</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 py-2 px-4 hover:bg-indigo-700 rounded-md"
        >
          <FaHome />
          <span>All Requests</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 py-2 px-4 hover:bg-indigo-700 rounded-md"
        >
          <FaPlusCircle />
          <span>Add Request</span>
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
