import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";

import GK from "./Images/GK.png";
import Final from "./Pages/Final";

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/final">
          <img src={GK} alt="logo" className="logo" width="50px" />
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Final />} />
      </Routes>
    </div>
  );
}

export default App;
