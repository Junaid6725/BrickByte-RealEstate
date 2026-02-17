import React, { useState } from "react";
import { MdHomeWork } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-white shadow-lg w-full h-16">
        <nav className="flex justify-between items-center px-6 h-full py-5">
          <Link to="/">
            <span className="flex  items-center sm:gap-1 text-purple-700">
              <MdHomeWork className="text-2xl sm:text-4xl" />
              <h1 className="text-md sm:text-xl font-bold">BrickByte</h1>
            </span>
          </Link>

          <form className="bg-slate-200 p-3 rounded flex items-center ">
            <input
              type="text"
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              placeholder="Search..."
            />
            <FaSearch className="text-slate-500" />
          </form>

          <ul className="flex justify-center items-center gap-6 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "hidden sm:inline text-slate-700  font-bold text-md sm:text-lg"
                  : "hidden sm:inline text-slate-500 hover:underline hover:cursor-pointer text-md sm:text-lg"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "hidden sm:inline text-slate-700  font-bold text-md sm:text-lg"
                  : "hidden sm:inline text-slate-500 hover:underline hover:cursor-pointer text-md sm:text-lg"
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive
                  ? " text-slate-700  font-bold text-md sm:text-lg"
                  : "text-slate-500 hover:underline hover:cursor-pointer text-md sm:text-lg"
              }
            >
              <li>SignIn</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
