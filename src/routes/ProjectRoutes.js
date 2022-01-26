
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from "../components/authentication/Login"
import UpdateProfile from "./../components/structure/UpdateProfile"
import Dashboard from "./../components/structure/Dashboard"
import AddUser from "../components/authentication/AddUser"
import Signup from "../components/authentication/Signup"

export default function ProjectRoutes(){
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route index path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
        </Router>
    )
}