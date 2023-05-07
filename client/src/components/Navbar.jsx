import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="fixed w-full border-b-[1px] z-10 bg-white shadow-sm">
      <div className="flex flex-row justify-between px-6 py-4 w-full">
        <Link to="/">
          <div>Logo</div>
        </Link>

        <div className="flex justify-between gap-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
