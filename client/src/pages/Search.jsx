import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    parking: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const furnishedFromUrl = urlParams.get("furnished");
    const parkingFromUrl = urlParams.get("parking");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      furnishedFromUrl ||
      parkingFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        furnished: furnishedFromUrl === "true" ? true : false,
        parking: parkingFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/listings/get?${searchQuery}`);
      const data = await response.json();
      setListings(data);
      setLoading(false);
      console.log(data);
    };
    fetchListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("type", searchData.type);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("parking", searchData.parking);
    urlParams.set("offer", searchData.offer);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <main className="w-screen flex md:flex-row flex-col">
      <div className="md:min-h-screen border-b-2 md:border-r-2 md:p-8 min-[425px]:p-4 p-2">
        <form onSubmit={handleSubmit} className=" flex flex-col sm:gap-6 gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={searchData.searchTerm}
              onChange={handleChange}
              className="p-2 rounded-lg border w-full hover:drop-shadow-sm transition-all ease-in-out"
            />
          </div>
          <div className="flex gap-x-4 gap-y-2 items-start">
            <label className="font-semibold">Type:</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="all"
                  onChange={handleChange}
                  checked={searchData.type === "all"}
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Rent and Sale</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="rent"
                  onChange={handleChange}
                  checked={searchData.type === "rent"}
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={searchData.type === "sale"}
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  checked={searchData.offer}
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
                  onChange={handleChange}
                  checked={searchData.furnished}
                  className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={searchData.parking}
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
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              className="border p-2 rounded-lg appearance-none hover:shadow-md transition-all ease-in-out">
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-[#1f2249] hover:opacity-80 transition-all ease-in-out rounded-lg text-white">
            SEARCH
          </button>
        </form>
      </div>
      <div className="sm:p-8 p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:gap-8 gap-4 items-start">
          <h1 className="sm:text-3xl text-xl text-[#1f2249] font-bold">
            Results:
          </h1>
          {!loading && listings.length === 0 && (
            <h1 className="text-xl inline-block text-red-600 opacity-80 font-bold">
              No listings found
            </h1>
          )}
          {loading && (
            <h1 className="text-xl inline-block text-[#1f2249] opacity-50 font-bold">
              Loading...
            </h1>
          )}
        </div>
        <div className="flex flex-wrap sm:gap-8 gap-4">
          {!loading &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Search;
