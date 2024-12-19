import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Autocomplete, LoadingButton } from "@mui/lab";
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { getCompanies } from "../features/CompanyDetailSlice";
import _ from "lodash";
import { createEmployee, getEmployeesById, updateEmployee } from "../features/EmployeeDetailSlice";
import { toast } from "react-toastify";

const AddEmployee = ({ open, setOpen, callApi, operationMode, setOperationMode, employeeId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        empCode: "",
        email: "",
        phone: "",
        adhar: "",
        birth: "",
        location: "",
        gender: "Male"
    });
    const [companyOptions, setCompanyOptions] = useState([])
    const [inputValue, setInputValue] = useState("");
    const [company, setCompany] = useState(null)
    const [cc, setCC] = useState([])

    const handleClose = () => {
        setOpen(false)
        setOperationMode("add")
        setFormData({
            name: "",
            empCode: "",
            email: "",
            phone: "",
            adhar: "",
            birth: "",
            location: "",
            gender: "Male"
        })
        setCompany(null)
        setCC([])
    }

    useEffect(() => {
        const callEmployee = async () => {
            let response = await dispatch(getEmployeesById({ id: employeeId }))

            console.log(response.payload.data.cc, "response.payload.data.cc==========")

            if (response && response.type == "getEmployeesById/fulfilled") {
                setFormData({
                    name: response && response.payload && response.payload.data && response.payload.data.name,
                    empCode: response && response.payload && response.payload.data && response.payload.data.empCode,
                    email: response && response.payload && response.payload.data && response.payload.data.email,
                    phone: response && response.payload && response.payload.data && response.payload.data.phone,
                    adhar: response && response.payload && response.payload.data && response.payload.data.adhar,
                    birth: response && response.payload && response.payload.data && response.payload.data.birth,
                    location: response && response.payload && response.payload.data && response.payload.data.location,
                    gender: response && response.payload && response.payload.data && response.payload.data.gender,
                })
                setCompany(response && response.payload && response.payload.data && response.payload.data.company)

                if (response && response.payload && response.payload.data && response.payload.data.cc) {
                    setCC(response && response.payload && response.payload.data && response.payload.data.cc)
                }
            }

        }

        if (operationMode == "edit" && employeeId !== "") {
            callEmployee()
        }

    }, [operationMode, employeeId])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const requiredFields = [
        { field: 'name', message: 'Please enter a name' },
        { field: 'empCode', message: 'Please enter an employee code' },
        { field: 'email', message: 'Please enter an email' },
        { field: 'phone', message: 'Please enter a valid phone number' },
        { field: 'location', message: 'Please enter a location' },
        { field: 'adhar', message: 'Please enter last 4 digits of Aadhar' },
        { field: 'birth', message: 'Please enter birth year' }
    ];

    const handleSubmit = async () => {

        if (!company) {
            return toast.error("Please select a company");
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            return toast.error("Please enter a valid 10-digit phone number");
        }

        // Loop through each required field and check if it's missing
        for (const { field, message } of requiredFields) {
            if (!formData[field]) {
                return toast.error(message);
            }
        }

        let finalData = {
            ...formData,
            company: company && company.value || "",
            cc: cc
        };

        const response = await dispatch(operationMode == "add" ? createEmployee(finalData) : updateEmployee({ ...finalData, _id: employeeId }));

        if (response && response.type == "createEmployee/rejected") {
            return toast(response.payload.response.data.message)
        }

        if (response && response.payload && !response.payload.error) {
            toast(response.payload.message);
            callApi()
            setFormData({
                name: "",
                empCode: "",
                email: "",
                phone: "",
                adhar: "",
                birth: "",
                location: "",
                gender: "Male"
            })
            setCompany(null)
            setCC([])
        }

        setOpen(false);
        setOperationMode("add")
    };

    const companiesFetchOptions = useMemo(
        () =>
            _.debounce(async (query) => {
                try {
                    const response = await dispatch(getCompanies({ search: query }));

                    setCompanyOptions(
                        response &&
                        response.payload &&
                        response.payload.data.map((item) => ({
                            label: item.name,
                            value: item?._id,
                        }))
                    );
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }, 1000),
        []
    );

    useEffect(() => {
        companiesFetchOptions(inputValue);
    }, [inputValue]);

    return (
        <>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{operationMode == "add" ? "Add" : "Edit"} Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="mt-2">Company</Form.Label>
                            <Autocomplete
                                disablePortal
                                value={company}
                                options={companyOptions}
                                renderInput={(params) => <TextField {...params} />}
                                size="small"
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                onChange={(e, newValue) => {
                                    if (newValue) {
                                        setCompany(newValue);
                                    } else {
                                        setCompany(null);
                                    }
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Employee Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="empCode"
                                value={formData.empCode}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">CC</Form.Label>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                multiple
                                options={[]}
                                size="small"
                                value={cc}
                                onChange={(e, newValue) => {
                                    if (newValue) {
                                        setCC(newValue);
                                    } else {
                                        setCC([]);
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Phone</Form.Label>
                            <Form.Control
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Adhar (Last 4 Digit)</Form.Label>
                            <Form.Control
                                type="number"
                                name="adhar"
                                value={formData.adhar}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mt-2">Birth Year</Form.Label>
                            <Form.Control
                                type="number"
                                name="birth"
                                value={formData.birth}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <FormControl>
                            <Form.Label className="mt-2">Gender</Form.Label>
                            <RadioGroup
                                name="gender"
                                aria-labelledby="demo-radio-buttons-group-label"
                                sx={{ display: "flex", flexDirection: "row" }}
                                onChange={handleChange}
                                value={formData.gender}
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddEmployee;