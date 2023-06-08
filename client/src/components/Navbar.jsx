//REACT
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "state/authSlice";

//HOOKS
import useLoginModal from "hooks/useLoginModal";
import useRegisterModal from "hooks/useRegisterModal";

//COMPONENTS
import Button from "components/form/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="fixed w-full z-50 bg-transparent overflow-y-hidden">
      <div className="flex flex-row justify-between px-6 py-4 w-full text-white">
        <div className="flex justify-between gap-4">
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/institutions">
            <div>Institutions</div>
          </Link>

          {user && user.admin && (
            <Link to="/admin-dashboard">
              {" "}
              <div>Admin Home</div>
            </Link>
          )}
        </div>

        <div className="flex justify-between gap-4">
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
              <button onClick={() => dispatch(logoutSuccess())}> Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;