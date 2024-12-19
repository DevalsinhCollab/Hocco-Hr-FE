import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";
import { downloadEmployeeExcel } from "../../utils/utils";
import { DownloadTwoTone } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, LoadingButton } from "@mui/lab";
import * as XLSX from "xlsx";
import {
  addDoc,
  addMultiEmployees,
  deleteEmployee,
  EmployeeExcelDownload,
  getAllEmployees,
} from "../../features/EmployeeDetailSlice";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SendIcon from "@mui/icons-material/Send";
import {
  sendAgreementToEmp,
  sendMultiAgreementsToEmps,
} from "../../features/DocumentSlice";
import Tooltip from "@mui/material/Tooltip";
import EmployeeEditModal from "../../components/Modal/EmployeeEditModal";
import ViewEmployeeDoc from "../../components/Modal/ViewEmployeeDoc";
import { TextField } from "@mui/material";
import {
  EmployeeStatusColorHelper,
  EmployeeStatusDotColorHelper,
  signStatusOption,
  statusOption,
} from "../../constants/Employee-const";
import EmployeeSignType from "../../components/Modal/EmployeeSignType";
import CircleIcon from "@mui/icons-material/Circle";
import SearchEmployeeAutocomplete from "../../components/autocomplete/SearchEmployeeAutocomplete";
import AddEmployee from "../../components/AddEmployee";

