import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";


function App() {
  return (
    <Router>
      <>
      <Header/>
        <Routes>  
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
