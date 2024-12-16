import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { createTemplate } from "../../features/TemplateDetailSlice";

export default function TemplateModal(props) {
  const { modalOpen, setModalOpen, statusData } = props;
  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("");
  const [templateName, setTemplateName] = useState("");
  const [base64String, setBase64String] = useState("");

  useEffect(() => {
    if (modalOpen) {
      setStatus(statusData && statusData.status);
    }
  }, [modalOpen]);

  const handleSubmit = async () => {
    let finalData = {
      templateName,
      mainTemplate: base64String,
    };

    const response = await dispatch(createTemplate(finalData));

    if (response && response.payload && response.payload.success) {
      toast("Template Added");
    }
    setModalOpen(false);
    setTemplateName("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          Add Template
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputLabel htmlFor="max-width">Template Name</InputLabel>
            <TextField
              label="Enter Template Name"
              variant="outlined"
              sx={{ marginTop: "1rem" }}
              onChange={(e) => setTemplateName(e.target.value)}
              value={templateName}
            />

            <InputLabel htmlFor="max-width" sx={{ marginTop: "1rem" }}>
              Upload File
            </InputLabel>

            <TextField
              type="file"
              onChange={handleFileChange}
              label="Upload File"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                marginTop: "1rem",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>

          <Button onClick={() => setModalOpen(!modalOpen)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
