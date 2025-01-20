import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";
import {
  addMultiCustomer,
  getAllCustomer,
  getAllCustomersForExcel,
} from "../../features/customerDetailSlice";
import { downloadCustomerExcel } from "../../utils/utils";
import CustomerEditModal from "../../components/Modal/CustomerEditModal";
import { LoadingButton } from "@mui/lab";
import * as XLSX from "xlsx";
import SearchCustomerAutocomplete from "../../components/autocomplete/SearchCustomerAutocomplete";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "../../../public/Images/EditIcon.png"
import ViewIcon from "../../../public/Images/ViewIcon.png"
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export default function Customers() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    customers,
    loading: customerLoading,
    totalCount,
  } = useSelector((state) => state.customerData);

  const [jsonData, setJsonData] = useState([]);
  const [editModal, setEditModal] = useState([false, null]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [custInputValue, setCustInputValue] = useState("");
  const [customer, setCustomer] = useState("");
  const [search, setSearch] = useState("")

  const callApi = () => {
    dispatch(
      getAllCustomer({
        page,
        pageSize,
        customer: (customer && customer.value) || "",
        search: search || ""
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, dispatch, customer, search]);

  const [columns, setColumns] = useState([
    {
      field: "",
      headerName: "Actions",
      width: 180,
      headerClassName: 'red-header',
      renderCell: (params) => {
        return (
          <div>
            <img src={EditIcon}
              onClick={() => setEditModal([true, params.row])}
              style={{ cursor: "pointer" }}
            />
            <img src={ViewIcon} style={{ marginLeft: "1rem", cursor: "pointer" }} onClick={() => navigate(`/customerDetails/${params.row._id}`)} />
          </div>
        );
      },
    },
    {
      field: "custName",
      headerName: "Customer Name",
      width: 400,
      headerClassName: 'red-header',
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 250,
      headerClassName: 'red-header',
    },
    {
      field: "stateName",
      headerName: "State Name",
      width: 300,
      headerClassName: 'red-header',
    },
    {
      field: "stateCode",
      headerName: "State Code",
      width: 300,
      headerClassName: 'red-header',
    },
    {
      field: "pinCode",
      headerName: "Pin Code",
      width: 214,
      headerClassName: 'red-header',
    },
  ]);

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
    const fileName = "Customers.csv";
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
      let data = await dispatch(addMultiCustomer(jsonData));
      if (data.payload.response.status == 400) {
        toast(
          `This customer ${data.payload.response.data.error} already exist!`
        );
      } else {
        toast("Customer added successfully!");
      }
    } else {
      toast("Please select file.");
    }
  };

  const handleDownload = async () => {
    let response = await dispatch(
      getAllCustomersForExcel({ customer: (customer && customer.value) || "" })
    );

    let customers = response && response.payload && response.payload.data;

    if (customers.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(downloadCustomerExcel(customers));

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
    link.download = "Customers Data.xlsx";
    link.click();
    toast("Download Successfully!");
    // swal("Download Successfully!", "Log Data Downloaded", "success");
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
              <DownloadOutlinedIcon /> Download Excel
            </Button>

            <Button variant="outlined"
              sx={{ color: "#0058aa", fontWeight: "bold", border: "2px solid", color: "#c20b3b" }}
              onClick={downloadFile}
            >
              <UploadOutlinedIcon /> Sample
            </Button>

          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outlined"
              onClick={() => setFilterOpen(!filterOpen)}
              sx={{ color: "#f89a74", fontWeight: "bold", border: "2px solid", marginRight: "1rem" }}
            >
              <FilterAltOutlinedIcon /> Filter
            </Button>
          </div>
        </Box>

        {filterOpen && (
          <Box className="m-3 p-3 mb-3 d-flex justify-content-between" sx={{ background: "#ffe7eb", borderRadius: "5px" }}>
            <div className="d-flex gap-4">
              <SearchCustomerAutocomplete
                inputValue={custInputValue}
                setInputValue={setCustInputValue}
                setCustomer={setCustomer}
                customer={customer}
                label="Cust Name / Cust Code"
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
              Submit
            </LoadingButton>

          </Box>
        </Box>

        <div>
          <div className="card m-3">
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={customers}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(customers &&
                    customers.length > 0 &&
                    customers.initialState),
                  pagination: {
                    ...(customers &&
                      customers.length > 0 &&
                      customers.initialState &&
                      customers.initialState?.pagination),
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

      <CustomerEditModal show={editModal} setShow={setEditModal} />
    </>
  );
}
