import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import Dashboard from "../components/structure/dashboard/Dashboard";

export default function ProjectRoutes() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
