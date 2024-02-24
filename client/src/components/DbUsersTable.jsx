import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  Typography,
  TablePagination,
  TableSortLabel
} from "@mui/material";
import { MdSearch, RxCross2 } from "../assets/icons";

function RemoteData({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("displayName");
  const [showCross,setShowCross] = useState(false);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearchChange = (event) => {
    setShowCross(true)
    const value = event.target.value;
    setSearchTerm(value);
    const filteredResults = data.filter((item) =>
      item.displayName && item.displayName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleSort = (property) => {
    if (property === "displayName" || property === "email") {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      const sortedData = [...filteredData].sort((a, b) => {
        const valueA = a[property].toLowerCase();
        const valueB = b[property].toLowerCase();
        return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
      setFilteredData(sortedData);
    }
  };

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
          padding: "0 16px"
        }}
      >
        <Typography variant="h6">List of Users</Typography>
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
                Photo
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "displayName"}
                  direction={orderBy === "displayName" ? order : "asc"}
                  onClick={() => handleSort("displayName")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Email Verified
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
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.email}>
                    <TableCell>
                      <img
                        src={row.photoURL}
                        alt="User"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{row.displayName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.emailVerified ? <span className="text-green-600 border-2 border-blue-300 p-2 rounded-md">Verified</span> : <span className="text-red-600 border-2 border-orange-300 p-2 rounded-md">Not Verified</span>}</TableCell>
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
