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
  TextField,
  TablePagination,
  TableSortLabel,
  Typography,
  Button,
} from "@mui/material";
import { deleteAProduct, getAllProducts } from "../api";
import { MdSearch, RxCross2 } from "../assets/icons";
import { useDispatch } from "react-redux";
import {alertMsg} from  "../redux/alertSlice"

function RemoteData() {
  const [data, setData] = useState([]);
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("product_price");
  const [showCross,setShowCross] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productsData = await getAllProducts();
      if (productsData) {
        setData(productsData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    const isDeleted = await deleteAProduct(productId);
    if (isDeleted) {
      setData(data.filter((product) => product.productId !== productId));
      dispath(alertMsg({type:"success" , message : "item deleted successfully"}))
      setTimeout(()=>{
        dispath(alertMsg({type:"" , message : ""}))

      },3000)
    }
  };

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
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
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
         <Typography variant="h6">List of Items</Typography>
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
              <TableCell>Image</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "product_name"}
                  direction={orderBy === "product_name" ? order : "asc"}
                  onClick={() => handleSort("product_name")}
                >
                  Product Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "product_category"}
                  direction={orderBy === "product_category" ? order : "asc"}
                  onClick={() => handleSort("product_category")}
                >
                  Product Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "product_price"}
                  direction={orderBy === "product_price" ? order : "asc"}
                  onClick={() => handleSort("product_price")}
                >
                  Product Price
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.productId}>
                    <TableCell>
                      <img
                        src={row.imageURL}
                        alt="Product"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>{row.product_category}</TableCell>
                    <TableCell>{row.product_price}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(row.productId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
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
