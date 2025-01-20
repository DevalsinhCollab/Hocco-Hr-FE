import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { downloadAgreementExcel } from "../../utils/utils";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import {
  getAllAgreementsViaPagination,
  getAllSignAgreementForExcel,
  openDocument,
} from "../../features/AssetTrackerSlice";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { Button, InputAdornment, TextField } from "@mui/material";
import ViewIcon from "../../../public/Images/ViewIcon.png"
import SearchIcon from '@mui/icons-material/Search';

export default function Agreements() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [unSignedCount, setUnSignedCount] = useState(0);
  const [signedCount, setSignedCount] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")

  const callApi = async () => {
    const response = await dispatch(
      getAllAgreementsViaPagination({ page, pageSize, search })
    );
    setData(response.payload.data);
    setCount(response.payload.totalCount);
    setUnSignedCount(response.payload.totalUnSignedCount);
    setSignedCount(response.payload.totalSignedCount);
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, dispatch, search]);

  const columns = [
    {
      field: "documentBase64",
      headerName: "Actions",
      headerClassName: 'red-header',
      width: 120,
      renderCell: ({ value }) => {
        return (
          <div className="d-flex gap-2">
            <img src={ViewIcon} style={{ marginLeft: "1rem", cursor: "pointer" }} onClick={() => window.open(value?.Location, "_blank")} />
          </div>
        );
      },
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      headerClassName: 'red-header',
      flex: 1,
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      headerClassName: 'red-header',
      flex: 1,
    },
    {
      field: "assetSerialNumber",
      headerName: "Asset",
      headerClassName: 'red-header',
      flex: 1,
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      headerClassName: 'red-header',
      flex: 1,
      valueFormatter: ({ value }) => (value === "US" ? "Unsigned" : "Signed"),
      renderCell: ({ value }) => (
        <span
          style={{
            color: value === "US" ? "#a30000" : "#28903e",
          }}
        >
          {value === "US" ? "Unsigned" : "Signed"}
        </span>
      ),
    },
    {
      field: "templateName",
      headerName: "Templates",
      headerClassName: 'red-header',
      flex: 1,
    },
  ];

  const handleDownload = async () => {
    const allAgreements = await dispatch(getAllSignAgreementForExcel({ search: search || "" }));

    if (
      allAgreements &&
      allAgreements.payload &&
      allAgreements.payload.data &&
      allAgreements.payload.data?.length === 0
    ) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(
      await downloadAgreementExcel(allAgreements.payload.data)
    );

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
    link.download = "Agreement Report.xlsx";
    link.click();
    alert("Download Successfully!");
  };

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <>
      <div className="home-content">
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", marginLeft: "1rem" }}>
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
            sx={{ marginRight: "1rem", color: "#58aff6", fontWeight: "bold", border: "2px solid" }}
            onClick={handleDownload}
          >
            <DownloadOutlinedIcon /> Download Excel
          </Button>
        </Box>

        <div className="m-3 p-3">
          <div className="d-flex">
            <h5 className="m-0 d-flex  align-items-center">
              {t("Unsigned")} <span className="card px-5 py-1 ms-2">{unSignedCount || 0}</span>
            </h5>
            <h5 className="m-0 mx-2 d-flex  align-items-center">
              {t("Signed")} <span className="card px-5 py-1 ms-2">{signedCount || 0}</span>
            </h5>
            <h5 className="m-0 mx-2 d-flex  align-items-center">
              {t("Agreements")} <span className="card px-5 py-1 ms-2">{count || 0}</span>
            </h5>
          </div>
        </div>

        <div className="card m-3">
          <Box sx={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pagination
              paginationMode="server"
              rowCount={count}
              initialState={{
                ...data && data.initialState,
                pagination: {
                  ...data && data.initialState && data.initialState?.pagination,
                  paginationModel: {
                    pageSize: pageSize,
                  },
                },
              }}
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onPaginationModelChange={handlePaginationModelChange}
              getRowId={(e) => e._id}
            />
          </Box>
        </div>
      </div>
    </>
  );
}
