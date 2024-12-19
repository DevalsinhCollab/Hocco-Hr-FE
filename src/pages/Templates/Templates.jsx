import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import TemplateModal from "./TemplateModal";
import { getTemplates } from "../../features/TemplateDetailSlice";
import { useTranslation } from "react-i18next";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Templates(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  //   const { error } = useSelector((state) => state.userData);
  const { templates } = useSelector((state) => state.templateData);
  const [newModal, setNewModal] = useState(false);

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

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

  const columns = [
    {
      field: "templateName",
      headerName: "Template(s)",
      flex: 1,
    },
  ];

  const handleAddNew = () => {
    setNewModal(true);
  };

  return (
    <>
      <div className="home-content">
        <div className="teamMainBox">
          <div className="card m-3 p-3">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h4 className="m-0">{t("Templates")}</h4>
              <div className="d-flex">
                <button
                  className="btn btn-sm btn-primary ms-1 px-3"
                  onClick={handleAddNew}
                >
                  Add - Ready PDF
                </button>

                <button
                  className="btn btn-sm btn-primary ms-1 px-3"
                  onClick={() => navigate("/templates/add")}
                >
                  Add - Customize Template
                </button>
              </div>
            </div>
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={templates}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                getRowId={(e) => e._id}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </div>

      <TemplateModal modalOpen={newModal} setModalOpen={setNewModal} />

    </>
  );
}
