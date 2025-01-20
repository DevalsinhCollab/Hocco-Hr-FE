import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";
import {
  addMultiDFMaster,
  getAllAssetsForExcel,
  getAllDFMaster,
} from "../../features/dfMasterSlice";
import { useTranslation } from "react-i18next";
import { convertToTitleCase, downloadLogExcel } from "../../utils/utils";
import moment from "moment";
import AssetMasterEditModal from "../../components/Modal/AssetMasterEditModal";
import * as XLSX from "xlsx";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import SearchCustomerAutocomplete from "../../components/autocomplete/SearchCustomerAutocomplete";
import SearchAssestAutocomplete from "../../components/autocomplete/SearchAssestAutocomplete";
import SearchBarCodeAutocomplete from "../../components/autocomplete/SearchBarCodeAutocomplete";
import { Button, InputAdornment, TextField } from "@mui/material";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import EditIcon from "../../../public/Images/EditIcon.png"
import SearchIcon from '@mui/icons-material/Search';

export default function DFMaster(props) {
  const dispatch = useDispatch();

  const {
    dfMaster,
    loading: dfMasterLoading,
    totalCount,
  } = useSelector((state) => state.dfMaster);
  const { t } = useTranslation();
  const [jsonData, setJsonData] = useState(null);
  const [editModal, setEditModal] = useState([false, null]);
  const [columns, setColumns] = useState([
    {
      field: "",
      headerName: "Actions",
      width: 100,
      headerClassName: 'red-header',
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <img src={EditIcon}
              onClick={() => setEditModal([true, params.row])}
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filterOpen, setFilterOpen] = useState(false);
  const [custInputValue, setCustInputValue] = useState("");
  const [customer, setCustomer] = useState(null);
  const [assetInputValue, setAssetInputValue] = useState("");
  const [assetSerialNumber, setAssestSerialNumber] = useState(null);
  const [barCodeInputValue, setBarCodeInputValue] = useState("");
  const [barCode, setBarCode] = useState(null);
  const [search, setSearch] = useState("")

  const callApi = () => {
    dispatch(
      getAllDFMaster({
        page,
        pageSize,
        assetSerialNumber: (assetSerialNumber && assetSerialNumber.label) || "",
        customer: (customer && customer.custCode) || "",
        barCode: (barCode && barCode.label) || "",
        search: search || ""
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [
    page,
    pageSize,
    dispatch,
    assetSerialNumber,
    custInputValue,
    barCodeInputValue,
    search
  ]);

  // for dynamic columns
  useEffect(() => {
    if (dfMaster && dfMaster[0]) {
      const keys = Object.keys(dfMaster && dfMaster[0]);

      // Create column objects from keys
      const dynamicColumns = keys
        .filter((key) => key !== "_id" && key !== "__v")
        .map((key) => ({
          field: key,
          headerName: convertToTitleCase(key),
          headerClassName: 'red-header',
          width: 200, // Set your desired width
          valueFormatter: ({ field, value }) => {
            if (
              [
                "constructionDateInvoiceDate",
                "installationDate",
                "chequeDateInCaseOfChequePay",
                "paymentClearaceDate",
                "createdAt",
                "updatedAt",
              ].includes(field)
            ) {
              const formattedDate = moment(value).format("DD/MM/YYYY");

              return formattedDate !== "Invalid date" ? formattedDate : value;
            }
          },
        }));

      setColumns([...columns, ...dynamicColumns]);
    }
  }, [dfMaster]);

  const downloadFile = () => {
    const fileName = "Assetsmaster.csv";
    const fileUrl = "/" + fileName;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCSVInputChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        let data = result.data;
        data.pop();
        const newData = [];
        data.forEach((element) => {
          if (element["bookValue "]) {
            let bookValue = element["bookValue "];
            delete element["bookValue "];
            newData.push({ ...element, bookValue });
          } else {
            newData.push(element);
          }
        });
        setJsonData(newData);
      },
      header: true,
    });
  };

  const _handleCSVToUser = async () => {
    if (jsonData.length > 0) {
      let data = await dispatch(addMultiDFMaster(jsonData));
      if (data?.payload?.response?.status == 400) {
        toast(`${data.payload.response.data.message}`);
      } else {
        toast("DF Master added successfully!");
      }
    } else {
      toast("Please select file.");
    }
  };

  const handleDownload = async () => {
    const response = await dispatch(
      getAllAssetsForExcel({
        assetSerialNumber: (assetSerialNumber && assetSerialNumber.label) || "",
        customer: (customer && customer.custCode) || "",
        barCode: (barCode && barCode.label) || "",
        search: search || ""
      })
    );

    let excelData = response && response.payload && response.payload.data;

    if (excelData.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(downloadLogExcel(excelData));

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
    link.download = "Assets Data.xlsx";
    link.click();
    alert("Download Successfully!");
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
          <Box className="card m-3 p-3 mb-3 d-flex justify-content-between" sx={{ background: "#ffe7eb", borderRadius: "5px" }}>
            <div className="d-flex gap-4">
              <SearchCustomerAutocomplete
                id="combo-box-demo"
                inputValue={custInputValue}
                setInputValue={setCustInputValue}
                setCustomer={setCustomer}
                customer={customer}
                label="Cust Code"
                width={910}
              />

              <SearchAssestAutocomplete
                inputValue={assetInputValue}
                setInputValue={setAssetInputValue}
                setValue={setAssestSerialNumber}
                value={assetSerialNumber}
                label="Asset Serial Number"
                width={910}
              />
            </div>
            <div className="d-flex gap-4 mt-3">
              <SearchBarCodeAutocomplete
                inputValue={barCodeInputValue}
                setInputValue={setBarCodeInputValue}
                setValue={setBarCode}
                value={barCode}
                label="Bar Code"
                width={795}
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
                rows={dfMaster}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(dfMaster && dfMaster.length > 0 && dfMaster.initialState),
                  pagination: {
                    ...(dfMaster &&
                      dfMaster.length > 0 &&
                      dfMaster.initialState &&
                      dfMaster.initialState?.pagination),
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

      <AssetMasterEditModal show={editModal} setShow={setEditModal} />
    </>
  );
}
