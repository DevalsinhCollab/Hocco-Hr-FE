import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { downloadEmployeeExcel } from "../../utils/utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../features/EmployeeDetailSlice";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import EmployeeEditModal from "../../components/Modal/EmployeeEditModal";
import ViewEmployeeDoc from "../../components/Modal/ViewEmployeeDoc";
import { getUsers } from "../../features/userDetailsSlice";

export default function Users(props) {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.userData);
  const { users } = useSelector((state) => state.userData);
  const { t } = useTranslation();

  const [editModal, setEditModal] = useState([false, null]);
  const [openDoc, setOpenDoc] = useState([false, null]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDelete = async (id) => {
    const response = await dispatch(deleteEmployee(id));

    if (response && response.type === "deleteEmployee/fulfilled") {
      toast.success(response.payload.message);
      dispatch(getAllEmployees());
    }
  };

  const columns = [
    {
      field: "",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="d-flex gap-2">
          <Tooltip title="Edit">
            <Button
              variant="outlined"
              onClick={() => setEditModal([true, params.row])}
            >
              <EditIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.row._id)}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "userType",
      headerName: "Role",
      width: 300,
    },
  ];

  const handleDownload = () => {
    if (users.length === 0) {
      toast.warning("No data to export.");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(downloadEmployeeExcel(users));
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
    link.download = "Users Data.xlsx";
    link.click();
    alert("Download Successfully!");
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
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h4 className="m-0">{t("Users")}</h4>

              <div className="d-flex">
                <button
                  className="btn btn-sm btn-primary me-2 px-3 py-2"
                  onClick={handleDownload}
                >
                  Download Excel
                </button>
              </div>
            </div>
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={users}
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

      <EmployeeEditModal show={editModal} setShow={setEditModal} />
      <ViewEmployeeDoc
        show={openDoc[0]}
        setShow={setOpenDoc}
        data={openDoc[1]}
      />
    </>
  );
}
