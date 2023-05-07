import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "views/LandingView";
import LoginPage from "views/LoginView";
import RegisterPage from "views/RegisterView";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";


function App() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pt-20">
         {/* User ID: {user._id} */}
        {token}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
