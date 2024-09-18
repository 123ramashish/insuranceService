import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import EmployeeTable from "../components/EmployeeTable";

function Home() {
  return (
    <div className="flex sm:flex-col lg:flex-row bg-gray-100 w-full">
      <div className="lg:w-1/4 sm:w-full">
        <Sidebar />
      </div>
      <div className="flex flex-col sm:w-96 lg:w-3/4 lg:absolute top-16 left-96 ">
        <MainContent />

        <EmployeeTable />
      </div>
    </div>
  );
}

export default Home;
