import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, TextField } from "@mui/material";
import { searchEmployees } from "../../features/EmployeeDetailSlice";

const SearchEmployeeAutocomplete = (props) => {
  const { inputValue, setInputValue, setEmployee, employee, label, width, sx } =
    props;

  const dispatch = useDispatch();

  const [employeeOptions, setEmployeeOptions] = useState([]);

  const employeeFetchOptions = useMemo(
    () =>
      _.debounce(async (query) => {
        try {
          const response = await dispatch(searchEmployees({ search: query }));

          setEmployeeOptions(
            response &&
              response.payload &&
              response.payload.data.map((item) => ({
                label: `${item?.empCode} - ${item?.name}`,
                empCode: item?.empCode,
                empName: item.name,
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
    employeeFetchOptions(inputValue);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={employeeOptions}
        sx={{ width: width ? width : 300, ...sx }}
        value={employee}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(e, newValue) => {
          if (newValue) {
            setEmployee(newValue);
          } else {
            setEmployee(null);
          }
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  );
};

export default SearchEmployeeAutocomplete;
