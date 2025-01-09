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
              value: item && item._id || "",
              empCode: item && item.empCode || "",
              empName: item && item.name || "",
              email: item && item.email || "",
              designation: item && item.designation || "",
              salary: item && item.salary || "",
              salaryPa: item && item.salaryPa || "",
              basicSalary: item && item.basicSalary || "",
              basicSalaryPa: item && item.basicSalaryPa || "",
              allowances: item && item.allowances || "",
              allowancesPa: item && item.allowancesPa || "",
              educationAllowance: item && item.educationAllowance || "",
              educationAllowancePa: item && item.educationAllowancePa || "",
              attendanceAllowance: item && item.attendanceAllowance || "",
              attendanceAllowancePa: item && item.attendanceAllowancePa || "",
              hra: item && item.hra || "",
              hraPa: item && item.hraPa || "",
              monthlyBonus: item && item.monthlyBonus || "",
              monthlyBonusPa: item && item.monthlyBonusPa || "",
              productionIncentive: item && item.productionIncentive || "",
              productionIncentivePa: item && item.productionIncentivePa || "",
              companyContribution: item && item.companyContribution || "",
              providentFund: item && item.providentFund || "",
              providentFundPa: item && item.providentFundPa || "",
              employeeStateInsuranceCorporation: item && item.employeeStateInsuranceCorporation || "",
              employeeStateInsuranceCorporationPa: item && item.employeeStateInsuranceCorporationPa || "",
              bonusExgratia: item && item.bonusExgratia || "",
              bonusExgratiaPa: item && item.bonusExgratiaPa || "",
              variablePay: item && item.variablePay || "",
              variablePayPa: item && item.variablePayPa || "",
              totalCTC: item && item.totalCTC || "",
              totalCTCPa: item && item.totalCTCPa || "",
              residentialAddress: item && item.residentialAddress || "",
              noticePeriod: item && item.noticePeriod || "",
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
        sx={{ width: width ? width : 300, ...sx, background: "#fff" }}
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

export default SearchEmployeeAutocomplete;
