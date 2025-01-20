import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { getAadharData, getAllAdharDataForExcel } from "../../features/authDetailsSlice";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { downloadAdharExcel } from "../../utils/utils";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

export default function AadharData() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")

  const callApi = async () => {
    const response = await dispatch(getAadharData({ page, pageSize, search }));
    setData(response.payload.data);
    setCount(response.payload.totalCount);
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, dispatch, search]);

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 315,
      headerClassName: 'red-header',
    },
    {
      field: "adhar",
      headerName: "Aadhar No.",
      width: 315,
      headerClassName: 'red-header',
    },
    {
      field: "birth",
      headerName: "Birth Year",
      width: 315,
      headerClassName: 'red-header',
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,
      headerClassName: 'red-header',
    },
    {
      field: "custCode",
      headerName: "Cust Code",
      width: 335,
      headerClassName: 'red-header',
    },
  ];

  const handleDownload = async () => {
    let response = await dispatch(
      getAllAdharDataForExcel({ search: search || "" })
    );

    let aadhar = response && response.payload && response.payload.data;

    if (aadhar.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(downloadAdharExcel(aadhar));

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbBinary = XLSX.write(wb, { type: "binary" });

    const arrayBuffer = new Uint8Array(wbBinary.length);
    for (let i = 0; i < wbBinary.length; i++) {
      arrayBuffer[i] = wbBinary.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Aadhar Data.xlsx";
    link.click();
    toast("Download Successfully!");
    // swal("Download Successfully!", "Log Data Downloaded", "success");
  };

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

        <Button variant="outlined"
          sx={{ color: "#58aff6", fontWeight: "bold", border: "2px solid" }}
          onClick={handleDownload}
        >
          <DownloadOutlinedIcon /> Download Excel
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
