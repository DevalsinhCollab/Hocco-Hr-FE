import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { checkPdfSignStatusEmployee } from "../../features/DocumentSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import DownloadIcon from "@mui/icons-material/Download";
import {
  checkPdfSignStatusDistributor,
  expiredDocuments,
  getAllDistDocuments,
  nearExpiryDocuments,
} from "../../features/DistributorDocumentSlice";

export default function DistributorDocuments() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { error } = useSelector((state) => state.userData);
  const {
    documents,
    loading: docLoading,
    totalCount,
    expiredData,
    nearExpiryData,
  } = useSelector((state) => state.distributorDocumentData);
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const callApi = () => {
    dispatch(
      getAllDistDocuments({
        page,
        pageSize,
      })
    );
  };

  const callExpiredApi = () => {
    dispatch(expiredDocuments());
  };

  const callNearExpiryApi = () => {
    dispatch(nearExpiryDocuments());
  };

  useEffect(() => {
    if (location && location.pathname == "/distributorDocuments") {
      callApi();
    }
  }, [page, pageSize, location]);

  useEffect(() => {
    if (location && location.pathname == "/expired") {
      callExpiredApi();
    }
  }, [location]);

  useEffect(() => {
    if (location && location.pathname == "/nearExpiry") {
      callNearExpiryApi();
    }
  }, [location]);

  const openPDFFromBase64 = (pdfBase64) => {
    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const downloadPdf = (data) => {
    // Create a link element
    const link = document.createElement("a");

    // Convert Base64 to a Blob
    const blob = new Blob(
      [Uint8Array.from(atob(data.document), (c) => c.charCodeAt(0))],
      { type: "application/pdf" }
    );

    // Create an object URL from the blob
    const url = URL.createObjectURL(blob);

    // Set link's href to point to the object URL
    link.href = url;

    // Set the download attribute with a default filename
    link.download = `${data.fileName}`;

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download by simulating a click
    link.click();

    // Clean up and remove the link
    link.remove();

    // Revoke the object URL after the download
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      field: "",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Button
              variant="outlined"
              onClick={() => openPDFFromBase64(params.row.document)}
            >
              <RemoveRedEyeIcon />
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={(event) => {
                event.stopPropagation(); // Prevent row selection
                downloadPdf(params.row);
              }}
            >
              <DownloadIcon />
            </Button>
          </div>
        );
      },
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 150,
    },
    {
      field: "custName",
      headerName: "Customer Name",
      width: 250,
    },
    {
      field: "docType",
      headerName: "Document Type",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            {params &&
              params.row &&
              params.row.docType &&
              params.row.docType.toUpperCase()}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      width: 200,
    },
  ];

  const expiredColumns = [
    {
      field: "",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => {
        console.log(params.row, "params.row========");

        return (
          <div className="d-flex gap-2">
            {params &&
              params.row &&
              Object.keys("document") &&
              params.row.document !== "" && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => openPDFFromBase64(params.row.document)}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row selection
                      downloadPdf(params.row);
                    }}
                  >
                    <DownloadIcon />
                  </Button>
                </>
              )}
          </div>
        );
      },
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 150,
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 250,
    },
    {
      field: "docType",
      headerName: "Document Type",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            {params &&
              params.row &&
              params.row.docType &&
              params.row.docType.toUpperCase()}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      width: 200,
    },
  ];

  const nearExpiryColumns = [
    {
      field: "",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            {params &&
              params.row &&
              Object.keys("document") &&
              params.row.document !== "" && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => openPDFFromBase64(params.row.document)}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row selection
                      downloadPdf(params.row);
                    }}
                  >
                    <DownloadIcon />
                  </Button>
                </>
              )}
          </div>
        );
      },
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 150,
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 250,
    },
    {
      field: "docType",
      headerName: "Document Type",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            {params &&
              params.row &&
              params.row.docType &&
              params.row.docType.toUpperCase()}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      width: 200,
    },
  ];

  const handlePdfCheck = async () => {
    const response = await dispatch(checkPdfSignStatusDistributor());

    if (
      response &&
      response.type &&
      response.type == "checkPdfSignStatusDistributor/fulfilled"
    ) {
      dispatch(
        getAllDistDocuments({
          page,
          pageSize,
        })
      );
      toast.success(response.payload.message);
    }
  };

  return (
    <>
      <div className="home-content">
        <div className="teamMainBox">
          {error && error.message ? (
            <h2 className="text-danger text-center">{error.message}</h2>
          ) : (
            ""
          )}
          <div className="card m-3 p-3">
            <div className="mb-3 d-flex align-items-center align-items-center justify-content-between">
              <h4 className="m-0">
                {location && location.pathname == "/nearExpiry"
                  ? t("Near Expiry")
                  : location && location.pathname == "/expired"
                  ? t("Expired Data")
                  : t("Documents")}
              </h4>
              <LoadingButton
                variant="outlined"
                onClick={handlePdfCheck}
                loading={docLoading}
              >
                Refresh
              </LoadingButton>
            </div>
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={
                  location && location.pathname == "/nearExpiry"
                    ? nearExpiryData
                    : location && location.pathname == "/expired"
                    ? expiredData
                    : documents
                }
                columns={
                  location && location.pathname == "/nearExpiry"
                    ? nearExpiryColumns
                    : location && location.pathname == "/expired"
                    ? expiredColumns
                    : columns
                }
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
    </>
  );
}
