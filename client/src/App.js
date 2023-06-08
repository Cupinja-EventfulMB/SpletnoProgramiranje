//REACT
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import useSocket from "hooks/useSocket";

//PAGES
import LandingView from "views/LandingView";
import ProfileView from "views/ProfileView";
import InstitutionView from "views/InstitutionView";

//COMPONENTS
import Navbar from "components/Navbar";
import TestComponent from "components/Test";
import Modal from "components/modals/Modal";
import AdminView from "./admin/views/AdminView";
import AdminEventView from "./admin/views/AdminEventView";
import AdminInstitutionView from "./admin/views/AdminInstitutionView";
import AdminUserView from "./admin/views/AdminUserView";
import TestingDB from "views/TestingDB";

function App() {
  const user = useSelector((state) => state.auth.user);

  const socket = useSocket("http://localhost:3002");

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div>
          <Routes>
            <Route path="/" element={<LandingView socket={socket} />} />
            {user && user.admin ? (
              <>
                <Route path="/admin-dashboard" element={<AdminView />} />
                <Route path="/admin-events" element={<AdminEventView />} />
                <Route
                  path="/admin-institutions"
                  element={<AdminInstitutionView />}
                />
                <Route path="/admin-users" element={<AdminUserView />} />
              </>
            ) : (
              <>
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
                <Route path="/admin-events" element={<Navigate to="/" />} />
                <Route
                  path="/admin-institutions"
                  element={<Navigate to="/" />}
                />
                <Route path="/admin-users" element={<Navigate to="/" />} />
              </>
            )}
            
            {user && (
              <Route path="/user/:userId" element={<ProfileView />} />
            )}
            <Route path="/test-landing" element={<TestingDB />} />
            <Route path="/institutions" element={<InstitutionView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;