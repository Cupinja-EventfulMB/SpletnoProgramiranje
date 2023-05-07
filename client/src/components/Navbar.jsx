import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "state";
const Navbar = () => {

  const isLoggedIn = localStorage.getItem("token");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  
  return (
    <div className="fixed w-full border-b-[1px] z-10 bg-white shadow-sm">
      <div className="flex flex-row justify-between px-6 py-4 w-full">
        <Link to="/">
          <div>Home</div>
        </Link>
        
        <div className="flex justify-between gap-4">
        {!token ? (<><Link to="/login">Login</Link>
        <Link to="/register">Register</Link></>) : (<button onClick={() => dispatch(logoutSuccess())} > Logout</button>)}
          
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
