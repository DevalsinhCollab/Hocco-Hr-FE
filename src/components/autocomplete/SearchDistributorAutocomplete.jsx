import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { searchDistributors } from "../../features/DistributorSlice";

const SearchDistributorAutocomplete = (props) => {
    const { inputValue, setInputValue, setCustomer, customer, label, width, sx, docType } =
        props;

    const dispatch = useDispatch();

    const [disOptions, setDisOptions] = useState([]);

    const disFetchOptions = useMemo(
        () =>
            _.debounce(async (query) => {
                try {
                    const response = await dispatch(searchDistributors({ search: query, docType: docType && docType.value }));

                    setDisOptions(
                        response &&
                        response.payload &&
                        response.payload.data.map((item) => ({
                            label: `${item?.custCode} - ${item?.name}`,
                            value: item && item._id || "",
                            custCode: item.custCode || ""
                        }))
                    );
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }, 1000),
        [docType]
    );

    useEffect(() => {
        disFetchOptions(inputValue);
    }, [inputValue, docType]);

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={disOptions}
                sx={{ width: width ? width : 300, ...sx, background: "#fff" }}
                value={customer}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(e, newValue) => {
                    if (newValue) {
                        setCustomer(newValue);
                    } else {
                        setCustomer(null);
                    }
                }}
                renderInput={(params) => <TextField {...params} label={label} />}
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
        </>
    );
};

export default SearchDistributorAutocomplete;
