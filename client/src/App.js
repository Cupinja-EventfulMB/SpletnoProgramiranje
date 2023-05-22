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
              <Route path="/" element={<LandingPage socket={socket} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/test-db-data" element={<TestingDB />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
  );
}

export default App;