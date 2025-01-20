import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { searchByAsmName, searchByTsmName } from "../../features/customerDetailSlice";

const SearchTsmAutocomplete = (props) => {
  const {
    inputValue,
    setInputValue,
    setValue,
    assetSerialNumber,
    label,
    width,
  } = props;

  const dispatch = useDispatch();

  const [tsmOptions, setTsmOptions] = useState([]);

  const tsmFetchOptions = useMemo(
    () =>
      _.debounce(async (query) => {
        try {
          const response = await dispatch(searchByTsmName({ search: query }));

          setTsmOptions(
            response &&
              response.payload &&
              response.payload.data.map((item) => ({
                label: item.tsmVSEName,
                value: item?._id,
              }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }, 1000),
    []
  );

  // Effect to call tsmFetchOptions when inputValue changes
  useEffect(() => {
    tsmFetchOptions(inputValue);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={tsmOptions}
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

export default SearchTsmAutocomplete;
