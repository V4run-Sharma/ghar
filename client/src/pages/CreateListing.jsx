import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountedPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    imageUrls: [],
  });

  const handleImageUpload = (e) => {
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      setIsUploading(true);
      setImageUploadError(null);
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(null);
          isUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2mb per image max).");
          setIsUploading(false);
        });
      setImageUploadError("Success.");
    } else {
      setImageUploadError("You can only upload 6 images per listing.");
    }
  };

  const storeImage = async (image) => {
    setIsUploading(true);
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          setIsUploading(false);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setImageUploadError(null);
      setIsUploading(false);
      setIsCreating(false);
    }, 5000);
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      setError(false);
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setIsCreating(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`listings/${data._id}`);
    } catch (error) {
      setError(error.message);
      setIsCreating(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center text-[#1f2249] font-bold my-4">
        Create Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-8 sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            value={formData.name}
            className="border p-3 rounded-lg"
            id="name"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className="border p-3 rounded-lg"
            id="description"
            required></textarea>
          <input
            type="text"
            placeholder="Address"
            onChange={handleChange}
            value={formData.address}
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.type === "sale"}
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="sale"
              />
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.type === "rent"}
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.parking}
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="parking"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.furnished}
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.offer}
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-3 border rounded-lg"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="2000"
                max="100000000"
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-3 border rounded-lg"
                required
              />
              <div className="flex flex-col text-center items-center">
                <p>Regular Price</p>
                <span className="text-xs font-semibold">(₹ or ₹ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1000"
                max="100000000"
                onChange={handleChange}
                value={formData.discountedPrice}
                className="p-3 border rounded-lg"
                required
              />
              <div className="flex flex-col text-center items-center">
                <p>Discounted Price</p>
                <span className="text-xs font-semibold">(₹ or ₹ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal ml-2">
              The first image will be the cover (size &lt; 2mb, max 6 images).
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              onChange={(e) => setImages(e.target.files)}
              className="p-3 border rounded-lg w-full file:bg-white file:border file:rounded-md hover:file:bg-[#1f2249] hover:file:text-white file:transition-all file:ease-in-out file:mr-2"
              id="imageUrls"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={isUploading || isCreating}
              className="p-3 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all ease-in-out disabled:bg-green-600 disabled:text-white disabled:opacity-50">
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p
            className={
              imageUploadError == "Success." ? "text-green-600" : "text-red-600"
            }>
            {imageUploadError
              ? imageUploadError
              : imageUploadError == null || imageUploadError == "Success"
              ? ""
              : "Uploaded Successfully!"}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex w-full justify-between items-center">
                <img
                  src={url}
                  alt="listing image"
                  className="lg:w-80 md:w-60 w-40 rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="p-3 rounded-lg text-white bg-red-600 h-fit hover:opacity-80">
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={isCreating || isUploading}
            className="p-3 border border-[#1f2249] rounded-lg bg-[#1f2249] text-white hover:opacity-80 transition-all ease-in-out disabled:opacity-50">
            {isCreating ? "CREATING..." : "CREATE LISTING"}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
