import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#0c0f3b] shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <h1 className="text-[#ff5a5a] font-bold text-xl sm:text-3xl">
          <Link to="/">Ghar</Link>
        </h1>
        <form className="bg-slate-100 py-2 px-3 sm:p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-[#ff5a5a] text-xl" />
        </form>
        <ul className="text-white flex gap-8">
          <Link to="/">
            <li className="hidden sm:inline cursor-pointer hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline cursor-pointer hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="hidden sm:inline cursor-pointer hover:underline">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
