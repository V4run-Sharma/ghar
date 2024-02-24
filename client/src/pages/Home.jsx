import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [listingsOnOffer, setListingsOnOffer] = useState([]);
  const [listingsForSale, setListingsForSale] = useState([]);
  const [listingsForRent, setListingsForRent] = useState([]);

  useEffect(() => {
    const fetchListingsOnOffer = async () => {
      try {
        const response = await fetch("/api/listings/get?offer=true&limit=4");
        const data = await response.json();
        setListingsOnOffer(data);
        fetchListingsForSale();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchListingsForSale = async () => {
      try {
        const response = await fetch("/api/listings/get?type=sale&limit=4");
        const data = await response.json();
        setListingsForSale(data);
        fetchListingsForRent();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchListingsForRent = async () => {
      try {
        const response = await fetch("/api/listings/get?type=rent&limit=4");
        const data = await response.json();
        setListingsForRent(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListingsOnOffer();
  }, []);

  return (
    <main className="max-w-full mt-16">
      <div className="max-h-[32rem] flex flex-col gap-4 bg-[url('/hero.png')] bg-no-repeat bg-cover bg-right sm:bg-center justify-center sm:pt-[15vw] sm:pr-[50vw] sm:pb-[15vw] sm:pl-[12vw] p-8">
        <h3 className="sm:text-[3rem] text-3xl sm:leading-[3rem] font-bold text-white">
          Find your next <span>perfect</span> place with ease
        </h3>
        <p className="text-white">
          <span className="inline-block">Ghar Real Estate</span> will help you
          find your home fast, easy and comfortable. Our support options are
          always available
        </p>
        <Link to={"/search"} className="text-blue-300 text-sm font-semibold">
          Lets Start Here...
        </Link>
      </div>
      <div className="max-w-7xl mx-auto sm:p-8 p-4 flex flex-col gap-8">
        {listingsOnOffer && listingsOnOffer.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Recent Offers</h2>
              <Link
                to="/search?offer=true"
                className="text-blue-600 font-semibold">
                See all offers →
              </Link>
            </div>
            <div className="flex flex-wrap sm:gap-8 gap-4">
              {listingsOnOffer.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {listingsForSale && listingsForSale.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">On Sale</h2>
              <Link
                to="/search?type=sale"
                className="text-blue-600 font-semibold">
                See all offers →
              </Link>
            </div>
            <div className="flex flex-wrap sm:gap-8 gap-4">
              {listingsForSale.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {listingsForRent && listingsForRent.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Recent Offers</h2>
              <Link
                to="/search?type=rent"
                className="text-blue-600 font-semibold">
                See all offers →
              </Link>
            </div>
            <div className="flex flex-wrap sm:gap-8 gap-4">
              {listingsForRent.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
