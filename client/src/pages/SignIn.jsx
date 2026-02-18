import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Form submitted");
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      setFormData({});
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className=" text-3xl text-center font-semibold my-7">SignIn</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:px-3"
        >
          <input
            type="text"
            placeholder="email"
            className="border p-3 rounded-lg border-gray-400 w-full outline-none"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg border-gray-400 outline-none w-full"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 w-full rounded-lg font-semibold hover:opacity-95 transition duration-300 hover:cursor-pointer text-md sm:text-xl uppercase disabled:opacity-50 disabled:cursor-not-allowed "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex justify-start items-center ps-1">
          <p className="text-center mt-3">
            Don't have an account?
            <Link to="/sign-up" className="text-blue-500 hover:underline ps-1">
              Sign Up
            </Link>
          </p>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-3">
            {error || "Something went wrong"}
          </p>
        )}
      </div>
    </>
  );
};

export default SignIn;
