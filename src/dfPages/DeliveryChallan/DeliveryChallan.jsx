import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createdeliverychallan } from "../../features/DelieverychallanSlice";
import { useEffect } from "react";
import "./DeliveryChallan.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchCustomerAutocomplete from "../../components/autocomplete/SearchCustomerAutocomplete";
import { getCustomerByCustCode } from "../../features/customerDetailSlice";
import {
  getDFByAssetSerialNumber,
  getDFByCustCode,
} from "../../features/dfMasterSlice";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const DeliveryChallan = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers } = useSelector((state) => state.customerData);
  const { auth } = useSelector((state) => state.authData);
  const { dfMaster } = useSelector((state) => state.dfMaster);
  const { t } = useTranslation();

  const [sFieldIds, setSFieldIds] = useState([]);
  const [inputs, setInputs] = useState({
    transportmode: "Road",
    shippingFrom: "godown",
    shippingCustAdd: `Survey No. 410, Sahyog Motor Compound, Behind GB Shah College, Nr Vasana AEC Sub Station, Vasana Ahmedabad 380007`,
    reasonfortransport: "Supply",
    transporternametype: "C",
  });

  const [fields, setFields] = useState([
    {
      id: 0,
      qty: 1,
      assetSerialNumber: "",
      barCode: "",
    },
  ]);

  const [itemOptions, setItemOptions] = useState([]);

  const [inputValueOne, setInputValueOne] = useState("");
  const [customerOne, setCustomerOne] = useState(null);
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [customerTwo, setCustomerTwo] = useState(null);

  useEffect(() => {
    if (inputs && inputs.shippingFrom === "godown") {
      let itemArray = dfMaster?.filter((item) => item.custCode == "");

      setItemOptions(
        itemArray.map((df) => ({
          label: df.assetSerialNumber,
          value: df._id,
        }))
      );
    }
  }, [inputs, dfMaster]);

  useEffect(() => {
    if (fields.length > 1) {
      let fieldArr = [];
      fields.forEach((element) => {
        fieldArr.push(element.itemId);
      });
      setSFieldIds(fieldArr);
    }
  }, [fields]);

  const handleAddField = () => {
    const newFields = [...fields];
    newFields.push({ id: newFields.length, qty: 1 });
    setFields(newFields);
  };

  const handleRemoveField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  const handleInputChange = async (id, name, value) => {
    const updatedFields = await Promise.all(
      fields.map(async (field) => {
        if (field.id === id) {
          let checkRate;
          if (name == "assSN") {
            let showData;

            let response = await dispatch(
              getDFByAssetSerialNumber({ assetSerialNumber: value })
            );

            if (response && response.payload && response.payload.data) {
              showData = response.payload.data;
            }

            if (
              showData &&
              showData.materialDescriptionVendor &&
              showData.materialDescriptionVendor.includes("Blue Star")
            ) {
              field["hsn"] = "84183010";
            } else {
              field["hsn"] = "84186990";
            }

            if (inputs.gstin || inputs.placeofsupply) {
              if (inputs.gstin && inputs.gstin !== "URP") {
                if (inputs.gstin.slice(0, 2) == "24") {
                  checkRate = 9;
                } else {
                  checkRate = 18;
                }
              } else {
                if (inputs.placeofsupply.toLowerCase() == "gujarat") {
                  checkRate = 9;
                } else {
                  checkRate = 18;
                }
              }
            }

            field["itemId"] = showData && showData._id;
            field["assetSerialNumber"] = showData && showData.assetSerialNumber;
            field["barCode"] = showData && showData.barCode;
            field["materialDescriptionHOCCO"] =
              showData && showData.materialDescriptionHOCCO;
            field["materialDescriptionVendor"] =
              showData && showData.materialDescriptionVendor;
            field["bookValue"] = showData && showData.bookValue;
            field["taxableAmount"] = showData && showData.purchaseValueHOCCO;

            if (checkRate == 9) {
              field["CGSTRate"] = checkRate;
              field["SGSTRate"] = checkRate;

              field["CGSTAmount"] =
                showData && showData?.purchaseValueHOCCO
                  ? (Number(showData?.purchaseValueHOCCO) * Number(checkRate)) /
                  100
                  : 0;
              field["SGSTAmount"] =
                showData && showData?.purchaseValueHOCCO
                  ? (Number(showData?.purchaseValueHOCCO) * Number(checkRate)) /
                  100
                  : 0;

              field["IGSTRate"] = 0;
              field["IGSTAmount"] = 0;
            } else {
              field["CGSTRate"] = 0;
              field["SGSTRate"] = 0;

              field["CGSTAmount"] = 0;
              field["SGSTAmount"] = 0;

              field["IGSTRate"] = checkRate;
              field["IGSTAmount"] =
                showData && showData.purchaseValueHOCCO
                  ? (Number(showData.purchaseValueHOCCO) * Number(checkRate)) /
                  100
                  : 0;
            }
          }
        }

        return field;
      })
    );

    setFields(updatedFields);
  };

  useEffect(() => {
    async function getCustomer() {
      let response = await dispatch(
        getDFByCustCode({ custCode: customerTwo.custCode })
      );

      let response2 = await dispatch(
        getCustomerByCustCode({ custCode: customerTwo.custCode })
      );

      let custData = response2 && response2.payload && response2.payload.data;

      if (response && response.payload && response.payload.data) {
        setItemOptions(
          response.payload.data.map((df) => ({
            label: df.assetSerialNumber,
            value: df._id,
          }))
        );

        setInputs((values) => ({
          ...values,
          shippingCustAdd:
            custData.addressDescription +
            "," +
            custData.city +
            "," +
            custData.stateName +
            "," +
            custData.pinCode,
          customername: custData.custName,
        }));
      }
    }

    if (customerTwo) {
      getCustomer();
    }
  }, [customerTwo]);

  const handleShippingAdd = (e, value) => {
    if (value && value.id && value !== null) {
      let showData = customers.filter((data) => data._id == value.id)[0];
      setInputs((values) => ({
        ...values,
        shippingCustAdd:
          showData.addressDescription +
          "," +
          showData.city +
          "," +
          showData.stateName +
          "," +
          showData.pinCode,
      }));

      let itemArray = dfMaster?.filter(
        (item) => item.custCode == showData.custCode
      );

      setItemOptions(
        itemArray.map((df) => ({
          label: df.assetSerialNumber,
          value: df._id,
        }))
      );
    } else {
      setItemOptions([]);
      setFields([
        {
          id: 0,
          qty: 1,
          assSN: "",
          assetSerialNumber: "",
          barCode: "",
          itemId: "",
          hsn: "",
          bookValue: "",
          taxableAmount: "",
          CGSTRate: "",
          CGSTAmount: "",
          SGSTRate: "",
          SGSTAmount: "",
          IGSTRate: "",
          IGSTAmount: "",
        },
      ]);
    }

    // setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "shippingFrom" && value == "godown") {
      setInputs((values) => ({
        ...values,
        shippingCustAdd: `Survey No. 410, Sahyog Motor Compound, Behind GB Shah College, Nr Vasana AEC Sub Station, Vasana Ahmedabad 380007`,
      }));
    }

    if (name === "vehiclenumber") {
      setInputs((values) => ({ ...values, [name]: value.toUpperCase() }));
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    let checkVN = validateVehicleNumber(inputs.vehiclenumber);
    if (!inputs.customername) {
      return toast("Please select customer");
    }
    if (!inputs.vehiclenumber) {
      return toast("Please enter vehicle number");
    } else if (!checkVN) {
      return toast("Invalid vehicle number. Example : XX00XX0000");
    }
    if (!inputs.approxDistance) {
      return toast("Please enter approx distance");
    }

    if (fields && fields[0] && !fields[0].itemId) {
      return toast("Please select the asset");
    }

    const response = await dispatch(
      createdeliverychallan([
        {
          ...inputs,
          initialgeneratedby: auth?.email,
          generatedby: auth?._id,
          customerFrom: customerTwo.value || "",
          customerTo: customerOne.value,
        },
        fields,
      ])
    );
    if (response.type.includes("fulfilled")) {
      navigate("/deliverychallan");
    }
  };

  const validateVehicleNumber = (vehicleNumber) => {
    const regexPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return regexPattern.test(vehicleNumber);
  };

  return (
    <div className="home-content" style={{ paddingTop: "100px" }}>
      <div className="mb-4">
        <div className="mx-3 p-3">
          <Accordion style={{ border: "2px solid #ffe7eb", borderRadius: "8px", boxShadow: " 0 0 10px 5px #f7f3f4" }} defaultExpanded>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Delivery Challan</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Form>
                <div className="row col-12 d-flex justify-content-end mb-4">
                  <SearchCustomerAutocomplete
                    setCustomer={setCustomerOne}
                    customer={customerOne}
                    setInputValue={setInputValueOne}
                    inputValue={inputValueOne}
                    label="Select Customer"
                  />
                </div>

                <div className="row col-12 d-flex justify-content-center">

                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Customer Name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="customername"
                      value={inputs ? inputs.customername : ""}
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("GSTIN")} </Form.Label>
                    <Form.Control
                      type="text"
                      name="gstin"
                      value={
                        inputs && inputs.gstin != "" && inputs.gstin != null
                          ? inputs.gstin
                          : "URP"
                      }
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Delivery Challan number")}:</Form.Label>
                    <Form.Control type="number" disabled />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Delivery Challan date")}: </Form.Label>
                    <Form.Control
                      type="Date"
                      name="challandate"
                      value={new Date().toISOString().split("T")[0]}
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Transport Mode")}: </Form.Label>
                    <select
                      className="form-select"
                      name="transportmode"
                      onChange={handleChange}
                    >
                      <option selected value="Road">
                        By Road
                      </option>
                      <option value="Air">By Air</option>
                      <option value="Water">By Water</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Vehicle number")}: </Form.Label>
                    <Form.Control
                      maxLength={10}
                      type="text"
                      name="vehiclenumber"
                      value={inputs.vehiclenumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Transport Date")}: </Form.Label>
                    <Form.Control
                      type="Date"
                      name="transportdate"
                      value={new Date().toISOString().split("T")[0]}
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Place of supply")}:</Form.Label>
                    <Form.Control
                      type="text"
                      name="placeofsupply"
                      value={inputs.placeofsupply}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Approx Distance (KM)")}: </Form.Label>
                    <Form.Control
                      type="text"
                      name="approxDistance"
                      value={inputs.approxDistance}
                      className="form-control"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Transporter Name Type")}:</Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        inline
                        label="Company"
                        name="transporternametype"
                        type="radio"
                        id="inline-radio-1"
                        value="C"
                        checked
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Person"
                        name="transporternametype"
                        type="radio"
                        id="inline-radio-1"
                        value="P"
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Transporter Name")}:</Form.Label>
                    <Form.Control
                      type="text"
                      name="transportername"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-3">
                    <Form.Label>{t("Reason For Transport")}: </Form.Label>
                    <select
                      className="form-select"
                      name="reasonfortransport"
                      onChange={handleChange}
                    >
                      <option selected value="Supply">
                        Supply
                      </option>
                      <option value="Export">Export</option>
                      <option value="Import">Import</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Sales">Sales</option>
                      <option value="Exhibition">Exhibition</option>
                    </select>
                  </Form.Group>

                  <Form.Group className="mb-3 col-12">
                    <Form.Label>{t("Customer Address")}: </Form.Label>
                    <textarea
                      type="text"
                      name="address"
                      value={inputs.address}
                      className="form-control"
                      onChange={handleChange}
                    ></textarea>
                  </Form.Group>
                </div>
              </Form>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{ border: "2px solid #ffe7eb", borderRadius: "8px", boxShadow: " 0 0 10px 5px #f7f3f4", marginTop: "1rem" }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Shipping Form</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Form>
                <div className="d-flex">
                  <Form.Group className="mb-3 col-6">
                    <Form.Label>{t("Shipping From")}: </Form.Label>
                    <div>
                      <input
                        type="radio"
                        name="shippingFrom"
                        className="me-2"
                        value={"godown"}
                        checked={inputs.shippingFrom == "godown" ? true : false}
                        onChange={handleChange}
                      />
                      <label>{t("Godown")}</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="shippingFrom"
                        className="me-2"
                        value={"customer"}
                        checked={inputs.shippingFrom == "customer" ? true : false}
                        onChange={handleChange}
                      />
                      <label>{t("Customer")}</label>
                    </div>
                  </Form.Group>
                  {inputs.shippingFrom == "customer" ? (
                    <Form.Group className="mb-3 col-6">
                      <Form.Label>{t("Shipping From")}: </Form.Label>
                      <SearchCustomerAutocomplete
                        setCustomer={setCustomerTwo}
                        customer={customerTwo}
                        setInputValue={setInputValueTwo}
                        inputValue={inputValueTwo}
                        label="Select Customer"
                      />

                      {/* <Autocomplete
                      disablePortal
                      options={custOptions}
                      sx={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Customer"
                          className="form-select"
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleShippingAdd(e, newValue);
                      }}
                    /> */}

                      {/* <select
                      className="form-select"
                      name="shippingCustId"
                      onChange={handleShippingAdd}
                    >
                      <option>--- Select Customer ---</option>
                      {customers.map((data) =>
                        data._id !== sCustId ? (
                          <option value={data._id} key={data._id}>
                            {data.custCode}-{data.custName}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                    </select> */}
                    </Form.Group>
                  ) : (
                    ""
                  )}
                </div>
                <Form.Group className="mb-3 col-12">
                  <Form.Label>
                    {t("Shipping From ( Customer Address )")}:{" "}
                  </Form.Label>
                  <textarea
                    type="text"
                    name="shippingCustAdd"
                    value={inputs.shippingCustAdd}
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                </Form.Group>
              </Form>

              {fields.map((field, index) => (
                <Grid container sx={{ border: "1px solid #c5c5c5", padding: "0rem 1rem 1rem 1.5rem", marginTop: "1rem", borderRadius: "10px" }}>
                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <Autocomplete
                      disablePortal
                      options={itemOptions}
                      filterSelectedOptions
                      sx={{
                        width: {
                          xs: "13.3rem",
                          sm: "11rem",
                          md: "14rem",
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                      onChange={(e, newValue) => {
                        handleInputChange(field.id, "assSN", newValue.label);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="HSN code"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["hsn"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="Quantity"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["qty"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="Rate per nos"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["bookValue"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="Taxable Amount"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["taxableAmount"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="CGST Rate"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["CGSTRate"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="CGST Amount"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["CGSTAmount"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="SGST Rate"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["SGSTRate"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="SGST Amount"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["SGSTAmount"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="IGST Rate"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["IGSTRate"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="IGST Amount"
                      variant="outlined"
                      value={fields && fields[field.id] ? fields[field.id]["IGSTAmount"] : ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2} sx={{ marginTop: "1.5rem" }}>
                    <AddCircleIcon sx={{ color: "#007c1b", fontSize: "2.5rem", cursor: "pointer" }} onClick={handleAddField} />
                    {index > 0 && (
                      <RemoveCircleIcon sx={{ color: "#a30000", fontSize: "2.5rem", cursor: "pointer" }} onClick={() => handleRemoveField(index)} />
                    )}
                  </Grid>
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>

          <div className="d-flex justify-content-end">
            <Button
              className="button m-2"
              variant="primary"
              onClick={handleSubmit}
              style={{ background: "#0058aa", color: "#fff" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChallan;
