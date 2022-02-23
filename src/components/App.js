import React from "react";
import ProjectRoutes from "../routes/ProjectRoutes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ProjectRoutes />
    </RecoilRoot>
  );
}

export default App;
