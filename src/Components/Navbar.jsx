import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">Income-expense Tracker</div>

      <input type="checkbox" id="click" />
      <label className="menu-btn" htmlFor="click">
        <i className="fa-solid fa-bars"></i>
      </label>

      <ul className="menu">
        <li>
          <Link to="/" className="active">
            Home
          </Link>
        </li>

        <li>
          <Link to="/income">Income</Link>
        </li>
        <li>
          <Link to="/expense">Expense</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
