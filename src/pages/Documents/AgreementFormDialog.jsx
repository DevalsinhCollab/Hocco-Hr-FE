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

  const [radioText, setRadioText] = useState("agreement");
  const [empInputValue, setEmpInputValue] = useState("");
  const [employee, setEmployee] = useState(null);
  const [document, setDocument] = useState("");
  const [fileName, setFileName] = useState("");
  const [signType, setSignType] = useState(null);

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  const getEmpData = () => {
    if (employee) {
      var { label, value, ...updatedEmployeeData } = employee;
    }

    return updatedEmployeeData
  };

  const handleClose = () => {
    setModalOpen(false);
    setEmployee(null)
    setSignType(null)
    setDocument("")
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
      signType: signType.value,
      radioText: radioText
    }

    const response = await dispatch(sendAgreementToEmp(finalData))

    if (response && response.type && response.type.includes("fulfilled")) {
      toast(response.payload.message)
    }

    apiFunc()
    handleClose()
  };

  return (
    <>
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
                <SearchTemplateAutocomplete label="Templates" document={document} setDocument={setDocument} />
              </FormControl>
              <ul className="mt-3">
                {employee !== null && document &&
                  document.fields && document.fields.map((field, i) => {
                    let showData = "";
                    showData = getEmpData();

                    const replacementMap = {
                      "{Designation}": "{designation}",
                      "{Salary}": "{salary}",
                      "{Salary_PA}": "{salaryPa}",
                      "{Basic_Salary}": "{basicSalary}",
                      "{Basic_Salary_PA}": "{basicSalaryPa}",
                      "{Allowances}": "{allowances}",
                      "{Allowances_PA}": "{allowancesPa}",
                      "{Education_Allowance}": "{educationAllowance}",
                      "{Education_Allowance_PA}": "{educationAllowancePa}",
                      "{Attendance_Allowance}": "{attendanceAllowance}",
                      "{Attendance_Allowance_PA}": "{attendanceAllowancePa}",
                      "{HRA}": "{hra}",
                      "{HRA_PA}": "{hraPa}",
                      "{Monthly_Bonus}": "{monthlyBonus}",
                      "{Monthly_Bonus_PA}": "{monthlyBonusPa}",
                      "{Production_Incentive}": "{productionIncentive}",
                      "{Production_Incentive_PA}": "{productionIncentivePa}",
                      "{Company_Contribution}": "{companyContribution}",
                      "{Company_Contribution_PA}": "{companyContributionPa}",
                      "{Provident_Fund}": "{providentFund}",
                      "{Provident_Fund_PA}": "{providentFundPa}",
                      "{Employee_State_Insurance_Corporation}": "{employeeStateInsuranceCorporation}",
                      "{Employee_State_Insurance_Corporation_PA}": "{employeeStateInsuranceCorporationPa}",
                      "{Bonus_Exgratia}": "{bonusExgratia}",
                      "{Bonus_Exgratia_PA}": "{bonusExgratiaPa}",
                      "{Variable_Pay}": "{variablePay}",
                      "{Variable_Pay_PA}": "{variablePayPa}",
                      "{Total_CTC}": "{totalCTC}",
                      "{Total_CTC_PA}": "{totalCTCPa}",
                      "{Residential_Address}": "{residentialAddress}",
                      "{Notice_Period}": "{noticePeriod}",
                    };

                    let dbKey = replacementMap[field] ? replacementMap[field] : field

                    if (dbKey) {
                      let rbDBKey = dbKey.replace("{", "").replace("}", "");
                      return (
                        <li>
                          {field} = {showData && showData[rbDBKey] ? showData[rbDBKey] : ""}
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

          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
