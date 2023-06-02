import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "views/LandingView";
import LoginPage from "views/LoginView";
import RegisterPage from "views/RegisterView";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import TestComponent from "components/Test";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import  useSocket from "hooks/useSocket";
import Button from "components/form/Button";
import TestingDB from "views/TestingDB";
import AdminView from "admin/views/AdminView";
import AdminEventView from "admin/views/AdminEventView";
import AdminInstitutionView from "admin/views/AdminInstitutionView";
import AdminUserView from "admin/views/AdminUserView";

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
              <Route path="/" element={<LandingPage socket={socket} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/test-db-data" element={<TestingDB />} />
              {user && user.admin ? (
                <>
                  <Route path="/admin-dashboard" element={<AdminView />} />
                  <Route path="/admin-events" element={<AdminEventView />} />
                  <Route path="/admin-institutions" element={<AdminInstitutionView />} />
                  <Route path="/admin-users" element={<AdminUserView />} />
                </>
              ) : (
                <>
                // Non-admin users will be navigated to the home route
                  <Route path="/admin-dashboard" element={<Navigate to="/" />} />
                  <Route path="/admin-events" element={<Navigate to="/" />} />
                  <Route path="/admin-institutions" element={<Navigate to="/" />} />
                  <Route path="/admin-users" element={<Navigate to="/" />} />
                </>
              )}

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
  );
}

export default App;