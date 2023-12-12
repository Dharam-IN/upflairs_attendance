import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Error from "./component/Error";


function App() {
  return (
    <Router>
      <>
      <Header/>
        <Routes>  
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dash" element={<Dashboard/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
