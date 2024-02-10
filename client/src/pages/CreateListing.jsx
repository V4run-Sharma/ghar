import React, { useState } from "react";

const CreateListing = () => {
  const [uploading, isUploading] = useState(false);
  const [creating, isCreating] = useState(false);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center text-[#1f2249] font-bold my-4">
        Create Listing
      </h1>
      <form className="flex flex-col mt-8 sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            className="border p-3 rounded-lg"
            id="name"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            cols="10"
            className="border p-3 w-full"
            id="description"></textarea>
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-blue-500 rounded-md bg-white checked:bg-blue-500 cursor-pointer"
                id="sale"
              />
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-blue-500 rounded-md bg-white checked:bg-blue-500 cursor-pointer"
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-blue-500 rounded-md bg-white checked:bg-blue-500 cursor-pointer"
                id="parking"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-blue-500 rounded-md bg-white checked:bg-blue-500 cursor-pointer"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-blue-500 rounded-md bg-white checked:bg-blue-500 cursor-pointer"
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="5"
                className="p-3 border rounded-lg"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="5"
                className="p-3 border rounded-lg"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min=""
                max=""
                className="p-3 border rounded-lg"
                required
              />
              <div className="flex flex-col text-center items-center">
                <p>Regular Price</p>
                <span className="text-xs font-semibold">(₹ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min=""
                max=""
                className="p-3 border rounded-lg"
                required
              />
              <div className="flex flex-col text-center items-center">
                <p>Discounted Price</p>
                <span className="text-xs font-semibold">(₹ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal ml-2">
              The first image will be the cover (max 6).
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              className="p-3 border rounded-lg w-full file:bg-white file:border file:rounded-md hover:file:bg-[#1f2249] hover:file:text-white file:transition-all file:ease-in-out file:mr-2"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading || creating}
              className="p-3 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white disabled:bg-green-600 disabled:text-white disabled:opacity-50">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <button
            disabled={creating}
            className="p-3 border border-[#1f2249] rounded-lg bg-[#1f2249] text-white hover:opacity-80 transition-all ease-in-out disabled:opacity-50">
            {creating ? "CREATING LISTING..." : "CREATE LISTING"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
