import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import AllRequest from "./pages/AllRequest";
import Navbar from "./components/Navbar";
import Request from "./components/Request";
import UpdateEmployee from "./components/UpdateEmployee";
// import OnlyAdminPrivateRoute from "./components/OnlyAdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route element={<OnlyAdminPrivateRoute />}> */}
          <Route path="/allrequest" element={<AllRequest />} />
          <Route path="/addrequest" element={<Request />} />
          <Route path="/updateemployee" element={<UpdateEmployee />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
