import { useEffect, useState } from "react";
import _ from "lodash";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomerDetail from "/Images/CustomerDetail.png"
import DeleteIcon from '@mui/icons-material/Delete';
import { getCustomerById } from "../../features/customerDetailSlice";

const CustomerDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id: customerId } = useParams()

    const [customer, setCustomer] = useState({})

    useEffect(() => {
        const callCustomer = async () => {
            let response = await dispatch(getCustomerById({ id: customerId }))

            if (response && response.type == "getCustomerById/fulfilled") {
                setCustomer(response.payload.data)
            }
        }

        callCustomer()
    }, [customerId])

    return (
        <div className="home-content">
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", marginLeft: "1rem" }}>
                <div style={{ display: "flex" }}>
                    <div
                        style={{ borderRadius: "999px", background: "#c70d3e", width: "2.5rem", display: "flex", justifyContent: "center", alignContent: "center" }}
                    >
                        <img
                            src={CustomerDetail}
                            alt="User"
                            style={{ width: "1rem", height: "1.5rem", marginTop: "0.5rem" }}
                        />
                    </div>

                    <Typography variant="h4" sx={{ marginLeft: "1rem" }}>{customer && customer.custName}</Typography>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="outlined"
                        sx={{ fontWeight: "bold", border: "2px solid", color: "#c20b3b", marginRight: "1rem" }}
                    >
                        <DeleteIcon sx={{ marginRight: "0.5rem" }} /> Delete
                    </Button>
                </div>
            </Box>

            <div>
                <div className="p-3">
                    <Accordion style={{ border: "2px solid #ffe7eb", borderRadius: "8px", boxShadow: " 0 0 10px 5px #f7f3f4" }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Customer Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Customer Name:</strong> {customer && customer.custName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Country:</strong> {customer && customer.country || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Birth Year:</strong> {customer && customer.birthYear || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Customer Address:</strong> {customer && customer.custAddress || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Customer Email ID:</strong> {customer && customer.custEmailID || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Gender:</strong> {customer && customer.gender || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>City:</strong> {customer && customer.city || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Aadhar No.:</strong> {customer && customer.adhar || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>GST No.:</strong> {customer && customer.gst || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Zone:</strong> {customer && customer.zone || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Pan No.:</strong> {customer && customer.pan || " -"}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className="p-3" >
                    <Accordion style={{ border: "2px solid #ffe7eb", borderRadius: "8px", boxShadow: " 0 0 10px 5px #f7f3f4" }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Warehouse Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Wholesaler Code:</strong> {customer && customer.custCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>First Billing Date:</strong> {customer && customer.firstBillingDate || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Status:</strong> {customer && customer.status || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Wholesaler Name:</strong> {customer && customer.custName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Contact Person Mobile:</strong> {customer && customer.contactPersonMobile || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>SD Code:</strong> {customer && customer.sdCode || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Site:</strong> {customer && customer.site || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Channel Code:</strong> {customer && customer.channelCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>SD Name:</strong> {customer && customer.sdName || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Warehouse:</strong> {customer && customer.warehouse || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Channel Name:</strong> {customer && customer.channelName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Address Description:</strong> {customer && customer.addressDescription || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Price Group:</strong> {customer && customer.priceGroup || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Sub Channel Code:</strong> {customer && customer.subChannelCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Created Date:</strong> {customer && customer.createdAt || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Sales Group:</strong> {customer && customer.salesGroup || " -"}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className="p-3">
                    <Accordion style={{ border: "2px solid #ffe7eb", borderRadius: "8px", boxShadow: " 0 0 10px 5px #f7f3f4" }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Other Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Code Creation Emp Code:</strong> {customer && customer.codeCreationEmpCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>TSM V.S.E Name:</strong> {customer && customer.tsmVSEName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Kam Name:</strong> {customer && customer.kamName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>RGM Code:</strong> {customer && customer.rgmCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>PSR. 1 Code:</strong> {customer && customer.psr1Code || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Kae Code:</strong> {customer && customer.kaeCode || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>RGM Name:</strong> {customer && customer.rgmName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>PSR. 1 Name:</strong> {customer && customer.psr1Name || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Kae Name:</strong> {customer && customer.kaeName || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>ZM R.S.M Code:</strong> {customer && customer.zmRSMCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>PSR. 2 Code:</strong> {customer && customer.psr2Code || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Created At:</strong> {customer && customer.createdAt || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>ZM R.S.M Name:</strong> {customer && customer.zmRSMName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>PSR. 2 Name:</strong> {customer && customer.psr2Name || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Update At:</strong> {customer && customer.updatedAt || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>ASM Code:</strong> {customer && customer.asmCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>National Head Code:</strong> {customer && customer.nationalHeadCode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>ASM Email:</strong> {customer && customer.asmEmail || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>ASM Name:</strong> {customer && customer.asmName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>National Head Name:</strong> {customer && customer.nationalHeadName || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>TSM V.S.E Email:</strong> {customer && customer.tsmVSEEmail || " -"}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>TSM V.S.E Code:</strong> {customer && customer.tsmVSECode || " -"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography><strong>Kam Code:</strong> {customer && customer.kamCode || " -"}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className="p-3 d-flex gap-2 align-items-end justify-content-end w-100">
                    <Button
                        variant="contained"
                        sx={{
                            color: "#fff",
                            fontWeight: "bold",
                            background: "#c20b3b",
                            "&:hover": {
                                background: "transparent",
                                color: "#c20b3b",
                                border: "1px solid #c20b3b",
                            },
                        }}
                        onClick={() => navigate("/customers")}
                    >
                        Back
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default CustomerDetails;
