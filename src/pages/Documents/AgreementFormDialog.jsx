import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getTemplates } from "../../features/TemplateDetailSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchEmployeeAutocomplete from "../../components/autocomplete/SearchEmployeeAutocomplete";
import { Autocomplete, styled, TextField, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { sendAgreementToEmp } from "../../features/DocumentSlice";
import { signTypeArray } from "../../utils/utils";
import SearchTemplateAutocomplete from "../../components/autocomplete/SearchTemplateAutocomplete";

export default function AgreementFormDialog(props) {
  const { modalOpen, setModalOpen, callApi: apiFunc } = props;
  const dispatch = useDispatch();

  const { loading: docLoading } = useSelector(state => state.documentData)

  const [template, setTemplate] = useState("");
  const [radioText, setRadioText] = useState("agreement");
  const [findBase64, setFindBase64] = useState(null);
  const [callApi, setCallApi] = useState(false);
  const [assetsData, setAssetsData] = useState({});
  const [empInputValue, setEmpInputValue] = useState("");
  const [employee, setEmployee] = useState(null);
  const [document, setDocument] = useState("");
  const [fileName, setFileName] = useState("");
  const [signType, setSignType] = useState(null);

  useEffect(() => {
    if (template !== "") {
      setCallApi(true);
    }
  }, [template]);

  const callAssetApi = async () => {
    const response = await dispatch(
      // getDFByAssetSerialNumber({
      //   assetSerialNumber: modalOpen[1].assetSerialNumber,
      // })
    );

    if (response && response.payload && response.payload.data) {
      setAssetsData(response.payload.data);
    }
  };

  useEffect(() => {
    if (callApi) {
      callAssetApi();
    }
  }, [callApi]);

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  const getEmpData = () => {
    if (assetsData) {
      var { custName, custCode, ...updatedAssetsData } = assetsData;
    }

    let combineObject = { ...updatedAssetsData };

    let { _id, __v, ...newObj } = combineObject;

    return {
      ...newObj,
      Execution_Date: "Agreement generation Date",
      Legal_Entity: "Proprietor/ partnership",
      CIN: "",
      FSSAI_License: "",
    };
  };

  const handleClose = () => {
    setModalOpen(false);
    setTemplate("");
    setFindBase64(null);
    setCallApi(false);
    setEmployee(null)
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
    const reader = new FileReader();

    let document;
    reader.onload = async (e) => {
      const base64 = e.target.result;

      document = base64.split("base64,")[1];

      setDocument(document)
      setFileName(file.name)
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!employee) {
      return toast.error("Please select an employee")
    }

    if (!signType) {
      return toast.error("Please select an sign type")
    }

    if (!document) {
      return toast.error("Please select an template or upload a file")
    }

    toast.success("Uploading Document");

    let finalData = {
      empCode: employee && employee.empCode,
      empName: employee && employee.empName,
      document: document,
      fileName: fileName,
      signType: signType.value
    }

    const response = await dispatch(sendAgreementToEmp(finalData))

    if (response && response.type && response.type.includes("fulfilled")) {
      toast(response.payload.message)
    }

    apiFunc()
    setModalOpen(false)
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={() => handleClose()} fullWidth>
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

          <SearchEmployeeAutocomplete
            label={"Name"}
            inputValue={empInputValue}
            setInputValue={setEmpInputValue}
            employee={employee}
            width={550}
            setEmployee={setEmployee}
          />

          <div className="d-flex justify-content-between">
            <FormControl className="mt-3">
              <FormLabel id="demo-radio-buttons-group-label">
                Select the type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="agreement"
                name="radio-buttons-group"
                onChange={(e) => setRadioText(e.target.value)}
              >
                <FormControlLabel value="agreement" control={<Radio />} label="Use Templates" />
                <FormControlLabel value="document" control={<Radio />} label="Upload file" />
              </RadioGroup>
            </FormControl>
          </div>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={signTypeArray}
            sx={{ my: 2 }}
            value={signType}
            onChange={(e, newValue) => {
              if (newValue) {
                setSignType(newValue);
              } else {
                setSignType(null);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Select Sign Type" />}
          />

          {radioText && radioText == "agreement" ?
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel htmlFor="max-width">Templates</InputLabel>
                {/* <Select
                  name="template"
                  value={template}
                  label="Templates"
                  onChange={(e) => setTemplate(e.target.value)}
                  sx={{ borderRadius: "10px" }}
                >
                  {templates.map((i) => {
                  return (
                    <MenuItem value={i?._id} key={i._id}>
                      {i?.templateName}
                    </MenuItem>
                  );
                })}
                </Select> */}

                <SearchTemplateAutocomplete />
              </FormControl>
              <ul className="mt-3">
                {findBase64 &&
                  findBase64?.fields.map((field, i) => {
                    let showData = "";
                    showData = getEmpData();

                    const replacementMap = {
                      "{Dealer_Name}": "{name}",
                      "{Dealer_Code}": "{empCode}",
                    };

                    let dbKey = replacementMap[field];

                    // if (dbKey == "{Execution_Date}") {
                    //   const myDate = new Date();
                    //   const formattedDate = myDate.toLocaleString("en-US", {
                    //     year: "numeric",
                    //     month: "2-digit",
                    //     day: "2-digit",
                    //   });
                    //   return (
                    //     <li>
                    //       {field} = {formattedDate}
                    //     </li>
                    //   );
                    // }

                    if (dbKey) {
                      let rbDBKey = dbKey.replace("{", "").replace("}", "");
                      return (
                        <li>
                          {field} = {showData[rbDBKey] ? showData[rbDBKey] : ""}
                        </li>
                      );
                    } else {
                      return (
                        <li>
                          {field} = {dbKey}
                        </li>
                      );
                    }
                  })}
              </ul>
            </Box>
            : <Tooltip title="Upload document">
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
                  onChange={(e) => handleFileChange(e)}
                />
              </LoadingButton>
            </Tooltip>
          }

        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={docLoading}
          >
            Send
          </LoadingButton>

          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
