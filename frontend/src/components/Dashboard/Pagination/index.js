import React, { useState } from "react";
import "./styles.css";

import Pagination from "@mui/material/Pagination";

export default function PaginationControlled({ page, handlePageChange }) {
  return (
    <div className="pagination-div">
      <Pagination
        sx={{
          "& .MuiPaginationItem-text": {
            color: "black",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "orange !important",
            color: "white"
          },
          "& .Mui-selected  ": {
            backgroundColor: "orange",
            borderColor: "none",
            color: "white",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
        count={10}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
