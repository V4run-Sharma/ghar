import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        dispatch(updateUserFailure(null));
        dispatch(deleteUserFailure(null));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  // Firebase Storage Rules
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center text-[#1f2249] font-bold my-4">
        Profile
      </h1>
      <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
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
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="password"
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            disabled={loading}
            className="bg-[#1f2249] text-white rounded-lg p-3 transition-all w-full ease-in-out hover:opacity-80 disabled:opacity-50">
            {loading ? "UPDATING..." : "UPDATE"}
          </button>
        </div>
      </form>
      <div className="flex text-white justify-between pt-4">
        <p
          onClick={handleDeleteUser}
          className="bg-red-600 px-4 py-2 rounded-lg hover:opacity-80 cursor-pointer">
          Delete Account
        </p>
        <p
          onClick={handleSignOut}
          className="bg-red-600 px-4 py-2 rounded-lg hover:opacity-80 cursor-pointer">
          Sign Out
        </p>
      </div>
      <p className="text-red-600 text-center text-lg">{error ? error : null}</p>
      <p className="text-green-600 text-center text-lg">
        {updateSuccess ? "Updated" : null}
      </p>
    </div>
  );
};

export default Profile;
