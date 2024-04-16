import ProblemTable from "../components/ProblemTable";
import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ProblemInfo } from "../types";
import { getAllProblem, getProblemByPage } from "../apis/modules/ProblemTableAPI";
import { useNavigate, useLocation } from 'react-router-dom';
import TabHeader from "./TabsHeader";
import * as React from "react";

export function ProblemSetPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get('page') || '1')
  );
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [problemsPerPage, setProblemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        const allProblemResponse = await getAllProblem();
        if (Array.isArray(allProblemResponse)) {
          setTotalPages(Math.ceil(allProblemResponse.length / problemsPerPage));
        }
      } catch (error) {
        console.log("cannot get all problem");
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
      const problems = await getProblemByPage(page, problemsPerPage);
      if (Array.isArray(problems)) {
        setProblems(problems);
      }
    } catch (e) {
      console.log('Error fetching problems:', e);
    }
  }

  const handlePageChange = (event: ChangeEvent<any>, page: number) => {
    setCurrentPage(page);
    navigate(`/problemset${page === 1? "" : `?page=${page}`}`)
  };

  return (
    <>
      <TabHeader/>
      <div className="problem-set-container">
        <ProblemTable problems={isLoading? Array.from(new Array(problemsPerPage)):problems} isLoading={isLoading} />
        <Pagination
          style={{ padding: "10px", marginTop: "15px" }}
          page={currentPage}
          count={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}

