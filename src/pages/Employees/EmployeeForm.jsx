import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchCompanyAutocomplete from "../../components/autocomplete/SearchCompanyAutocomplete";
import _ from "lodash";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { createEmployee, getEmployeeById, updateEmployee } from "../../features/EmployeeDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentLocation = useLocation()
    const { id: employeeId } = useParams()


    const { loading } = useSelector(state => state.employeeData)

    const [inputValue, setInputValue] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        empCode: "",
        phone: "",
        location: "",
        adhar: "",
        birth: "",
        designation: "",
        gender: "Male",
        salary: "",
        salaryPa: "",
        basicSalary: "",
        basicSalaryPa: "",
        allowances: "",
        allowancesPa: "",
        educationAllowance: "",
        educationAllowancePa: "",
        attendanceAllowance: "",
        attendanceAllowancePa: "",
        hra: "",
        hraPa: "",
        monthlyBonus: "",
        monthlyBonusPa: "",
        productionIncentive: "",
        productionIncentivePa: "",
        companyContribution: "",
        companyContributionPa: "",
        providentFund: "",
        providentFundPa: "",
        employeeStateInsuranceCorporation: "",
        employeeStateInsuranceCorporationPa: "",
        bonusExgratia: "",
        bonusExgratiaPa: "",
        variablePay: "",
        variablePayPa: "",
        totalCTC: "",
        totalCTCPa: "",
        residentialAddress: "",
        noticePeriod: ""
    });
    const [company, setCompany] = useState(null)
    const [cc, setCC] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!company) return "Company is required.";
        if (!formData.name.trim()) return "Name is required.";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "A valid email is required.";
        if (!formData.empCode.trim()) return "Employee code is required.";
        if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) return "A valid 10-digit phone number is required.";
        if (!formData.location.trim()) return "Location is required.";
        if (!formData.adhar.trim() || !/^\d{4}$/.test(formData.adhar)) return "A valid last 4-digit Aadhar number is required.";
        if (!formData.birth.trim()) return "Birth Year is required.";
        if (!formData.designation.trim()) return "Designation is required.";
        if (!formData.salary.trim() || isNaN(formData.salary)) return "Salary is required.";
        if (!formData.salaryPa.trim() || isNaN(formData.salaryPa)) return "Salary PA is required.";
        if (!formData.basicSalary.trim() || isNaN(formData.basicSalary)) return "Basic Salary is required.";
        if (!formData.basicSalaryPa.trim() || isNaN(formData.basicSalaryPa)) return "Basic Salary PA is required.";
        if (!formData.allowances.trim() || isNaN(formData.allowances)) return "Allowance is required.";
        if (!formData.allowancesPa.trim() || isNaN(formData.allowancesPa)) return "Allowance PA is required.";
        if (!formData.educationAllowance.trim() || isNaN(formData.educationAllowance)) return "Education Allowance is required.";
        if (!formData.educationAllowancePa.trim() || isNaN(formData.educationAllowancePa)) return "Education Allowance PA is required.";
        if (!formData.attendanceAllowance.trim() || isNaN(formData.attendanceAllowance)) return "Attendance Allowance is required.";
        if (!formData.attendanceAllowancePa.trim() || isNaN(formData.attendanceAllowancePa)) return "Attendance Allowance PA is required.";
        if (!formData.hra.trim() || isNaN(formData.hra)) return "Hra is required.";
        if (!formData.hraPa.trim() || isNaN(formData.hraPa)) return "Hra PA is required.";
        if (!formData.monthlyBonus.trim() || isNaN(formData.monthlyBonus)) return "Monthly Bonus is required.";
        if (!formData.monthlyBonusPa.trim() || isNaN(formData.monthlyBonusPa)) return "Monthly Bonus PA is required.";
        if (!formData.productionIncentive.trim() || isNaN(formData.productionIncentive)) return "Production Incentive is required.";
        if (!formData.productionIncentivePa.trim() || isNaN(formData.productionIncentivePa)) return "Production Incentive PA is required.";
        if (!formData.companyContribution.trim() || isNaN(formData.companyContribution)) return "Company Contribution is required.";
        if (!formData.companyContributionPa.trim() || isNaN(formData.companyContributionPa)) return "Company Contribution PA is required.";
        if (!formData.providentFund.trim() || isNaN(formData.providentFund)) return "Provident Fund is required.";
        if (!formData.providentFundPa.trim() || isNaN(formData.providentFundPa)) return "Provident Fund PA is required.";
        if (!formData.employeeStateInsuranceCorporation.trim() || isNaN(formData.employeeStateInsuranceCorporation)) return "Employee State Insurance Corporation is required.";
        if (!formData.employeeStateInsuranceCorporationPa.trim() || isNaN(formData.employeeStateInsuranceCorporationPa)) return "Employee State Insurance Corporation PA is required.";
        if (!formData.bonusExgratia.trim() || isNaN(formData.bonusExgratia)) return "Bonus Exgratia is required.";
        if (!formData.bonusExgratiaPa.trim() || isNaN(formData.bonusExgratiaPa)) return "Bonus Exgratia PA is required.";
        if (!formData.variablePay.trim() || isNaN(formData.variablePay)) return "Variable Pay is required.";
        if (!formData.variablePayPa.trim() || isNaN(formData.variablePayPa)) return "Variable Pay PA is required.";
        if (!formData.totalCTC.trim() || isNaN(formData.totalCTC)) return "Total CTC is required.";
        if (!formData.totalCTCPa.trim() || isNaN(formData.totalCTCPa)) return "Total CTC PA is required.";
        if (!formData.residentialAddress.trim()) return "Residential address is required.";
        if (!formData.noticePeriod.trim()) return "Notice period is required.";

        return null;
    };

    const handleSubmit = async () => {
        const errorMessage = validateForm();
        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }

        let finalData = {
            ...formData,
            company: company && company.value,
            cc: cc
        }

        const response = await dispatch(currentLocation.pathname.includes("add") ? createEmployee(finalData) : (updateEmployee({ ...finalData, id: employeeId })))

        if (response && response.type == "createEmployee/rejected") {
            return toast(response.payload.response.data.message)
        }


        if (response && response.payload && !response.payload.error) {
            toast(response.payload.message);
            setFormData({})
            setCompany(null)
            navigate("/employees")
        }
    };

    useEffect(() => {

        const callEmployee = async () => {
            let response = await dispatch(getEmployeeById({ id: employeeId }))

            if (response && response.type == "getEmployeeById/fulfilled") {
                setFormData(response && response.payload && response.payload.data)
                setCompany(response && response.payload && response.payload.data && response.payload.data.company)

                if (response && response.payload && response.payload.data && response.payload.data.cc) {
                    setCC(response && response.payload && response.payload.data && response.payload.data.cc)
                }
            }

        }

        if (currentLocation.pathname.includes("edit")) {
            callEmployee()
        }
    }, [currentLocation, employeeId])

    return (
        <div className="home-content">
            <div className="teamMainBox">
                <div className="card m-3 p-3">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <SearchCompanyAutocomplete inputValue={inputValue} setInputValue={setInputValue} company={company} setCompany={setCompany} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.name}
                                className="col-12"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.email}
                                className="col-12"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Emp. Code"
                                name="empCode"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.empCode}
                                className="col-12"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Phone"
                                name="phone"
                                type="number"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.phone}
                                className="col-12"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                name="cc"
                                freeSolo
                                multiple
                                options={[]}
                                onChange={(event, newValue) => setCC(newValue)}
                                renderInput={(params) => <TextField {...params} label="CC" />}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Location"
                                name="location"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.location}
                                className="col-12"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Adhar (Last 4 digits)"
                                name="adhar"
                                type="text"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.adhar}
                                className="col-12"
                                inputProps={{
                                    maxLength: 4,
                                    inputMode: "numeric",
                                    pattern: "[0-9]*"
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Birth Year"
                                name="birth"
                                type="number"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.birth}
                                className="col-12"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Designation"
                                name="designation"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.designation}
                                className="col-12"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <Form.Label>Gender</Form.Label>
                                <RadioGroup
                                    name="gender"
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    sx={{ display: "flex", flexDirection: "row" }}
                                    onChange={handleChange}
                                    value={formData.gender}
                                >
                                    <FormControlLabel
                                        value="Male"
                                        control={
                                            <Radio
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: "black",
                                                    },
                                                }}
                                            />
                                        }
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="Female"
                                        control={
                                            <Radio
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: "black",
                                                    },
                                                }}
                                            />
                                        }
                                        label="Female"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <div className="p-3">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography variant="h5">Salary Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Salary"
                                        name="salary"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.salary}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Salary PA"
                                        name="salaryPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.salaryPa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Basic Salary"
                                        name="basicSalary"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.basicSalary}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Basic Salary PA"
                                        name="basicSalaryPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.basicSalaryPa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Allowance"
                                        name="allowances"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.allowances}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Allowance PA"
                                        name="allowancesPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.allowancesPa}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Education Allowance"
                                        name="educationAllowance"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.educationAllowance}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Education Allowance PA"
                                        name="educationAllowancePa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.educationAllowancePa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Attendance Allowance"
                                        variant="outlined"
                                        name="attendanceAllowance"
                                        onChange={handleChange}
                                        value={formData.attendanceAllowance}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Attendance Allowance PA"
                                        name="attendanceAllowancePa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.attendanceAllowancePa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Hra"
                                        name="hra"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.hra}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Hra PA"
                                        name="hraPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.hraPa}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Monthly Bonus"
                                        name="monthlyBonus"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.monthlyBonus}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Monthly Bonus PA"
                                        name="monthlyBonusPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.monthlyBonusPa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Production Incentive"
                                        name="productionIncentive"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.productionIncentive}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Production Incentive PA"
                                        name="productionIncentivePa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.productionIncentivePa}
                                        className="col-12"
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Company Contribution"
                                        name="companyContribution"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.companyContribution}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Company Contribution PA"
                                        name="companyContributionPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.companyContributionPa}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Provident Fund"
                                        name="providentFund"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.providentFund}
                                        className="col-12"
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Provident Fund PA"
                                        name="providentFundPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.providentFundPa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Employee State Insurance Corporation"
                                        name="employeeStateInsuranceCorporation"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.employeeStateInsuranceCorporation}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Employee State Insurance Corporation PA"
                                        name="employeeStateInsuranceCorporationPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.employeeStateInsuranceCorporationPa}
                                        className="col-12"
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Bonus Exgratia"
                                        name="bonusExgratia"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.bonusExgratia}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Bonus Exgratia PA"
                                        name="bonusExgratiaPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.bonusExgratiaPa}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Variable Pay"
                                        name="variablePay"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.variablePay}
                                        className="col-12"
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Variable Pay PA"
                                        name="variablePayPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.variablePayPa}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Total CTC"
                                        name="totalCTC"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.totalCTC}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Total CTC PA"
                                        name="totalCTCPa"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.totalCTCPa}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className="p-3">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography variant="h5">Additional Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Residental Address"
                                        name="residentialAddress"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.residentialAddress}
                                        className="col-12"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Notice Period"
                                        name="noticePeriod"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={formData.noticePeriod}
                                        className="col-12"
                                    />
                                </Grid>
                            </Grid>
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
                        onClick={() => navigate("/employees")}
                    >
                        Close
                    </Button>


                    <LoadingButton
                        variant="contained"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Save
                    </LoadingButton>
                </div>

            </div>
        </div>
    );
};

export default EmployeeForm;
