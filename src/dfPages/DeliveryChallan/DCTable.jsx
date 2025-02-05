import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";

import moment from "moment";
import { getChallan } from "../../features/DelieverychallanSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";

export default function DCTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")

  const callApi = async () => {
    const response = await dispatch(getChallan({ page, pageSize, search: search || "" }));
    setData(response.payload.data);
    setCount(response.payload.totalCount);
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, search]);

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const columns = [
    {
      field: "action",
      headerName: "Actions",
      headerClassName: 'red-header',
      renderCell: (cell) => {
        return (
          <>
            <a
              className="btn btn-outline-success d-flex align-items-center p-2"
              href={`${import.meta.env.VITE_BACKEND_API
                }/deliveryChallan/generateChallanPdf/${cell.row._id}`}
              target="_blank"
            >
              <i className="fa-solid fa-eye fs-5"></i>
            </a>

            <button
              className="btn btn-outline-primary d-flex align-items-center p-2 ms-1"
              onClick={async () => {
                window.open(
                  `${import.meta.env.VITE_BACKEND_API
                  }/deliveryChallan/generateEwayPdf/${cell.row._id}`,
                  "_blank"
                );
              }}
            >
              <i className="fa-solid fa-paper-plane fs-5"></i>
            </button>
          </>
        );
      },
    },
    {
      field: "eWayBillNo",
      headerName: "Eway Bill",
      width: 180,
      headerClassName: 'red-header',
      valueFormatter: ({ value }) => {
        let status;
        if (value) {
          status = "Yes";
        } else {
          status = "No";
        }
        return status;
      },
    },
    {
      field: "gstin", headerName: "GSTIN", width: 180,
      headerClassName: 'red-header',
    },
    {
      field: "customername", headerName: "Customer Name", width: 250,
      headerClassName: 'red-header',
    },
    {
      field: "challannumber", headerName: "Challan Number", width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "challandate",
      headerName: "Challan Date",
      width: 200,
      headerClassName: 'red-header',
      valueFormatter: ({ value }) => {
        const dateTime = moment(value).format("DD/MM/YYYY");

        return dateTime !== "Invalid date" ? dateTime : value;
      },
    },
    {
      field: "transportmode",
      headerName: "Transport Mode",
      width: 180,
      headerClassName: 'red-header',
      valueFormatter: ({ value }) => {
        let name;
        if (value === "road") {
          name = "Road";
        } else if (value === "water") {
          name = "Water";
        } else if (value === "air") {
          name = "Air";
        }
        return name;
      },
    },
    {
      field: "vehiclenumber", headerName: "Vehicle Number", width: 180,
      headerClassName: 'red-header',
    },
    {
      field: "transportdate",
      headerName: "Transport Date",
      width: 217,
      headerClassName: 'red-header',
      valueFormatter: ({ value }) => {
        const dateTime = moment(value).format("DD/MM/YYYY");

        return dateTime !== "Invalid date" ? dateTime : value;
      },
    },
  ];

  return (
    <div className="home-content px-5">
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "0.5rem", marginBottom: "1rem" }}>
        <TextField
          size="small"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "80%",
            "& .MuiOutlinedInput-root": {
              border: "2px solid #ffe7eb",
              borderRadius: "5px",
              boxShadow: "0 0 10px 5px #f7f3f4",
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={() => navigate("/deliverychallan/add")}
          sx={{ color: "#f89a74", fontWeight: "bold", border: "2px solid", marginBottom: "1rem" }}
        >
          {t("Add Delivery Challan")}
        </Button>
      </Box>

      <div className="card">
        <div style={{ height: "auto" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={count}
            initialState={{
              ...data.initialState,
              pagination: {
                ...data.initialState?.pagination,
                paginationModel: {
                  pageSize: pageSize,
                  /* page: 0 // default value will be used if not passed */
                },
              },
            }}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onPaginationModelChange={handlePaginationModelChange}
            rowsPerPageOptions={[10]}
            getRowId={(e) => e._id}
          />
        </div>
      </div>
    </div>
  );
}
