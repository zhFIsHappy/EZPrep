import React, { useState } from "react";
import RecentSubmissions from "../components/UserInfo/RecentSubmission";
import UserDetails from "../components/UserInfo/UserDetails";
import UserProgress from "../components/UserInfo/ProblemSolved";
import "../assets/css/userprofile.css";
import Divider from "@mui/material/Divider";

export default function UserProfile() {
  return (
    <div className="full-height">
      <div className="user-container">
        <div className="left-container">
          <UserDetails />
        </div>
        <div className="right-container">
          <h3>Solved Problems :</h3>
          <Divider sx={{ opacity: 0.6 }} />
          <UserProgress />
          <h3>Recent Submissions:</h3>
          <Divider sx={{ opacity: 0.6 }} />
          <RecentSubmissions />
        </div>
      </div>
    </div>
  );
}
