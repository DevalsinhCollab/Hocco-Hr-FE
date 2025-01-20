import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { sendAadharLinkViaOtp } from "../../features/AssetTrackerSlice";
import { getTemplates } from "../../features/TemplateDetailSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment";
import { getDFByAssetSerialNumber } from "../../features/dfMasterSlice";
import { getCustomerByCustCode } from "../../features/customerDetailSlice";

export default function AgreementFormDialog(props) {
  const { modalOpen, setModalOpen, oldCustomerId } = props;
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.templateData);

  const [template, setTemplate] = useState("");
  const [radioText, setRadioText] = useState("no");
  const [findBase64, setFindBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [assetsData, setAssetsData] = useState({});
  const [custData, setCustData] = useState({});

  useEffect(() => {
    if (template !== "") {
      setCallApi(true);
    }
  }, [template]);

  const callCustApi = async () => {
    const response = await dispatch(
      getCustomerByCustCode({ custCode: modalOpen[1].custCode })
    );

    setCustData(response.payload.data);
  };
  const callAssetApi = async () => {
    const response = await dispatch(
      getDFByAssetSerialNumber({
        assetSerialNumber: modalOpen[1].assetSerialNumber,
      })
    );

    if (response && response.payload && response.payload.data) {
      setAssetsData(response.payload.data);
    }
  };

  useEffect(() => {
    if (callApi) {
      callCustApi();
      callAssetApi();
    }
  }, [callApi]);

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  const gecustData = () => {
    if (assetsData) {
      var { custName, custCode, ...updatedAssetsData } = assetsData;
    }

    let combineObject = { ...custData, ...updatedAssetsData };

    let { _id, __v, ...newObj } = combineObject;

    const originalDate = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = originalDate.getDate().toString().padStart(2, "0");
    // const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const month = monthNames[originalDate.getMonth()];
    const year = originalDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;

    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    // Get the current date
    let currentDate = new Date();

    // Add 5 years to the current date
    currentDate.setFullYear(currentDate.getFullYear() + 5);

    // Format the dates
    const futureFormattedDate = formatDate(currentDate);

    let warrantyStart =
      assetsData &&
        assetsData.vendorWarrantyStart &&
        moment(assetsData.vendorWarrantyStart).format("DD/MM/YYYY") !==
        "Invalid date"
        ? moment(assetsData.vendorWarrantyStart).format("DD/MM/YYYY")
        : "";

    let warrantyEnd = "";
    assetsData &&
      assetsData.vendorWarrantyEnd &&
      assetsData.vendorWarrantyEnd !== undefined &&
      moment(assetsData.vendorWarrantyEnd).format("DD/MM/YYYY") !== "Invalid date"
      ? moment(assetsData.vendorWarrantyEnd).format("DD/MM/YYYY")
      : "";

    let startDate = formattedDate ? moment(formattedDate, "DD/MM/YYYY") : 1;
    let endDate = futureFormattedDate
      ? moment(futureFormattedDate, "DD/MM/YYYY")
      : 1;

    // Calculate the difference in months
    let monthsDiff = endDate.diff(startDate, "months");

    // Add 1 day in endDate
    const nextDay = endDate && endDate.add(1, "days");
    const resultDateString = nextDay.format("DD/MMM/YYYY");

    function isValidDate(dateString) {
      // Split the date string based on common delimiters
      let dateParts = dateString.split(/[./-]/);

      if (dateParts[2] >= 1 && dateParts[2] <= 99) {
        dateParts[2] = "20" + dateParts[2];
      } else {
        // Handle out of range input
        console.log("Year out of range");
      }

      return dateParts.join("/");
    }

    // let checkDate = isValidDate(assetsData.vendorWarrantyEnd);

    // Formatting invoice date
    const parsedDate =
      assetsData &&
        assetsData.invoiceDate &&
        assetsData.invoiceDate !== undefined
        ? moment(assetsData.invoiceDate, "DD/MM/YYYY").format("MM/DD/YYYY")
        : "";

    let oldDate = parsedDate;

    // Formatting parsedDate
    const givenDate = oldDate !== "" ? moment(oldDate, "MM/DD/YYYY") : "";

    let invoiceFutureFormattedDate =
      givenDate !== "" ? givenDate.add(5, "years") : "";

    return {
      ...newObj,
      Execution_Date: "Agreement generation Date",
      Legal_Entity: "Proprietor/ partnership",
      CIN: "",
      FSSAI_License: "",
      // Person_Name: "contact person name",
      Agreement_Period: `From: ${formattedDate} To: ${invoiceFutureFormattedDate
        ? moment(invoiceFutureFormattedDate).format("DD/MMM/YYYY")
        : ""
        } `,
      Agreement_End_Date_: futureFormattedDate ? futureFormattedDate : "",
      Warranty_Period:
        warrantyStart !== ""
          ? `From: ${warrantyStart} To: ${warrantyEnd} `
          : "",
      Deposit_Value: assetsData?.depositAmount / monthsDiff,
      Machine_Transfer_Date: resultDateString ? resultDateString : "",
    };
  };

  useEffect(() => {
    if (template) {
      setFindBase64(templates.find((value) => value._id == template));
    }
  }, [template]);

  const sendAgreementFunc = async () => {
    setLoading(true);
    const custId = custData;

    let finalData = {
      email: custId && custId.custEmailID,
      radioText,
      custId: custId && custId._id,
      template,
      assetsId: modalOpen[1]?.assetsId,
    };

    const response = await dispatch(
      sendAadharLinkViaOtp({ ...finalData, oldCustomerId })
    );

    if (response && response.payload && response.payload.success) {
      setModalOpen([false, null]);
      setLoading(false);
      setTemplate("");
      setFindBase64(null);
      toast(`${response.payload.message}`);
    }
  };

  const handleSubmit = async () => {
    sendAgreementFunc();
    setCallApi(false);
    return;
  };

  const handleClose = () => {
    setModalOpen(!modalOpen);
    setTemplate("");
    setFindBase64(null);
    setCallApi(false);
  };

  return (
    <>
      <Dialog open={modalOpen[0]} onClose={() => handleClose()} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            background: "#ce1042",
            color: "#fff"
          }}
        >
          AGREEMENT
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
            <FormControl sx={{ mt: 2, minWidth: 200 }}>
              <InputLabel htmlFor="max-width">Templates</InputLabel>
              <Select
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
              </Select>
            </FormControl>
            <ul className="mt-3">
              {findBase64 &&
                findBase64?.fields.map((field, i) => {
                  let showData = "";
                  showData = gecustData();

                  const replacementMap = {
                    "{Dealer_Name}": "{custName}",
                    "{Dealer_Code}": "{custCode}",
                    "{City}": "{city}",
                    "{Pin_Code}": "{pinCode}",
                    "{State}": "{stateName}",
                    "{PAN}": "{pan}",
                    "{Address}": "{custAddress}",
                    "{GSTN}": "{gst}",
                    "{Adhar_Number}": "{adhar}",
                    "{Model}": "{materialDescriptionHOCCO}",
                    "{Barcode_No}": "{barCode}",
                    "{Deposit_Rs}": "{depositAmount}",
                    "{Machine_Deployment}": "{installationDate}",
                    "{Payment_Ref_Number}": "{paymentRefNoInCaseOfOnlinePay}",
                    "{Cheque_No_}": "{chequeNumberInCaseOfChequePay}",
                    "{Cheque_Date}": "{chequeDateInCaseOfChequePay}",
                    "{Bank_Name}": "{chequeBankInCaseOfChequePay}",
                    "{Execution_Date}": "{Execution_Date}",
                    "{Legal_Entity}": "Legal_Entity",
                    "{CIN}": "CIN",
                    "{FSSAI_License}": "FSSAI_License",
                    "{Person_Name}": "{contactPersonName}",
                    "{Agreement_Period}": "Agreement_Period",
                    "{Agreement_End_Date_}": "Agreement_End_Date_",
                    "{Vendor_Sr_No}": "{assetSerialNumber}",
                    "{Warranty_Period}": "Warranty_Period",
                    "{Deposit_Value}": "Deposit_Value",
                    "{Machine_Transfer_Date}": "Machine_Transfer_Date",
                  };

                  let dbKey = replacementMap[field];

                  if (dbKey == "{Execution_Date}") {
                    const myDate = new Date();
                    const formattedDate = myDate.toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    });
                    return (
                      <li>
                        {field} = {formattedDate}
                      </li>
                    );
                  }

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
          <div className="d-flex justify-content-between">
            <FormControl className="mt-3">
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ color: "black", fontSize: "1.2rem" }}
              >
                Do you want the Rubber Stamp
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="no"
                name="radio-buttons-group"
                onChange={(e) => setRadioText(e.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio sx={{ color: "black", '&.Mui-checked': { color: "black" } }} />}
                  label="Yes"
                  sx={{ color: "black", fontSize: "1rem" }}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio sx={{ color: "black", '&.Mui-checked': { color: "black" } }} />}
                  label="No"
                  sx={{ color: "black", fontSize: "1rem" }}
                />
              </RadioGroup>
            </FormControl>
            <div style={{ borderRadius: "8px", boxShadow: "-4px 8px 10px -5px #cacaca, 4px 8px 10px -5px #cacaca", padding: "10px" }}>
              <img
                height={100}
                src="data:@file/png;base64,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"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={loading}
          >
            Send
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
    </>
  );
}
