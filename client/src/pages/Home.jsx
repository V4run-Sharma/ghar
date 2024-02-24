import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

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
    <main className="max-w-screen">
      <div className="max-h-[32rem] flex flex-col gap-4 bg-white sm:bg-[url('/hero.png')] bg-no-repeat sm:bg-right bg-none sm:bg-contain justify-center sm:pt-[15vw] sm:pr-[15vw] sm:pb-[15vw] sm:pl-[12vw] p-8">
        <h3 className="sm:text-[3rem] text-3xl sm:leading-[3rem] font-bold text-[#1f2249]">
          Find your next <span className="opacity-60">perfect</span> place with
          ease
        </h3>
        <p>
          <span className="inline-block">Ghar Real Estate</span> will help you
          find your home fast, easy and comfortable. Our support options are
          always available
        </p>
        <Link to={"/search"} className="text-blue-600 text-sm font-semibold">
          Lets Start Here...
        </Link>
      </div>
      <div>
        <Swiper modules={[Navigation]} navigation>
          {listingsOnOffer &&
            listingsOnOffer.length > 0 &&
            listingsOnOffer.map((listing) => (
              <SwiperSlide key={listing._id} className="flex justify-center">
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                  className="sm:h-[600px] h-[200px] w-full object-cover object-center"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div>Special Listings</div>
    </main>
  );
};

export default Home;
