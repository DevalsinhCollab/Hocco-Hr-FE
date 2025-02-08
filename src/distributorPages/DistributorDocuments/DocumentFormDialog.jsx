import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchEmployeeAutocomplete from "../../components/autocomplete/SearchEmployeeAutocomplete";
import { Autocomplete, styled, TextField, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { sendAgreementToEmp } from "../../features/DocumentSlice";
import { disTypeArray } from "../../utils/utils";
import SearchDistributorAutocomplete from "../../components/autocomplete/SearchDistributorAutocomplete";
import { createDocForSignDocuments } from "../../features/DistributorSlice";

export default function DocumentFormDialog(props) {
  const { modalOpen, setModalOpen, callApi } = props;
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.distributorData);

  const [empInputValue, setEmpInputValue] = useState("");
  const [customer, setCustomer] = useState(null);
  const [document, setDocument] = useState("");
  const [fileName, setFileName] = useState("");
  const [docType, setDocType] = useState(null);

  const handleClose = () => {
    setModalOpen(false);
    setCustomer(null);
    setDocType(null);
    setDocument("");
    setFileName("");
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // Ensure a file is selected

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      const base64Document = base64.split("base64,")[1];

      setDocument(base64Document);
      setFileName(file.name);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!customer) {
      return toast.error("Please select an customer");
    }

    if (!docType) {
      return toast.error("Please select a docType");
    }

    if (!document) {
      return toast.error("Please select a template or upload a file");
    }

    toast.success("Uploading Document");

    const finalData = {
      custCode: customer.custCode,
      document: document,
      fileName: fileName,
      docType: docType.value,
    };

    const response = await dispatch(createDocForSignDocuments(finalData));

    console.log(response, "response==========");
    

    if (response && response.docType && response.docType.includes("fulfilled")) {
      toast.success(response.payload.message);
    }

    callApi();
    handleClose();
  };

  return (
    <Dialog open={modalOpen} onClose={handleClose} fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        Add Documents
      </DialogTitle>
      <DialogContent>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={disTypeArray}
          sx={{ my: 2 }}
          value={docType}
          onChange={(e, newValue) => setDocType(newValue || null)}
          renderInput={(params) => <TextField {...params} label="Select Type" />}
        />

        <SearchDistributorAutocomplete
          label="Name"
          inputValue={empInputValue}
          setInputValue={setEmpInputValue}
          customer={customer}
          width={550}
          setCustomer={setCustomer}
          sx={{ my: 2 }}
          docType={docType}
        />

        <Tooltip title="Upload document">
          <LoadingButton
            component="label"
            role={undefined}
            variant="contained"
            fullWidth
            startIcon={<CloudUploadIcon />}
            onClick={(event) => event.stopPropagation()}
          >
            {fileName !== "" ? fileName : "Upload File"}
            <VisuallyHiddenInput
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </LoadingButton>
        </Tooltip>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={handleSubmit} variant="contained" loading={loading}>
          Send
        </LoadingButton>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}