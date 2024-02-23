import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
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
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url} className="flex justify-center">
                <div
                  style={{ backgroundImage: `url(${url})`, width: `100%` }}
                  className="h-[500px] bg-cover bg-center bg-no-repeat"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
