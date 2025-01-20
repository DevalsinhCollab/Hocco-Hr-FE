import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { searchSerialNumberAndBarCode } from "../../features/dfMasterSlice";

const SearchAssestAutocomplete = (props) => {
  const {
    inputValue,
    setInputValue,
    setValue,
    assetSerialNumber,
    label,
    width,
  } = props;

  const dispatch = useDispatch();

  const [assetsOptions, setAssetsOptions] = useState([]);

  const assetFetchOptions = useMemo(
    () =>
      _.debounce(async (query) => {
        try {
          const response = await dispatch(
            searchSerialNumberAndBarCode({ search: query })
          );

          setAssetsOptions(
            response &&
              response.payload &&
              response.payload.data.map((item) => ({
                label: item?.assetSerialNumber,
                value: item?._id,
              }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }, 1000),
    []
  );

  // Effect to call assetFetchOptions when inputValue changes
  useEffect(() => {
    assetFetchOptions(inputValue);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={assetsOptions}
        sx={{ width: width ? width : 300, background: "#fff" }}
        value={assetSerialNumber}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(e, newValue) => setValue(newValue)}
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

export default SearchAssestAutocomplete;
