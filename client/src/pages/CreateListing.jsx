import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
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
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="sale"
              />
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="parking"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 hover:border-[#1f2249] rounded-md bg-white checked:bg-[#1f2249] transition-all ease-in-out cursor-pointer"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
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
              The first image will be the cover (size &lt; 2mb, max 6 images).
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              onChange={(e) => setImages(e.target.files)}
              className="p-3 border rounded-lg w-full file:bg-white file:border file:rounded-md hover:file:bg-[#1f2249] hover:file:text-white file:transition-all file:ease-in-out file:mr-2"
              id="images"
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
            {isCreating ? "CREATING LISTING..." : "CREATE LISTING"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
