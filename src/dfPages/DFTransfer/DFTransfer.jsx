import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { addMultiDFMaster } from "../../features/dfMasterSlice";
import { useTranslation } from "react-i18next";

export default function DFTransfer(props) {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.userData);
  const { dfMaster } = useSelector((state) => state.dfMaster);
  const { t } = useTranslation();

  const [jsonData, setJsonData] = useState(null);

  const columns = [
    {
      field: "custId",
      headerName: "custId",
      flex: 1,
    },
    {
      field: "assetsId",
      headerName: "assetsId",
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
      field: "createdAt",
      headerName: "Created At",
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

  const _handleCSVToUser = async () => {
    let data = await dispatch(addMultiDFMaster(jsonData));
    if (data.payload.response.status == 400) {
      toast(
        `This customer ${"data.payload.response.data.error"} already exist!`
      );
    } else {
      toast("DF Master added successfully!");
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
              <h4 className="m-0">{t("DF Transfer History")}</h4>
              <div className="d-flex">
                <input
                  type="file"
                  accept=".csv"
                  className="form-control"
                  onChange={handleCSVInputChange}
                />
                <button
                  className="btn btn-sm btn-primary ms-2 px-3"
                  onClick={_handleCSVToUser}
                >
                  Submit
                </button>
              </div>
            </div>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={dfMaster}
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
        </div>
      </div>
    </>
  );
}
