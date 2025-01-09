import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { searchTemplates } from "../../features/TemplateDetailSlice";

const SearchTemplateAutocomplete = (props) => {
  const { setDocument, document, label } = props;

  const dispatch = useDispatch();

  const [templateOptions, setTemplateOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
              fields: item.fields,
              htmlTemplate: item.htmlTemplate,
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
        options={templateOptions}
        fullWidth
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={document}
        onChange={(e, newValue) => {
          if (newValue) {
            setDocument(newValue);
          } else {
            setDocument(null);
          }
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  );
};

export default SearchTemplateAutocomplete;
