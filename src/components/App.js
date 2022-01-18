import React from "react"
import Signup from "../components/authentication/Signup"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { AuthProvider } from "../components/authentication/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./structure/Dashboard"
import Login from "../components/authentication/Login"
import PrivateRoute from "./routes/PrivateRoute"
import ForgotPassword from "../components/authentication/ForgotPassword";
import UpdateProfile from "./structure/UpdateProfile";
//import Navbar from "./Navbar";

function App() {
  return( 
        <Container 
        className="d-flex align-items-center justify-content-center" 
        style={{minHeight: "100vh"}}
        >
<div className="w-100 " style={{ maxWidth: '400px'}}>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/*'
            element={(
              <PrivateRoute>
                <Routes>
                  <Route path='/*' element={<Dashboard />} />
                  <Route path='/update-profile' element={<UpdateProfile />} />
                </Routes>
              </PrivateRoute>
            )} 
          />
           <Route path='/update-profile/*'
            element={(
              <PrivateRoute>
                <Routes>
                <Route path='/*' element={<UpdateProfile />} />
                </Routes>
              </PrivateRoute>
            )} 
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </AuthProvider>
    </Router>
</div>
        </Container>
  ) 
}

export default App;
