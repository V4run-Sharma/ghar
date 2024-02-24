import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaBath, FaCar } from "react-icons/fa";
import { MdOutlineChair } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

const Listing = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listings/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const discount = listing?.regularPrice - listing?.discountedPrice;

  return (
    <main>
      {loading && (
        <p className="text-center text-3xl font-bold mt-64 text-[#1f2249]">
          Loading...
        </p>
      )}
      {error && (
        <>
          <h3 className="text-center sm:text-3xl text-xl mt-64 font-bold text-red-600">
            Something went wrong 😔...
          </h3>
          <Link to="/">
            <p className="text-center text-lg mt-2 hover:underline">
              🏚️ Go Back Home
            </p>
          </Link>
        </>
      )}
      {listing && !error && !loading && (
        <>
          <Swiper modules={[Navigation]} navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url} className="flex justify-center">
                <div
                  style={{ backgroundImage: `url(${url})`, width: `100%` }}
                  className="sm:h-[calc(28vw)] h-[calc(55vw)] bg-cover bg-center bg-no-repeat"></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col p-3 max-w-6xl mx-auto gap-1">
            <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
              <div className="flex gap-x-4 items-center gap-y-2">
                <h1 className="text-2xl font-bold">
                  {listing.name} - ₹
                  {listing.regularPrice.toLocaleString("en-IN")}
                  {listing.type == "rent" ? " / month" : ""}
                </h1>
                {currentUser &&
                  listing.userRef !== currentUser._id &&
                  !contactForm && (
                    <p
                      onClick={() => setContactForm(true)}
                      className="px-4 py-2 bg-[#1f2249] w-fit h-fit rounded-md text-white cursor-pointer hover:opacity-80 transition-all ease-in-out">
                      Contact
                    </p>
                  )}
              </div>
              {contactForm && <Contact listing={listing} />}
            </div>
            <h3>
              <FaLocationDot className="inline -mt-1 mr-1" color="green" />
              {listing.address}
            </h3>
            <div className="flex gap-4">
              <h6 className="px-4 py-1 bg-[#1f2249] cursor-default w-fit rounded-md text-white">
                {listing.type == "rent" ? "For Rent" : "For Sale"}
              </h6>
              {discount > 0 && (
                <h6 className="px-4 py-1 bg-green-600 cursor-default w-fit rounded-md text-white">
                  ₹ {discount.toLocaleString("en-IN")} off
                </h6>
              )}
            </div>
            <p>
              <strong>Description:&nbsp;</strong>
              {listing.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p>
                <FaBed className="inline -mt-1 mr-2" color="brown" />
                {listing.bedrooms} Beds
              </p>
              <p>
                <FaBath className="inline -mt-1 mr-2" color="brown" />
                {listing.bathrooms} Baths
              </p>
              <p>
                <FaCar className="inline -mt-1 mr-2" color="brown" />
                {listing.parking ? "Parking Available" : "No Parking Available"}
              </p>
              <p>
                <MdOutlineChair className="inline -mt-1 mr-2" color="brown" />
                {listing.furnished ? "Furnished" : "Not furnished"}
              </p>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
