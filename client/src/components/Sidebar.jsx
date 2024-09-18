import { FaHome, FaPlusCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Sidebar() {
  // useLocation gives access to the current path
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="sm:w-full bg-indigo-900 lg:min-h-screen lg:w-80 absolute left-0 top-16">
      <div className="bg-indigo-900 text-white w-80 p-6 flex flex-col">
        <div className="text-2xl font-bold mb-10">My First Project</div>

        <nav className="flex flex-col space-y-4">
          <a
            href="/dashboard"
            className={`flex items-center space-x-2 py-2 px-4 ${
              currentPath === "/home" ? "bg-indigo-700" : ""
            } rounded-md hover:bg-indigo-700`}
          >
            <FaHome />
            <span>Home</span>
          </a>

          <a
            href="/allrequest"
            className={`flex items-center space-x-2 py-2 px-4 ${
              currentPath === "/allrequest" ? "bg-indigo-700" : ""
            } rounded-md hover:bg-indigo-700`}
          >
            <FaHome />
            <span>All Requests</span>
          </a>

          <a
            href="/addrequest"
            className={`flex items-center space-x-2 py-2 px-4 ${
              currentPath === "/addrequest" ? "bg-indigo-700" : ""
            } rounded-md hover:bg-indigo-700`}
          >
            <FaPlusCircle />
            <span>Add Request</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
