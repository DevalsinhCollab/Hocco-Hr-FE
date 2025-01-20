import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import {
  assetRelease,
  getAllAssetsTracker,
} from "../../features/AssetTrackerSlice";
import _ from "lodash";
import SearchCustomerAutocomplete from "../../components/autocomplete/SearchCustomerAutocomplete";
import { toast } from "react-toastify";
import { DialogTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function AssetTransferStatusDialog(props) {
  const { modalOpen, setModalOpen, page, pageSize } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState("");
  const [custCode, setCustCode] = React.useState("");
  const [custInputValue, setCustInputValue] = React.useState("");

  const handleSubmit = async () => {
    // remove _id, updatedat, createdat, __v, while sending data
    const { _id, id, updatedAt, createdAt, __v, ...newObj } = modalOpen[1];

    let finalData = {
      assetsId: modalOpen[1].assetsId,
      status,
      assetTrackerId: modalOpen[1].id,
      custCode: custCode && custCode.custCode,
      assetTrackerData: newObj,
    };

    const response = await dispatch(assetRelease(finalData));

    if (
      response &&
      response.type &&
      response.type.includes("assetRelease/fulfilled")
    ) {
      dispatch(getAllAssetsTracker({ page, pageSize }));
      toast(response.payload.message);
    }
    setStatus("");
    setModalOpen(false);
    setCustInputValue("");
  };

  const handleClose = () => {
    setModalOpen([false, null]);
    setStatus("");
    setCustInputValue("");
  };

  return (
    <React.Fragment>
      <Dialog open={modalOpen[0]} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            background: "#ce1042",
            color: "#fff"
          }}
        >
          RELEASE
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: status === "C2C" ? "15rem" : "",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 200 }}>
              <InputLabel htmlFor="max-width">Release</InputLabel>
              <Select
                name="status"
                value={status}
                label="Release"
                onChange={(e) => setStatus(e.target.value)}
                sx={{ borderRadius: "10px" }}
              >
                <MenuItem value={"C2C"}>Customer to Customer</MenuItem>
                <MenuItem value={"C2D"}>Customer to Depo</MenuItem>
              </Select>
            </FormControl>

            {status === "C2C" && (
              <SearchCustomerAutocomplete
                inputValue={custInputValue}
                setInputValue={setCustInputValue}
                setCustomer={setCustCode}
                label="Select Customer"
                sx={{ mt: 2, borderRadius: "100px" }}
                width={550}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "#0058aa",
              "&:hover": {
                background: "#0058aa", // Lighter color on hover
              },
            }}
          >
            Save
          </LoadingButton>

          <Button
            variant="contained"
            onClick={() => handleClose()}
            sx={{
              background: "#a30000",
              "&:hover": {
                background: "#d32f2f", // Lighter color on hover
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
