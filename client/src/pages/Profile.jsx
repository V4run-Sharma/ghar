import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { app } from "../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // Firebase Storage Rules
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center text-[#1a120b] font-bold my-4">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto cursor-pointer"
        />
        <p className="text-center text-xs">
          {uploadError ? (
            <span className="text-red-600">Upload Error</span>
          ) : uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-zinc-800">{`Uploading ${uploadProgress}%`}</span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-600 ">Uploaded</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <button className="bg-[#3c2a21] text-white rounded-lg p-3 transition-all w-full ease-in-out hover:opacity-80 disabled:opacity-50">
            UPDATE
          </button>
        </div>
      </form>
      <div className="flex text-red-600 font-semibold text-lg justify-between pt-2">
        <p>Delete Account</p>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default Profile;
