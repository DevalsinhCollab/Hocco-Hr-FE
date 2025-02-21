import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAllUnSignedDocs,
  getAllAssetsTracker,
  openDocumentAssestTracker,
} from "../../features/AssetTrackerSlice";
import AssetTransferStatusDialog from "./AssetTransferStatusDialog";
import AgreementFormDialog from "./AgreementFormDialog";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewPDF from "./ViewPDF";
import { useTranslation } from "react-i18next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssetTrackerInfoModal from "./AssetTrackerInfoModal";
import moment from "moment";
import SearchCustomerAutocomplete from "../../components/autocomplete/SearchCustomerAutocomplete";
import SearchAssestAutocomplete from "../../components/autocomplete/SearchAssestAutocomplete";
import SearchAsmAutocomplete from "../../components/autocomplete/SearchAsmAutocomplete";
import SearchTsmAutocomplete from "../../components/autocomplete/SearchTsmAutocomplete";
import { toast } from "react-toastify";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ViewIcon from "/Images/ViewIcon.png"

export default function AssetsTracker() {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const { assetsTracker, totalCount } = useSelector(
    (state) => state.assetTrackerData
  );

  const [assetStatusDialogOpen, setAssetStatusDialogOpen] = useState([
    false,
    null,
  ]);
  const [statusData, setStatusData] = useState("");
  const [agreementClick, setAgreementClick] = useState([false, null]);
  const [showModal, setShowModal] = useState([false, null]);
  const [popupData, setPopupData] = useState([]);
  const [dataPopup, setDataPopup] = useState(false);
  const [oldCustomerId, setOldCustomerId] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [custInputValue, setCustInputValue] = useState("");
  const [customer, setCustomer] = useState(null);
  const [assetInputValue, setAssetInputValue] = useState("");
  const [assetSerialNumber, setAssestSerialNumber] = useState(null);
  const [asmInputValue, setAsmInputValue] = useState("");
  const [asmName, setAsmName] = useState(null);
  const [tsmInputValue, setTsmInputValue] = useState("");
  const [tsmName, setTsmName] = useState(null);
  const [search, setSearch] = useState("")

  const callApi = () => {
    dispatch(
      getAllAssetsTracker({
        page,
        pageSize,
        customer: (customer && customer.custCode) || "",
        assetSerialNumber: (assetSerialNumber && assetSerialNumber.label) || "",
        asmName: (asmName && asmName.label) || "",
        tsmName: (tsmName && tsmName.label) || "",
        search: search || ""
      })
    );
  };

  useEffect(() => {
    callApi();
  }, [page, pageSize, dispatch, customer, assetSerialNumber, asmName, tsmName, search]);

  const handleInfo = (data) => {
    setPopupData(data);
    setDataPopup(true);
  };

  const handleOpenLink = async (data) => {
    let response = await dispatch(
      openDocumentAssestTracker({
        custCode: data.custCode,
        assetSerialNumber: data.assetSerialNumber,
      })
    );

    if (
      response &&
      response.payload &&
      response.payload.data &&
      response.payload.data.data &&
      response.payload.data.data.documentBase64 &&
      response.payload.data.data.documentBase64.Location
    ) {
      window.open(response.payload.data.data.documentBase64.Location, "_blank");
    }

    if (
      response &&
      response.payload &&
      response.payload.data &&
      response.payload.data.documentBase64 &&
      response.payload.data.documentBase64.Location
    ) {
      window.open(response.payload.data.documentBase64.Location, "_blank");
    }
  };

  const columns = [
    {
      field: "",
      headerName: "Actions",
      width: 380,
      headerClassName: 'red-header',
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Button
              variant="outlined"
              color="success"
              onClick={() => setAgreementClick([true, params.row])}
            >
              Agreement
            </Button>

            {params.row.custCode !== "Depo" && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setAssetStatusDialogOpen([true, params.row])}
              >
                Release
              </Button>
            )}

            <button
              className="btn btn-outline-info p-1"
              onClick={() => handleInfo(params.row)}
            >
              <InfoOutlinedIcon />
            </button>

            {params && params.row && params && params.row.agreementExists && (
              <img src={ViewIcon} style={{ cursor: "pointer", height: "1.2rem", marginTop: "0.5rem", marginLeft: "0.5rem" }} onClick={() => handleOpenLink(params.row)} />
            )}
          </div>
        );
      },
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "custName",
      headerName: "Customer Name",
      width: 250,
      headerClassName: 'red-header',
    },
    // {
    //   field: "1",
    //   headerName: "Button",
    //   headerClassName: 'red-header',
    //   renderCell: (cell) => {
    //     return (
    //       <div>
    //         <button
    //           className="btn btn-outline-info ms-2 p-1"
    //           onClick={() => handleInfo(cell.row)}
    //         >
    //           <InfoOutlinedIcon />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
    {
      field: "assetSerialNumber",
      headerName: "Asset Sr. No.",
      width: 200,
      headerClassName: 'red-header',
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "barCode",
      headerName: "Bar Code",
      width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "asmName",
      headerName: "Asm Name",
      width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "asmEmail",
      headerName: "Asm Email",
      width: 220,
      headerClassName: 'red-header',
    },
    {
      field: "tsmVSEName",
      headerName: "Tsm Name",
      width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "tsmVSEEmail",
      headerName: "Tsm Email",
      width: 220,
      headerClassName: 'red-header',
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      headerClassName: 'red-header',
      valueFormatter: ({ value }) => {
        const dateTime = moment(value).format("DD/MM/YYYY");

        return dateTime !== "Invalid date" ? dateTime : value;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 218,
      headerClassName: 'red-header',
      valueFormatter: ({ value }) => {
        const dateTime = moment(value).format("DD/MM/YYYY");

        return dateTime !== "Invalid date" ? dateTime : value;
      },
    },
  ];

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const handleRefresh = async () => {
    let res = await dispatch(checkAllUnSignedDocs());

    if (res && res.payload && res.payload.message) {
      toast.success(res.payload.message);
    }
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
          <div className="d-flex gap-2">
            <Button variant="outlined"
              sx={{ fontWeight: "bold", border: "2px solid", color: "#c20b3b" }}
              onClick={handleRefresh}
            >
              {t("Refresh")}
            </Button>

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
              <SearchAsmAutocomplete
                inputValue={asmInputValue}
                setInputValue={setAsmInputValue}
                setValue={setAsmName}
                value={asmName}
                label="Asm Name"
                width={910}
              />

              <SearchTsmAutocomplete
                inputValue={tsmInputValue}
                setInputValue={setTsmInputValue}
                setValue={setTsmName}
                value={tsmName}
                label="Tsm Name"
                width={910}
              />
            </div>
          </Box>
        )}

        <div>
          <div className="card m-3">
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={assetsTracker}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(assetsTracker &&
                    assetsTracker.length > 0 &&
                    assetsTracker.initialState),
                  pagination: {
                    ...(assetsTracker &&
                      assetsTracker.length > 0 &&
                      assetsTracker.initialState &&
                      assetsTracker.initialState?.pagination),
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

      <AssetTransferStatusDialog
        setModalOpen={setAssetStatusDialogOpen}
        modalOpen={assetStatusDialogOpen}
        statusData={statusData}
        page={page}
        pageSize={pageSize}
      />

      <AgreementFormDialog
        setModalOpen={setAgreementClick}
        modalOpen={agreementClick}
        oldCustomerId={oldCustomerId}
      />

      {/* <ViewPDF showModal={showModal} setShowModal={setShowModal} /> */}
      <AssetTrackerInfoModal
        setShowModal={setDataPopup}
        showModal={dataPopup}
        popupData={popupData}
      />
    </>
  );
}
