import React, { useEffect, useState } from "react";
import RecentSubmissions from "../components/UserInfo/RecentSubmission";
import UserDetails from "../components/UserInfo/UserDetails";
import UserProgress from "../components/UserInfo/ProblemSolved";
import "../assets/css/userprofile.css";
import Divider from "@mui/material/Divider";
import { getSubmissions } from "../apis/modules/SubmissionAPI";
import { appState } from "../appState";
import { SubmissionResponseInfo } from "../types";

export default function UserProfile() {
  const [submissions, setSubmissions] = useState<SubmissionResponseInfo[]>([]);

  const fetchProblems = async (page: number) => {
    try {
      const submissions = await getSubmissions(page, 6, appState.userId);

      if (Array.isArray(submissions)) {
        setSubmissions(submissions);
      }
    } catch (e) {
      console.log("Error fetching problems:", e);
    }
  };
  useEffect(() => {
    if (!appState.isLoggedIn) {
      return;
    }
    fetchProblems(1);
  }, []);

  return (
    <div className="full-height">
      <div className="show-userinfo-container">
        <div className="left-container">
          <UserDetails />
        </div>
        <div className="right-container">
          <div className="right-top-container">
            <h3>Solved Problems :</h3>
            <Divider sx={{ opacity: 0.6 }} />
            <UserProgress />
          </div>
          <div className="right-bottom-container">
            <h3>Recent Submissions:</h3>
            <Divider sx={{ opacity: 0.6 }} />
            <RecentSubmissions submissions={submissions} />
          </div>
        </div>
      </div>
    </div>
  );
}
