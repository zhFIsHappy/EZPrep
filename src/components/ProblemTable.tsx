import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import getAllProblem from "../apis/ProblemTableAPI";
import { useEffect } from "react";
import { ProblemInfo } from "../reducers/ProblemInfo";
import { useState } from "react";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createProblemData(
  problemId: string,
  problemName: number,
  difficulty: number
) {
  return { problemId, problemName, difficulty };
}

const rows = [
  //   createProblemData("Cupcake", 305, 3.7),
  //   createProblemData("Donut", 452, 25.0),
  //   createProblemData("Eclair", 262, 16.0),
  //   createProblemData("Frozen yoghurt", 159, 6.0),
  //   createProblemData("Gingerbread", 356, 16.0),
  //   createProblemData("Honeycomb", 408, 3.2),
  //   createProblemData("Ice cream sandwich", 237, 9.0),
  //   createProblemData("Jelly Bean", 375, 0.0),
  //   createProblemData("KitKat", 518, 26.0),
  //   createProblemData("Lollipop", 392, 0.2),
  //   createProblemData("Marshmallow", 318, 0),
  //   createProblemData("Nougat", 360, 19.0),
  //   createProblemData("Oreo", 437, 18.0),
];
//.sort((a, b) => (a.calories < b.calories ? -1 : 1));
export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allProblemObject, setAllProblemObject] = useState<ProblemInfo[]>([]);
  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allProblemObject.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    (async function () {
      try {
        const allProblemResponse = await getAllProblem();
        if (Array.isArray(allProblemResponse)) {
          return setAllProblemObject(allProblemResponse);
        }
        console.log(allProblemObject);
      } catch (error) {
        console.log("cannot get all problem");
      }
    })();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? allProblemObject.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : allProblemObject
          ).map((row) => (
            <TableRow key={row.problem_id}>
              <TableCell component="th" scope="row">
                {row.problem_title}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.problem_difficulty}
              </TableCell>
              {/* <TableCell style={{ width: 160 }} align="right">
                {row.fat}
              </TableCell> */}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={allProblemObject.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
