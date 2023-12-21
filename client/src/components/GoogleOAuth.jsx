import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <button type="button" onClick={handleGoogleClick}>
      <FcGoogle
        size={48}
        className="p-2 rounded-lg bg-[#3c2a21] cursor-pointer transition-all ease-in-out hover:opacity-80"
      />
    </button>
  );
};

export default GoogleOAuth;
