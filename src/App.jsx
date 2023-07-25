import './App.css'
// App.js

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Income from './Pages/Income';
import Expense from './Pages/Expense';


function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <div className="container mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