export default function Employees(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { employees, totalCount } = useSelector((state) => state.employeeData)

  const [jsonData, setJsonData] = useState([]);
  const [openDoc, setOpenDoc] = useState([false, null]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState({});
  const [signStatus, setSignStatus] = useState({});
  const [docAdded, setDocAdded] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [signType, setSignType] = useState([false, null]);
  const [empInputValue, setEmpInputValue] = useState("");
  const [employee, setEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [operationMode, setOperationMode] = useState("add");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  const callApi = () => {
    dispatch(
      getAllEmployees({
        page,
        pageSize,
        status: (status && status.value) || "",
        signStatus: (signStatus && signStatus.value) || "",
        empCode: (employee && employee.empCode) || "",
        search: search || "",
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [
    page,
    pageSize,
    dispatch,
    docAdded,
    status,
    signStatus,
    employee,
    search,
  ]);

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
          empCode: data.empCode,
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

  const handleDelete = async (id) => {
    const response = await dispatch(deleteEmployee(id));

    if (response && response.type === "deleteEmployee/fulfilled") {
      toast.success(response.payload.message);
      callApi()
    }
  };

  const handleSignType = (event, data) => {
    event.stopPropagation();
    setSignType([true, data]);
  };

  const openPdf = (data) => {
    setOpenDoc([true, data]);
  };

  const openStringPdf = (data) => {
    setOpenDoc([true, data]);
  };

  const handleEdit = (event, data) => {
    event.stopPropagation();
    setOpenEmployee(true)
    setOperationMode("edit")
    setEmployeeId(data.row._id)
  }

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
                onClick={(event) => handleEdit(event, params)}
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

            {/* {params && params.row && !params.row.document ? (
              <Tooltip title="Upload document">
                <LoadingButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  // loading={employeeLoading}
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
                  // loading={employeeLoading}
                  >
                    <SendIcon />
                  </LoadingButton>
                </Tooltip>

                <Tooltip title="View Agreement">
                  <Button
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      params &&
                        params.row &&
                        params.row.document &&
                        typeof params.row.document == "string"
                        ? openStringPdf(params.row)
                        : openPdf(params.row);
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                </Tooltip>
              </>
            )} */}
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
      field: "empCode",
      headerName: "Employee Code",
      headerClassName: 'red-header', 
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: 'red-header', 
      width: 300,
    },
    // {
    //   field: "signType",
    //   headerName: "Sign Type",
    //   width: 150,
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box onClick={(event) => handleSignType(event, row)}>
    //         <CircleIcon
    //           sx={{
    //             fontSize: "15px",
    //             color: EmployeeStatusDotColorHelper[row.signType],
    //           }}
    //         />
    //         <Button
    //           color={EmployeeStatusColorHelper[row.signType]}
    //           sx={{ textTransform: "capitalize" }}
    //         >
    //           {row && row.signType}
    //         </Button>
    //       </Box>
    //     );
    //   },
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 150,
    // },
    // {
    //   field: "signStatus",
    //   headerName: "Sign Status",
    //   width: 150,
    // },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: 'red-header', 
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: 'red-header', 
      width: 200,
    },
    {
      field: "company",
      headerName: "Company Name",
      headerClassName: 'red-header', 
      width: 250,
      renderCell: ({ row }) => {
        return row && row.company && row.company.name || ""
      }
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
    const fileName = "Employees.csv";
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
      let data = await dispatch(addMultiEmployees(jsonData));

      if (data && data.type == "addMultiEmployees/rejected") {
        toast(data.payload.response.data.message);
      } else {
        toast("Employee added successfully!");
      }
    } else {
      toast("Please select file.");
    }
  };

  const handleDownload = async () => {
    let finalObject = {
      status: (status && status.value) || "",
      signStatus: (signStatus && signStatus.value) || "",
    };
    const response = await dispatch(EmployeeExcelDownload(finalObject));

    let employeesData = response && response.payload && response.payload.data;

    if (employeesData.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(downloadEmployeeExcel(employeesData));
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
    link.download = "Employees Data.xlsx";
    link.click();
    toast.success("Download Successfully!");
  };

  // const handleSendAgreementToAll = async () => {
  //   toast.success("Sending agreements");

  //   const response = await dispatch(
  //     sendMultiAgreementsToEmps({ employees: selectedRows })
  //   );

  //   if (
  //     response &&
  //     response.type.includes("sendMultiAgreementsToEmps/fulfilled")
  //   ) {
  //     let empCodes = response.payload.data
  //       .map((item) => item.empCode)
  //       .join(", ");
  //     toast.success(`Agreements sent to employee codes ${empCodes}`);
  //   } else {
  //     toast.error(response.payload.response.data.message);
  //   }
  // };

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const handleAddEmployee = () => {
    setOperationMode("add")
    setOpenEmployee(true)
  }

  return (
    <>
      <div className="home-content" style={{ padding: "7rem 1rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", marginLeft: "1rem" }}>
          <div>
            <TextField
              label="Search....."
              size="small"
              placeholder="Search....."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            {/* {selectedRows && selectedRows.length > 0 && (
              <LoadingButton
                variant="contained"
                onClick={() => handleSendAgreementToAll()}
              >
                Send To All
              </LoadingButton>
            )} */}

            <Button
              variant="outlined"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>

            <Button
              variant="contained"
              sx={{ marginRight: "1rem" }}
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </div>
        </Box>

        {filterOpen && (
          <div className="teamMainBox">
            <Box className="card m-3 p-3 mb-3 d-flex justify-content-between">
              <div className="d-flex gap-4">
                <SearchEmployeeAutocomplete
                  label={"Name"}
                  inputValue={empInputValue}
                  setInputValue={setEmpInputValue}
                  employee={employee}
                  setEmployee={setEmployee}
                />

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

        <Box sx={{ display: "flex", justifyContent: "end", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", mt: 2, px: 2 }}>
          <Box sx={{ display: "flex" }}>

            <button
              className="btn btn-sm btn-primary me-2 px-3 d-flex align-items-center justify-content-center gap-2"
              onClick={downloadFile}
            >
              <DownloadTwoTone /> Upload
            </button>
            <button
              className="btn btn-sm btn-primary me-2 px-3 py-0 d-flex align-items-center justify-content-center gap-2"
              onClick={handleDownload}
            >
              <DownloadTwoTone /> Download
            </button>
          </Box>


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
              Submit
            </LoadingButton>

          </Box>
        </Box>

        <div className="teamMainBox">
          <div className="card m-3">
            {/* <div className="mb-3 d-flex align-items-center justify-content-between">
              <h4 className="m-0">{t("Employees")}</h4>

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
                  // loading={employeeLoading}
                  onClick={_handleCSVToUser}
                >
                  Submit
                </LoadingButton>
              </div>
            </div> */}
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={employees}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(employees &&
                    employees.length > 0 &&
                    employees.initialState),
                  pagination: {
                    ...(employees &&
                      employees.length > 0 &&
                      employees.initialState &&
                      employees.initialState?.pagination),
                    paginationModel: {
                      pageSize: pageSize,
                    },
                  },
                }}
                // checkboxSelection
                // onRowSelectionModelChange={(newSelection) => {
                //   setSelectedRows(newSelection);
                // }}
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

      <AddEmployee open={openEmployee} setOpen={setOpenEmployee} callApi={callApi} operationMode={operationMode} setOperationMode={setOperationMode} employeeId={employeeId} />

      <EmployeeSignType show={signType} setShow={setSignType} />
    </>
  );
}
