import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";
import { downloadEmployeeExcel, downloadVrsExcel } from "../../utils/utils";
import { DownloadTwoTone } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, LoadingButton } from "@mui/lab";
import * as XLSX from "xlsx";
import { EmployeeExcelDownload } from "../../features/EmployeeDetailSlice";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import { TextField } from "@mui/material";
import { signStatusOption, statusOption } from "../../constants/Employee-const";
import {
  addDoc,
  addMultiVrs,
  deleteVrs,
  getAllVrs,
  sendAgreementToVrs,
  VrsExcelDownload,
} from "../../features/VrsSlice";
import VrsEditModal from "../../components/Modal/VrsEditModal";
import ViewVrsDoc from "../../components/Modal/ViewVrsDoc";

export default function Vrs() {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.userData);
  const {
    vrsDatas,
    loading: vrsLoading,
    totalCount,
  } = useSelector((state) => state.vrsData);
  const { t } = useTranslation();

  const [jsonData, setJsonData] = useState([]);
  const [editModal, setEditModal] = useState([false, null]);
  const [openDoc, setOpenDoc] = useState([false, null]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [signStatus, setSignStatus] = useState({});
  const [docAdded, setDocAdded] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const callApi = () => {
    dispatch(
      getAllVrs({
        page,
        pageSize,
        status: (status && status.value) || "",
        signStatus: (signStatus && signStatus.value) || "",
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, dispatch, docAdded, status, signStatus]);

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
      sendAgreementToVrs({ custCode: data.custCode })
    );

    if (response && response.type === "sendAgreementToVrs/fulfilled") {
      toast.success(response.payload.message);
      dispatch(getAllVrs());
    } else {
      toast.error(response.payload.response.data.message);
      toast.error(response.payload.response.data.message[0]);
    }
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteVrs(id));

    if (response && response.type === "deleteVrs/fulfilled") {
      toast.success(response.payload.message);
      dispatch(
        getAllVrs({
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

  const handleSignType = (data) => {
    setSignType([true, data]);
  };

  const columns = [
    {
      field: "",
      headerName: "Actions",
      width: 300,
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

            {params && params.row && !params.row.document ? (
              <Tooltip title="Upload document">
                <LoadingButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  loading={vrsLoading}
                  onClick={(event) => event.stopPropagation()} // Prevent row selection
                >
                  <VisuallyHiddenInput
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, params.row)}
                  />
                </LoadingButton>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Sent Agreement">
                  <LoadingButton
                    variant="outlined"
                    color="success"
                    onClick={(event) => {
                      event.stopPropagation(); // Preve
                      handleAgreementSend(params.row);
                    }}
                    loading={vrsLoading}
                  >
                    <SendIcon />
                  </LoadingButton>
                </Tooltip>

                <Tooltip title="View Agreement">
                  <Button
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDoc(params.row);
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "adhar",
      headerName: "Adhar",
      width: 150,
    },
    {
      field: "birth",
      headerName: "Birth",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
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
    const fileName = "Vrs.csv";
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
      let data = await dispatch(addMultiVrs(jsonData));

      if (data && data.type == "addMultiVrs/rejected") {
        toast(data.payload.response.data.message);
      } else {
        toast("Vrs added successfully!");
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
    };
    const response = await dispatch(VrsExcelDownload(finalObject));

    let vrsData = response && response.payload && response.payload.data;

    if (vrsData.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(downloadVrsExcel(vrsData));
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
    link.download = "Vrs Data.xlsx";
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
        <div className="d-flex justify-content-between align-items-end w-100">
          <div></div>
          <div className="d-flex gap-2">
            <Button
              variant="contained"
              sx={{ marginRight: "5.5rem" }}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>
          </div>
        </div>

        {filterOpen && (
          <div className="teamMainBox">
            <Box className="card m-3 p-3 mb-3 d-flex justify-content-between">
              <div className="d-flex gap-4">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={statusOption}
                  sx={{ width: 300 }}
                  onChange={(e, newValue) => setStatus(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={signStatusOption}
                  sx={{ width: 300 }}
                  onChange={(e, newValue) => setSignStatus(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Sign Status" />
                  )}
                />
              </div>
            </Box>
          </div>
        )}

        <div className="teamMainBox">
          {error && error.message ? (
            <h2 className="text-danger text-center">{error.message}</h2>
          ) : (
            ""
          )}
          <div className="card m-3 p-3">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h4 className="m-0">{t("VRS")}</h4>

              <div className="d-flex">
                <button
                  className="btn btn-sm btn-primary me-2 px-3"
                  onClick={downloadFile}
                >
                  <DownloadTwoTone />
                </button>
                <button
                  className="btn btn-sm btn-primary me-2 px-3 py-0"
                  onClick={handleDownload}
                >
                  Download Excel
                </button>
                <input
                  type="file"
                  accept=".csv"
                  className="form-control"
                  onChange={handleCSVInputChange}
                />
                <LoadingButton
                  className="ms-2 px-3"
                  variant="contained"
                  loading={vrsLoading}
                  onClick={_handleCSVToUser}
                >
                  Submit
                </LoadingButton>
              </div>
            </div>
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={vrsDatas}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(vrsDatas && vrsDatas.length > 0 && vrsDatas.initialState),
                  pagination: {
                    ...(vrsDatas &&
                      vrsDatas.length > 0 &&
                      vrsDatas.initialState &&
                      vrsDatas.initialState?.pagination),
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

      <VrsEditModal
        show={editModal}
        setShow={setEditModal}
        callApi={callApi}
      />
      <ViewVrsDoc
        show={openDoc[0]}
        setShow={setOpenDoc}
        data={openDoc[1]}
        callApi={callApi}
      />
    </>
  );
}
