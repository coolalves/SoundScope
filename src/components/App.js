import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ProjectRoutes from "../routes/ProjectRoutes";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 " style={{ maxWidth: "400px" }}>
        <ProjectRoutes />
      </div>
    </Container>
  );
}

export default App;
