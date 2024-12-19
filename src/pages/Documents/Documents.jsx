import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  checkPdfSignStatusEmployee,
  getAllDocuments,
} from "../../features/DocumentSlice";
import { toast } from "react-toastify";
import {
  EmployeeStatusColorHelper,
  EmployeeStatusDotColorHelper,
  signStatusOption,
  statusOption,
} from "../../constants/Employee-const";
import CircleIcon from "@mui/icons-material/Circle";
import AgreementFormDialog from "./AgreementFormDialog";
import { Autocomplete, TextField } from "@mui/material";
import SearchEmployeeAutocomplete from "../../components/autocomplete/SearchEmployeeAutocomplete";
import { useLocation } from "react-router-dom";
import { SignTypeOption } from "../../utils/utils";

export default function Documents() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation()

  const { documents, totalCount } = useSelector(state => state.documentData)

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [empInputValue, setEmpInputValue] = useState("");
  const [employee, setEmployee] = useState(null);
  const [status, setStatus] = useState(null);
  const [signStatus, setSignStatus] = useState(null);
  const [signType, setSignType] = useState(null);

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  useEffect(() => {

    if (["/signed"].includes(location.pathname)) {
      setSignStatus({ label: "Signed", value: "Signed" })
    }

    if (["/unsigned"].includes(location.pathname)) {
      setSignStatus({ label: "Unsigned", value: "Unsigned" })
    }

    if (["/completed"].includes(location.pathname)) {
      setStatus({ label: "Completed", value: "Completed" })
    }

  }, [location])

  const callApi = () => {
    dispatch(
      getAllDocuments({
        page,
        pageSize,
        signStatus: signStatus && signStatus.value || "",
        status: status && status.value || "",
        search: search || "",
        signType: signType && signType.value || ""
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, search, status, signStatus, signType]);

  const openPdf = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("No valid URL provided.");
    }
  };

  const columns = [
    {
      field: "",
      headerName: "Actions",
      headerClassName: 'red-header',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Button
              variant="outlined"
              onClick={() => openPdf(params.row.document.Location)}
            >
              <RemoveRedEyeIcon />
            </Button>
          </div>
        );
      },
    },
    {
      field: "empName",
      headerName: "Employee Name",
      width: 250,
      headerClassName: 'red-header',
    },
    {
      field: "empCode",
      headerName: "Employee Code",
      width: 220,
      headerClassName: 'red-header',
    },
    {
      field: "signType",
      headerName: "Sign Type",
      width: 200,
      headerClassName: 'red-header',
      renderCell: ({ row }) => {
        return (
          <>
            <CircleIcon
              sx={{
                fontSize: "15px",
                color: EmployeeStatusDotColorHelper[row.signType],
              }}
            />
            <Button
              color={EmployeeStatusColorHelper[row.signType]}
              sx={{ textTransform: "capitalize" }}
            >
              {row && row.signType}
            </Button>
          </>
        );
      },
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 300,
      headerClassName: 'red-header',
      renderCell: ({ row }) => {
        return row && row.company && row.company.name
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: 'red-header',
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      width: 200,
      headerClassName: 'red-header',
    },
  ];

  const handlePdfCheck = async () => {
    const response = await dispatch(checkPdfSignStatusEmployee());

    if (
      response &&
      response.type &&
      response.type == "checkPdfSignStatusEmployee/fulfilled"
    ) {
      dispatch(
        getAllDocuments({
          page,
          pageSize,
        })
      );
      toast.success(response.payload.message);
    }
  };

  const handleAddDocuments = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="home-content">
        <div className="d-flex justify-content-between align-items-end w-100">
          <div style={{ marginLeft: "1rem" }}>
            <TextField
              label="Search....."
              size="small"
              placeholder="Search....."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="d-flex">
            <Button
              variant="outlined"
              onClick={() => setFilterOpen(!filterOpen)}
              sx={{ marginRight: "1rem" }}
            >
              Filter
            </Button>

            {["/documents"].includes(location.pathname) &&
              <Button
                variant="contained"
                sx={{ marginRight: "1rem" }}
                onClick={handleAddDocuments}
              >
                Add Document
              </Button>
            }
          </div>
        </div>

        {filterOpen && (
          <Box className="card m-3 p-3 mb-3 d-flex justify-content-between" sx={{ background: "#ffe7eb" }}>
            <div className="d-flex gap-4">
              <SearchEmployeeAutocomplete
                label={"Name"}
                inputValue={empInputValue}
                setInputValue={setEmpInputValue}
                employee={employee}
                setEmployee={setEmployee}
              />

              {["/documents"].includes(location.pathname) &&
                <>
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
                  /></>
              }

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={SignTypeOption}
                sx={{ width: 300, background: "#fff" }}
                onChange={(e, newValue) => setSignType(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Sign Type" />
                )}
              />
            </div>
          </Box>
        )}

        <div className="teamMainBox">
          <div className="card m-3">
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={documents}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(documents &&
                    documents.length > 0 &&
                    documents.initialState),
                  pagination: {
                    ...(documents &&
                      documents.length > 0 &&
                      documents.initialState &&
                      documents.initialState?.pagination),
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

      <AgreementFormDialog modalOpen={open} setModalOpen={setOpen} callApi={callApi} />
    </>
  );
}
