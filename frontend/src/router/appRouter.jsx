import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/userRegister";
import UserLogin from "../pages/auth/userLogin";
import CreatorRegister from "../pages/auth/creatorRegister";
import CreatorLogin from "../pages/auth/creatorLogin";
import Home from "../pages/home";
import CreatorDashboard from "../pages/creatorDashboard";
import Feeds from "../pages/feeds";
import Profile from "../pages/profile";
// import ProtectedRoute from "../components/ProtectedRoute";

const appRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/creator/register" element={<CreatorRegister />} />
          <Route path="/creator/login" element={<CreatorLogin />} />
          <Route path="/CreatorDashboard/" element={<CreatorDashboard />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/creator/:id" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
};

export default appRouter;
