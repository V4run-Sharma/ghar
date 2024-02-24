import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import GoogleOAuth from "../components/GoogleOAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <main className="p-3 max-w-lg mx-auto mt-40">
      <h1 className="text-3xl text-center text-[#1f2249] font-bold my-7">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          required
          onChange={handleChange}
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={loading}
            className="bg-[#1f2249] text-white rounded-lg p-3 transition-all w-full ease-in-out hover:opacity-80 disabled:opacity-50">
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
          <GoogleOAuth />
        </div>
      </form>
      <div className="flex gap-2 pt-2">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-[#1f2249] opacity-80 font-semibold hover:underline">
            Sign Up
          </span>
        </Link>
      </div>
      {error && <p className="text-red-600 text-lg font-semibold">{error}</p>}
    </main>
  );
};

export default SignIn;
