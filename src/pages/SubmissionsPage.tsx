import * as React from 'react';
import TabHeader from "./TabsHeader";
import ProblemTable from "../components/ProblemTable";
import { Pagination } from "@mui/material";
import "../assets/css/SubmissionPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmissionResponseInfo } from "../types";
import { getAllSubmissions, getSubmissions } from "../apis/modules/SubmissionAPI";
import SubmissionTable from "../components/SubmissionTable";

export default function SubmissionsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get('page') || '1')
  );
  const [submissions, setSubmissions] = useState<SubmissionResponseInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [submissionsPerPage, setSubmissionsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        const allSubmissionsResponse = await getAllSubmissions(1);
        if (Array.isArray(allSubmissionsResponse)) {
          setTotalPages(Math.ceil(allSubmissionsResponse.length / submissionsPerPage));
        }
      } catch (error) {
        console.log("cannot get all submissions");
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchProblems(currentPage);
    setIsLoading(false);
  }, [currentPage]);

  const fetchProblems = async (page: number)=> {
    try {
      // TODO: change the hard-coded user ID
      const submissions = await getSubmissions(page, submissionsPerPage, 1);
      if (Array.isArray(submissions)) {
        setSubmissions(submissions);
      }
    } catch (e) {
      console.log('Error fetching problems:', e);
    }
  }

  const handlePageChange = (event: ChangeEvent<any>, page: number) => {
    setCurrentPage(page);
    navigate(`/submissions${page === 1? "" : `?page=${page}`}`)
  };

  return (
    <>
      <TabHeader/>
      <div className="submission-container">
        <div className="submission-title-container">
          <span className="submission-title">My Submissions</span>
        </div>
        <SubmissionTable submissions={isLoading? Array.from(new Array(submissionsPerPage)):submissions} isLoading={isLoading} />
        <Pagination
          style={{ padding: "10px", marginTop: "15px" }}
          page={currentPage}
          count={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
