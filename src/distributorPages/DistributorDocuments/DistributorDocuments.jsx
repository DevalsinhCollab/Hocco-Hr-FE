import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import {
  checkPdfSignStatusDistributor,
  getAllDistDocuments,
} from "../../features/DistributorDocumentSlice";
import DocumentFormDialog from "./DocumentFormDialog";
import ViewIcon from "../../../public/Images/ViewIcon.png"
import { useTranslation } from "react-i18next";

export default function DistributorDocuments() {
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const {
    documents,
    loading: docLoading,
    totalCount,
  } = useSelector((state) => state.distributorDocumentData);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    callApi();
  }, [page, pageSize]);

  const columns = [
    {
      field: "document",
      headerName: "Actions",
      headerClassName: 'red-header',
      width: 222,
      renderCell: ({ value }) => {
        return (
          <div className="d-flex gap-2">
            <img src={ViewIcon} style={{ marginLeft: "1rem", cursor: "pointer" }} onClick={() => window.open(value?.Location, "_blank")} />
          </div>
        );
      },
    },
    {
      field: "custCode",
      headerName: "Customer Code",
      headerClassName: 'red-header',
      width: 200
    },
    {
      field: "custName",
      headerName: "Customer Name",
      headerClassName: 'red-header',
      width: 300
    },
    {
      field: "docType",
      headerName: "Document Type",
      headerClassName: 'red-header',
      width: 300,
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
      headerClassName: 'red-header',
      width: 300
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      headerClassName: 'red-header',
      width: 322
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
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, marginLeft: "1rem" }}>
          <div style={{ display: "flex" }}>

          </div>
          <div className="d-flex gap-2">
            <LoadingButton
              variant="outlined"
              onClick={handlePdfCheck}
              loading={docLoading}
              sx={{ color: "#0058aa" }}
            >
              {t("Refresh")}
            </LoadingButton>

            <button
              className="btn btn-sm btn-primary px-3 me-3"
              onClick={() => setOpen(true)}
              style={{ background: "#0058aa" }}
            >
              {t("ADD DOCUMENT")}
            </button>
          </div>
        </Box>

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

      <DocumentFormDialog modalOpen={open} setModalOpen={setOpen} callApi={callApi} />
    </>
  );
}
