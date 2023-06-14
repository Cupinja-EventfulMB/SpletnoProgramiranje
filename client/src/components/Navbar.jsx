import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "state/authSlice";
import { FaBell } from "react-icons/fa";

// HOOKS
import useLoginModal from "hooks/useLoginModal";
import useRegisterModal from "hooks/useRegisterModal";

// COMPONENTS
import Button from "components/form/Button";
import Notification from "components/Notification";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="fixed w-full z-50 bg-transparent select-none">
      <div className="flex flex-row justify-between px-6 py-4 w-full text-white">
        <div className="flex justify-between gap-4">
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/events">
          <div>Events</div>
        </Link>
          <Link to="/institutions">
            <div>Institutions</div>
          </Link>
          <Link to="/nearby-events">
            <div>Nearby Events</div>
          </Link>

          {user && user.admin && (
            <Link to="/admin-dashboard">
              <div>Admin Home</div>
            </Link>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <div className="relative">
            <FaBell onClick={toggleNotifications} className="cursor-pointer" />
            {showNotifications && (
              <div className="absolute right-0 mt-6 mr-2 bg-white shadow-lg rounded-lg py-2 px-4 z-auto">
                <Notification
                  type="friend-request"
                  message="New friend request"
                />
                <Notification type="regular" message="New notification" />
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Button title={"Login"} action={loginModal.onOpen} />
              <Button title={"Register"} action={registerModal.onOpen} />
            </>
          ) : (
            <>
              <Link to={`/user/${user._id}`}>
                <div>Profile</div>
              </Link>
              <button onClick={() => dispatch(logoutSuccess())}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;