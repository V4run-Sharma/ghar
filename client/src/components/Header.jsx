import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-[#1f2249] shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <h1 className="text-white font-bold text-xl sm:text-3xl">
          <Link to="/">Ghar</Link>
        </h1>
        <form className="bg-slate-100 py-2 px-3 sm:p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-[#1f2249] text-xl" />
        </form>
        <ul className="text-[#cbd4e5] flex items-center sm:gap-8">
          <Link to="/">
            <li className="hidden sm:inline cursor-pointer hover:underline  hover:text-white">
              HOME
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline cursor-pointer hover:underline  hover:text-white">
              ABOUT
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
