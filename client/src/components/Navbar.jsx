//REACT
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "state/authSlice";

//HOOKS
import useLoginModal from "hooks/useLoginModal";

//COMPONENTS
import Button from "components/form/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const loginModal = useLoginModal();

  return (
    <div className="fixed w-full z-50 bg-transparent overflow-y-hidden">
      <div className="flex flex-row justify-between px-6 py-4 w-full text-white">
        <div className="flex justify-between gap-4">
          <Link to="/">
            <div>Home</div>
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
            </>
          ) : (
            <>
              <button onClick={() => dispatch(logoutSuccess())}> Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;