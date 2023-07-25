// components/Navbar.js

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
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
