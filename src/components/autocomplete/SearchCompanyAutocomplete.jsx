import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { getCompanies } from "../../features/CompanyDetailSlice";

const SearchCompanyAutocomplete = (props) => {
    const { inputValue, setInputValue, company, setCompany } =
        props;

    const dispatch = useDispatch();

    const [companyOptions, setCompanyOptions] = useState([]);

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
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={companyOptions}
                fullWidth
                value={company}
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
                renderInput={(params) => <TextField {...params} label="Select Company" />}
            />
        </>
    );
};

export default SearchCompanyAutocomplete;
