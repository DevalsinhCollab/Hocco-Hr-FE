import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Autocomplete, TextField } from "@mui/material";
import { appTypes } from "../../utils/utils";
import { switchCompany } from "../../features/authDetailsSlice";
import { toast } from "react-toastify";

export default function SwitchCompany(props) {
    const { open, setOpen, setCurrentApp } = props;
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.authData);

    const [app, setApp] = useState("");

    const handleSubmit = async () => {

        let finalData = {
            id: auth && auth._id,
            userType: app && app.value
        }

        let response = await dispatch(switchCompany(finalData))

        if (response && response.payload && response.payload.message) {
            toast.success(response.payload.message)
        }

        setOpen(false)
        window.location.reload();
    };

    const handleClose = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (auth && auth.userType) {
            let currentCompany = appTypes.find(item => item.value == auth.userType)

            setApp(currentCompany)
            setCurrentApp(currentCompany)
        }
    }, [auth])

    return (
        <Dialog open={open} onClose={() => handleClose()} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    background: "#ce1042",
                    color: "#fff"
                }}
            >
                SWITCH COMPANY
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
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        sx={{ marginTop: "1rem" }}
                        value={app}
                        options={appTypes}
                        onChange={(e, newValue) => setApp(newValue)}
                        renderInput={(params) => <TextField {...params} label="Select Company" />}
                        componentsProps={{
                            paper: {
                                sx: {
                                    "& .MuiAutocomplete-option": {
                                        borderBottom: "1px solid #e7e7e7",
                                        padding: "8px 16px",
                                    },
                                    "& .MuiAutocomplete-option:last-child": {
                                        borderBottom: "none",
                                    },
                                },
                            },
                        }}
                    />

                </Box>
            </DialogContent>
            <DialogActions sx={{ marginTop: "4rem" }}>
                <LoadingButton
                    onClick={handleSubmit}
                    variant="contained"
                >
                    Ok
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
    );
}
