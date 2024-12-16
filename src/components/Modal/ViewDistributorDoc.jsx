import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { updateSignAgreementForDistributor } from "../../features/DistributorDocumentSlice";

const ViewDistributorDoc = ({ show, setShow, data, callApi }) => {
  const dispatch = useDispatch();
  const { loading: docLoading } = useSelector((state) => state.documentData);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(null);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    if (data) {
      const byteCharacters = atob(data.document);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setFileName(data.fileName); // Set the name of the file as desired
      setFileSize((blob.size / 1024).toFixed(2) + " KB"); // Set the size of the file
      setBase64(data.document);
    }
  }, [data]);

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

  const handleClose = () => setShow([false, null]);

  const handleRemove = () => {
    setPdfUrl(null);
    setFileName("");
    setFileSize(null);
    setBase64("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setFileName(file.name);
        setFileSize((blob.size / 1024).toFixed(2) + " KB");
        setBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const response = await dispatch(
      updateSignAgreementForDistributor({
        fileName,
        custCode: data.custCode,
        document: base64,
      })
    );

    if (
      response &&
      response.type == "updateSignAgreementForDistributor/fulfilled"
    ) {
      toast.success(response.payload.message);
    }

    callApi();
    setShow([false, null]);
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          width: 600,
          padding: 2,
          backgroundColor: "white",
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <Typography variant="h6" component="h2">
          View Document
        </Typography>
        {pdfUrl ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            p={1}
            border={1}
            borderColor="grey.300"
            borderRadius={1}
          >
            <Box display="flex" alignItems="center">
              <AttachFileIcon />
              <Box ml={1}>
                <Typography variant="body2">{fileName}</Typography>
                <Typography variant="caption">{fileSize}</Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Tooltip title="Remove">
                <IconButton color="error" onClick={handleRemove}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Upload New">
                <IconButton color="primary" component="label">
                  <FileUploadIcon />
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="application/pdf"
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="View Document">
                <Button
                  variant="contained"
                  color="primary"
                  href={pdfUrl}
                  target="_blank"
                  startIcon={<AttachFileIcon />}
                  sx={{ ml: 2 }}
                >
                  View
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <LoadingButton
            component="label"
            role={undefined}
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ width: "100%", margin: "20px 0px" }}
          >
            <VisuallyHiddenInput
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            Upload File
          </LoadingButton>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <LoadingButton
            loading={docLoading}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewDistributorDoc;
