import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import Dashboard from "../components/structure/dashboard/Dashboard";
import Feed from "../components/structure/feed/Feed";

export default function ProjectRoutes() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}
