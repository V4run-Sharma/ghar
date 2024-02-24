import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  return (
    <header className="bg-[#1f2249] shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <h1 className="text-white font-bold text-xl sm:text-3xl">
          <Link to="/">Ghar</Link>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 py-2 px-3 sm:p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
