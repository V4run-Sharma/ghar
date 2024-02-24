import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="hover:shadow-md transition-shadow overflow-hidden rounded-lg w-full md:w-[280px] border-2 animate-fade-in">
      <img
        src={listing.imageUrls[0] || "/ghar.png"}
        alt={listing.name}
        className="h-[200px] w-full object-cover hover:scale-105 transition-all ease-in-out"
      />
      <div className="p-3">
        <h1 className="truncate text-lg font-semibold">{listing.name}</h1>
        <p className="truncate text-sm text-gray-500 mt-1 font-semibold">
          <FaLocationDot className="inline -mt-1 mr-1" color="green" />
          {listing.address}
        </p>
        <p className="text-sm font-semibold line-clamp-3">
          {listing.description}
        </p>
        <p className="font-semibold text-xl mt-2">
          ₹{" "}
          {listing.offer
            ? listing.discountedPrice.toLocaleString("en-IN")
            : listing.regularPrice.toLocaleString("en-IN")}{" "}
          {listing.type === "rent" ? "/ month" : ""}
        </p>
        <div className="flex gap-4 text-sm font-bold mt-2">
          <p>
            <FaBed className="inline -mt-1 mr-2" color="brown" />
            {listing.bedrooms} Beds
          </p>
          <p>
            <FaBath className="inline -mt-1 mr-2" color="brown" />
            {listing.bathrooms} Baths
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
