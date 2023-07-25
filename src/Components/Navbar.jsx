// components/Navbar.js

import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="mr-2">
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/expense-2038073-1722975.png?f=avif&w=256"
              alt="Logo"
              className="w-8 h-8 bg-white"
            />
          </div>
          <div className="font-semibold text-white">Income-Expense-Tracker</div>
        </div>

        {/* Hamburger Icon */}
        <div
          className="block lg:hidden cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <div
            className={`w-6 h-1 bg-white my-1 ${
              isMobileMenuOpen ? "rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-white my-1 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-white my-1 ${
              isMobileMenuOpen ? "-rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`lg:flex space-x-4 ${
            isMobileMenuOpen ? "flex flex-col lg:flex-row" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="text-white font-medium hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/income"
              className="text-white font-medium hover:text-blue-200"
            >
              Income
            </Link>
          </li>
          <li>
            <Link
              to="/expense"
              className="text-white font-medium hover:text-blue-200"
            >
              Expense
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
