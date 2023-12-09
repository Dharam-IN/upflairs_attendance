import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";


function App() {
  return (
    <Router>
      <>
      <Header/>
        <Routes>  
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
