import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton, styled, TableHead } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import "../assets/css/problemset.css";
import { difficultyMap } from "../assets/static/problems";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ProblemTable = ({ problems, isLoading }) => {
  const problemTableRowsDOM = (isLoading: boolean) => {
    if (isLoading) {
      return problems.map((problem, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton />
          </TableCell>
          <TableCell style={{ width: 160 }} align="right">
            <Skeleton />
          </TableCell>
        </TableRow>
      ));
    } else {
      return problems.map((problem) => (
        <TableRow key={problem.problem_id}>
          <TableCell></TableCell>
          <TableCell>{problem.problem_id}</TableCell>
          <TableCell component="th" scope="row">
            <Link to={`/problem/${problem.problem_id}`}>
              {problem.problem_title}
            </Link>
          </TableCell>
          <TableCell style={{ width: 120 }}>
            <span
              className={`${difficultyMap.get(problem.problem_difficulty)}`}
            >
              {difficultyMap.get(problem.problem_difficulty)}
            </span>
          </TableCell>
        </TableRow>
      ));
    }
  };

  return (
    <>
      <TableContainer sx={{ minWidth: 960, maxWidth: 960 }} component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{ width: "5%", fontWeight: "bold", fontSize: "16px" }}
              >
                Status
              </StyledTableCell>
              <StyledTableCell
                style={{ width: "7%", fontWeight: "bold", fontSize: "16px" }}
              >
                #
              </StyledTableCell>
              <StyledTableCell
                style={{ width: "73%", fontWeight: "bold", fontSize: "16px" }}
              >
                Title
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                Difficulty
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{problemTableRowsDOM(isLoading)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProblemTable;
