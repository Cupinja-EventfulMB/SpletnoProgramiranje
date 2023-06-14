import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "state";
const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  return (
    <div className="fixed w-full z-10 bg-transparent">
      <div className="flex flex-row justify-between px-6 py-4 w-full text-white">
        <div className="flex justify-between gap-4">
        <Link to="/">
          <div>Home</div>
        </Link>
        
        {user && user.admin && (
          <Link to="/admin-dashboard"> <div>Admin Home</div></Link>
        )}

        </div>

        <div className="flex justify-between gap-4">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={() => dispatch(logoutSuccess())}><Link to="/">Logout</Link></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;