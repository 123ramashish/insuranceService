import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import EmployeeTable from "../components/EmployeeTable";

function Dashboard() {
  return (
    <div className="flex bg-gray-100 mt-16">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-3/4 ml-12">
        <MainContent />
        <EmployeeTable />
      </div>
    </div>
  );
}

export default Dashboard;
