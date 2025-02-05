import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";
import { downloadCfaExcel } from "../../utils/utils";
import { DownloadTwoTone } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, LoadingButton } from "@mui/lab";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import { InputAdornment, TextField } from "@mui/material";
import { signStatusOption, statusOption } from "../../constants/Employee-const";
import {
  addDoc,
  addMultiCfa,
  CfaExcelDownload,
  deleteCfa,
  getAllCfas,
  sendAgreementToCfa,
} from "../../features/CfaSlice";
import CfaEditModal from "../../components/Modal/CfaEditModal";
import ViewCfaDoc from "../../components/Modal/ViewCfaDoc";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';

export default function Cfa(props) {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.userData);
  const { cfas, loading, totalCount } = useSelector((state) => state.cfaData);
  const { t } = useTranslation();

  const [jsonData, setJsonData] = useState([]);
  const [editModal, setEditModal] = useState([false, null]);
  const [openDoc, setOpenDoc] = useState([false, null]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [signStatus, setSignStatus] = useState({});
  const [docAdded, setDocAdded] = useState(false);
  const [search, setSearch] = useState("")

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const callApi = () => {
    dispatch(
      getAllCfas({
        page,
        pageSize,
        status: (status && status.value) || "",
        signStatus: (signStatus && signStatus.value) || "",
        search: search || ""
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, dispatch, docAdded, status, signStatus, search]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = async (event, data) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    let document;
    reader.onload = async (e) => {
      const base64 = e.target.result;
      toast.success("Uploading Document");

      document = base64.split("base64,")[1];
      let response = await dispatch(
        addDoc({
          document,
          id: data._id,
          custCode: data.custCode,
          fileName: file.name,
        })
      );

      setDocAdded(!docAdded);
      if (
        response &&
        response.type &&
        response.type.includes("addDoc/fulfilled")
      ) {
        toast.success(response.payload.message);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAgreementSend = async (data) => {
    const response = await dispatch(
      sendAgreementToCfa({ custCode: data.custCode })
    );

    if (response && response.type === "sendAgreementToCfa/fulfilled") {
      toast.success(response.payload.message);
      dispatch(getAllCfas());
    } else {
      toast.error(response.payload.response.data.message);
      toast.error(response.payload.response.data.message[0]);
    }
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteCfa(id));

    if (response && response.type === "deleteCfa/fulfilled") {
      toast.success(response.payload.message);
      dispatch(
        getAllCfas({
          page,
          pageSize,
          status: (status && status.value) || "",
          signStatus: (signStatus && signStatus.value) || "",
        })
      );
    }
  };

  const handleOpenDoc = (data) => {
    setOpenDoc([true, data]);
  };

  const columns = [
    {
      field: "",
      headerName: "Actions",
      headerClassName: 'red-header',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Tooltip title="Edit">
              <Button
                variant="outlined"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent row selection
                  setEditModal([true, params.row]);
                }}
              >
                <EditIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                variant="outlined"
                color="error"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent row selection
                  handleDelete(params.row._id);
                }}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: 'red-header',
      width: 250,
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      headerClassName: 'red-header',
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: 'red-header',
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: 'red-header',
      width: 180,
    },
    {
      field: "adhar",
      headerName: "Adhar",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "birth",
      headerName: "Birth",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      headerClassName: 'red-header',
      width: 180,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "endDate",
      headerName: "End Date",
      headerClassName: 'red-header',
      width: 180,
    },
  ];

  const handleCSVInputChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        let data = result.data;
        data.pop();
        setJsonData(data);
      },
      header: true,
    });
  };

  const downloadFile = () => {
    const fileName = "Cfa.csv";
    const fileUrl = "/" + fileName;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const _handleCSVToUser = async () => {
    if (jsonData.length > 0) {
      let data = await dispatch(addMultiCfa(jsonData));

      if (data && data.type == "addMultiCfa/rejected") {
        toast(data.payload.response.data.message);
      } else {
        toast("Cfa added successfully!");
      }

      callApi();
    } else {
      toast("Please select file.");
    }
  };

  const handleDownload = async () => {
    let finalObject = {
      status: (status && status.value) || "",
      signStatus: (signStatus && signStatus.value) || "",
      search: search || ""
    };
    const response = await dispatch(CfaExcelDownload(finalObject));

    let cfaData = response && response.payload && response.payload.data;

    if (cfaData.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(downloadCfaExcel(cfaData));
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
    link.download = "Cfa Data.xlsx";
    link.click();
    toast.success("Download Successfully!");
  };

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <>
      <div className="home-content">
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", marginLeft: "1rem" }}>
          <div style={{ display: "flex" }}>
            <Button variant="outlined"
              sx={{ marginRight: "1rem", color: "#58aff6", fontWeight: "bold", border: "2px solid" }}
              onClick={handleDownload}
            >
              <DownloadOutlinedIcon /> {t("Download Excel")}
            </Button>

            <Button variant="outlined"
              sx={{ color: "#0058aa", fontWeight: "bold", border: "2px solid", color: "#c20b3b" }}
              onClick={downloadFile}
            >
              <UploadOutlinedIcon /> {t("Sample")}
            </Button>

          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outlined"
              onClick={() => setFilterOpen(!filterOpen)}
              sx={{ color: "#f89a74", fontWeight: "bold", border: "2px solid", marginRight: "1rem" }}
            >
              <FilterAltOutlinedIcon /> {t("Filter")}
            </Button>
          </div>
        </Box>

        {filterOpen && (
          <Box className="card m-3 p-3 mb-3 d-flex justify-content-between" sx={{ background: "#ffe7eb", borderRadius: "5px" }}>
            <div className="d-flex gap-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={statusOption}
                sx={{ width: 300, background: "#fff" }}
                onChange={(e, newValue) => setStatus(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={signStatusOption}
                sx={{ width: 300, background: "#fff" }}
                onChange={(e, newValue) => setSignStatus(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Sign Status" />
                )}
              />
            </div>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "end", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", mt: 2, px: 2 }}>
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

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <input
              type="file"
              accept=".csv"
              className="form-control"
              onChange={handleCSVInputChange}
            />
            <LoadingButton
              variant="contained"
              onClick={_handleCSVToUser}
            >
              {t("Submit")}
            </LoadingButton>
          </Box>
        </Box>

        <div>
          <div className="card m-3">
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={cfas}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(cfas && cfas.length > 0 && cfas.initialState),
                  pagination: {
                    ...(cfas &&
                      cfas.length > 0 &&
                      cfas.initialState &&
                      cfas.initialState?.pagination),
                    paginationModel: {
                      pageSize: pageSize,
                    },
                  },
                }}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onPaginationModelChange={handlePaginationModelChange}
                rowsPerPageOptions={[10]}
                getRowId={(e) => e._id}
              />
            </Box>
          </div>
        </div>
      </div>

      <CfaEditModal
        show={editModal}
        setShow={setEditModal}
        callApi={callApi}
      />

      <ViewCfaDoc
        show={openDoc[0]}
        setShow={setOpenDoc}
        data={openDoc[1]}
        callApi={callApi}
      />
    </>
  );
}
