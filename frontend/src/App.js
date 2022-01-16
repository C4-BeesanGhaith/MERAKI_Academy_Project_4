import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Navigation from "./Components/Navigation";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs";
import PatientList from "./Components/PatientList";
import NewPatient from "./Components/NewPatient";
import Diagnosis from "./Components/Diagnosis";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/patients" element={<PatientList/>}/>
        <Route path="/new" element={<NewPatient/>}/>
        <Route path="/diagnosis" element={<Diagnosis/>}/>
      </Routes>
    </div>
  );
}

export default App;
