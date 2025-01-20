import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../features/userDetailsSlice";
import UserModal from "./UserModal";
import { toast } from "react-toastify";

export default function UserTable(props) {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.userData);
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState([false, null]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      valueFormatter: ({ value }) => {
        const dateTime = value.split("T");
        const date = new Date(dateTime[0]);

        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const fDate = dd + "-" + mm + "-" + yyyy;

        return fDate + " " + dateTime[1].split(".")[0];
      },
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (cell) => {
        return (
          <div className="d-flex gap-2">
            <button
              className="border btn btn-white d-flex align-items-center"
              style={{ padding: "10px" }}
              onClick={async () => {
                let data = await dispatch(deleteUser(cell.row._id));
                if (data.type.includes("fulfilled")) {
                  toast("Member deleted successfully");
                } else {
                  toast(data.payload.message);
                }
              }}
            >
              <i
                className="fa-solid fa-trash text-danger"
                style={{ fontSize: "18px" }}
              ></i>
            </button>
            {/* <SweetAlert title="Here's a message!" onConfirm={()=>{}} onCancel={()=>{}} /> */}

            <button
              className="border btn btn-white d-flex align-items-center"
              style={{ padding: "10px" }}
              onClick={() => {
                setShowEditModal([true, cell.row._id]);
              }}
            >
              <i
                className="fa-solid fa-pen text-primary"
                style={{ fontSize: "18px" }}
              ></i>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="home-content">
        <div className="teamMainBox">
          {error && error.message ? (
            <h2 className="text-danger text-center">{error.message}</h2>
          ) : (
            ""
          )}
          <div className="teamBtnRow mb-3">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
            >
              Create Team
            </button>
          </div>
          <div className="card m-3 p-3">
            <h4 className="mt-2 mb-3">Team Members</h4>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                getRowId={(e) => e._id}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
          </div>

          {/* User Model  */}
          <UserModal
            showModal={showModal}
            setShowModal={setShowModal}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            users={users}
          />
        </div>
      </div>
    </>
  );
}
