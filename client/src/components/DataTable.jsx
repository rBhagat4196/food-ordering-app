import React, { useState, useEffect } from "react";
import { MdSearch, RxCross2 } from "../assets/icons";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  TextField,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import axios from "axios";

function RemoteData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [showCross, setShowCross] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setShowCross(true)
    setSearchTerm(event.target.value);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = data.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="w-full">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <Typography variant="h6">Items Preview</Typography>
        <div className="flex items-center justify-center gap-3 px-4 py-3 border-b-4 ">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search here..."
            className="border-none outline-none bg-lightOverlay
            "
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <RxCross2
            className={`${
              showCross ? "flex" : "hidden"
            } cursor-pointer text-gray-400 text-2xl`}
            onClick={() => {
              setShowCross(false);
              setSearchTerm("")
            }}
          />
        </div>
      </div>
      <TableContainer>
        <Table aria-label="remote data table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "avatar"}
                  direction={orderBy === "avatar" ? order : "asc"}
                  onClick={() => handleSort("avatar")}
                >
                  Avatar
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSort("id")}
                >
                  Id
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "first_name"}
                  direction={orderBy === "first_name" ? order : "asc"}
                  onClick={() => handleSort("first_name")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "last_name"}
                  direction={orderBy === "last_name" ? order : "asc"}
                  onClick={() => handleSort("last_name")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <img
                        style={{ height: 36, borderRadius: "50%" }}
                        src={row.avatar}
                        alt="avatar"
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default RemoteData;
