import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddWorkout from "./pages/AddWorkout";
import EditWorkout from "./pages/EditWorkout";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-workout" element={<AddWorkout />} />
            <Route path="/edit-workout/:id" element={<EditWorkout />} />
         </Routes>
      </Router>
   );
}

export default App;
