import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { searchTemplates } from "../../features/TemplateDetailSlice";

const SearchTemplateAutocomplete = (props) => {
  const { inputValue, setInputValue, setEmployee, employee, label, width, sx } =
    props;

  const dispatch = useDispatch();

  const [templateOptions, setTemplateOptions] = useState([]);

  const templateFetchOptions = useMemo(
    () =>
      _.debounce(async (query) => {
        try {
          const response = await dispatch(searchTemplates({ search: query }));

          setTemplateOptions(
            response &&
              response.payload &&
              response.payload.data.map((item) => ({
                label: item.templateName,
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
    templateFetchOptions(inputValue);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={templateOptions}
        fullWidth
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        // onChange={(e, newValue) => {
        //   if (newValue) {
        //     setEmployee(newValue);
        //   } else {
        //     setEmployee(null);
        //   }
        // }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  );
};

export default SearchTemplateAutocomplete;
