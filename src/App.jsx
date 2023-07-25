import './App.css'
// App.js


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Expense from './Pages/Expense';
import Income from './Pages/Income';


function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expense" element={<Expense/>} />
        <Route path="/income" element={<Income/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



