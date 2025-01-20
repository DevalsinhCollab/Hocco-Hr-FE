import React, { useEffect, useMemo, useState } from "react";
import { searchCustomers } from "../../features/customerDetailSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";

const SearchCustomerAutocomplete = (props) => {
  const { inputValue, setInputValue, setCustomer, customer, label, width, sx } =
    props;

  const dispatch = useDispatch();

  const [customerOptions, setCustomerOptions] = useState([]);

  const customerFetchOptions = useMemo(
    () =>
      _.debounce(async (query) => {
        try {
          const response = await dispatch(searchCustomers({ search: query }));

          setCustomerOptions(
            response &&
            response.payload &&
            response.payload.data.map((item) => ({
              label: `${item?.custCode} - ${item?.custName}`,
              custCode: item?.custCode,
              value: item?._id,
            }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }, 1000),
    []
  );

  // Effect to call customerFetchOptions when inputValue changes
  useEffect(() => {
    customerFetchOptions(inputValue);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={customerOptions}
        sx={{ width: width ? width : 300, ...sx, background: "#fff" }}
        value={customer}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(e, newValue) => setCustomer(newValue)}
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

export default SearchCustomerAutocomplete;
