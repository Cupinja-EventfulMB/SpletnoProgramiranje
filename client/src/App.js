import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "views/LandingView";
import LoginPage from "views/LoginView";
import RegisterPage from "views/RegisterView";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import useSocket from "hooks/useSocket";

//PAGES
import LandingView from "views/LandingView";
import ProfileView from "views/ProfileView";
import InstitutionView from "views/InstitutionView";
import SingleInstitutionView from "views/SingleInstitutionView";
import NearbyEvents from "views/NearbyEvents";

//COMPONENTS
import Navbar from "components/Navbar";
import TestComponent from "components/Test";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import  useSocket from "hooks/useSocket";
import Button from "components/Button";
import TestingDB from "views/TestingDB";

function App() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

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
            <Route path="/events" element={<TestingDB />} />
            <Route path="/institutions" element={<InstitutionView />} />
            <Route path="/institutions/:id" element={<SingleInstitutionView />} />
            <Route path="/nearby-events" element={<NearbyEvents /> } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;