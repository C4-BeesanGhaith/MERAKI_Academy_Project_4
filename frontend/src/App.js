import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
