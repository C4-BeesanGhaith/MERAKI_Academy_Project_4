import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Navigation from "./Components/Navigation";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs";
import PatientList from "./Components/PatientList";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/patients" element={<PatientList/>}/>
      </Routes>
    </div>
  );
}

export default App;
