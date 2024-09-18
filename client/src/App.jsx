import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import AllRequest from "./pages/AllRequest";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Request from "./components/Request";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allrequest" element={<AllRequest />} />
          <Route path="/addrequest" element={<Request />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
