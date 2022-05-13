import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./../../pages/profile/index";
import BusinessProfile from "./../../pages/businessProfile/index";

const PageRoute = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/:id" element={<Profile />} />
        <Route exact path="/b/:id" element={<BusinessProfile />} />
      </Routes>
    </Router>
  );
};

export default PageRoute;
