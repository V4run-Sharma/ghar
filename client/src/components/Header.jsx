import { FaSearch, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(isMenuOpen);
  return (
    <header
      className={`bg-[#1f2249] shadow-lg fixed top-0 w-full ${
        isMenuOpen ? "h-16 sm:h-fit pt-1" : ""
      } z-20`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <h1 className="text-white font-bold text-xl sm:text-3xl">
          <Link to="/">Ghar</Link>
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`${
            isMenuOpen ? "sm:flex hidden" : "flex"
          } bg-slate-100 py-2 px-3 sm:p-3 rounded-lg items-center`}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch
            onClick={handleSubmit}
            className="text-[#1f2249] text-xl cursor-pointer"
          />
        </form>
        <div className="flex gap-4 items-center">
          <div className="sm:hidden ">
            <FaBars
              className="text-white text-xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <ul
            className={`text-[#cbd4e5] flex items-center sm:gap-8 gap-4 ${
              isMenuOpen ? "flex" : "hidden sm:flex"
            }`}>
            <li className="cursor-pointer hover:underline  hover:text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:underline  hover:text-white">
              <Link to="/about">About</Link>
            </li>
            <li className="cursor-pointer hover:underline  hover:text-white">
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-9 w-9 object-cover"
                    src={currentUser.avatar}
                    alt="profile pic"
                  />
                ) : (
                  "Sign In"
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
