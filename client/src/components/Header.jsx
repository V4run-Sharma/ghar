import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-[#1a120b] shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <h1 className="text-[#e5e5cb] font-bold text-xl sm:text-3xl">
          <Link to="/">Ghar</Link>
        </h1>
        <form className="bg-slate-100 py-2 px-3 sm:p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-[#3c2a21] text-xl" />
        </form>
        <ul className="text-[#e5e5cb] flex items-center gap-8">
          <Link to="/">
            <li className="hidden sm:inline cursor-pointer hover:underline  hover:text-white">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline cursor-pointer hover:underline  hover:text-white">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover"
                src={currentUser.avatar}
                alt="profile pic"
              />
            ) : (
              <li className="hidden sm:inline cursor-pointer hover:underline  hover:text-white">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
