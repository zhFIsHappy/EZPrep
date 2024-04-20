import React, { useState } from "react";
import RecentSubmissions from "../components/UserInfo/RecentSubmission";
import UserDetails from "../components/UserInfo/UserDetails";
import UserProgress from "../components/UserInfo/ProblemSolved";
export default function UserProfile() {
  return (
    <div>
      <UserDetails />
      <UserProgress />
      <RecentSubmissions />
    </div>
  );
}
