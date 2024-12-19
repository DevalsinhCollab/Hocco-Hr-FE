import { configureStore } from "@reduxjs/toolkit";
import authDetail from "../features/authDetailsSlice";
import companyDetails from "../features/CompanyDetailSlice";
import employeeDetails from "../features/EmployeeDetailSlice";
import documentDetails from "../features/DocumentSlice";
import dashboardDetails from "../features/dashboardSlice";
import templateDetails from "../features/TemplateDetailSlice";

const reducers = {
  authData: authDetail,
  companyData: companyDetails,
  employeeData: employeeDetails,
  documentData: documentDetails,
  dashboardData: dashboardDetails,
  templateData: templateDetails
};

export const store = configureStore({
  reducer: reducers,
});