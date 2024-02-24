import React from "react";

const Search = () => {
  return (
    <main className="w-screen flex md:flex-row flex-col">
      <div className="md:min-h-screen border-b-2 md:border-r-2 md:p-8 min-[425px]:p-4 p-2">
        <form className=" flex flex-col sm:gap-6 gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="p-2 rounded-lg border w-full"
            />
          </div>
          <div className="flex gap-x-4 gap-y-2 items-start">
            <label className="font-semibold">Type:</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="all"
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Rent and Sale</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="rent"
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="sale"
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Offer</span>
              </div>
            </div>
          </div>
          <div className="flex gap-x-4 gap-y-2 items-start">
            <label className="font-semibold">Amenities:</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Parking</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort: </label>
            <select
              id="sort_order"
              defaultValue={"Latest"}
              className="border p-2 rounded-lg ">
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-[#1f2249] hover:opacity-80 transition-all ease-in-out rounded-lg text-white">
            SEARCH
          </button>
        </form>
      </div>
      <div className="md:min md:p-8 min-[425px]:p-4 p-2">
        <h1 className="sm:text-3xl text-xl text-[#1f2249] font-bold">
          Results:
        </h1>
      </div>
    </main>
  );
};

export default Search;
