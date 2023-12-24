import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleOAuth from "../components/GoogleOAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
    <div className="p-3 max-w-lg mx-auto mt-24">
      <h1 className="text-3xl text-center text-[#1a120b] font-bold my-7">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          required
          onChange={handleChange}
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
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
            className="bg-[#3c2a21] text-white rounded-lg p-3 transition-all w-full ease-in-out hover:opacity-80 disabled:opacity-50">
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>
          <GoogleOAuth />
        </div>
      </form>
      <div className="flex gap-2 pt-2">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-[#3c2a21] opacity-80 font-semibold">
            Sign In
          </span>
        </Link>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default SignUp;
