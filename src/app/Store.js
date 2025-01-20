import { configureStore } from "@reduxjs/toolkit";
import authDetail from "../features/authDetailsSlice";
import companyDetails from "../features/CompanyDetailSlice";
import employeeDetails from "../features/EmployeeDetailSlice";
import documentDetails from "../features/DocumentSlice";
import dashboardDetails from "../features/dashboardSlice";
import templateDetails from "../features/TemplateDetailSlice";
import usersDetail from "../features/userDetailsSlice";
import profileDetail from "../features/profileDetailSlice";
import customerDetails from "../features/customerDetailSlice";
import dfMasterSlice from "../features/dfMasterSlice";
import DeliveryChallan from "../features/DelieverychallanSlice";
import EwayBill from "../features/eWayBillDetailsSlice";
import assetsTrackerDetails from "../features/AssetTrackerSlice";
import distributorDetails from "../features/DistributorSlice";
import distributorDocumentDetails from "../features/DistributorDocumentSlice";
import cfaDetails from "../features/CfaSlice";
import vrsDetails from "../features/VrsSlice";

const reducers = {
  authData: authDetail,
  userData: usersDetail,
  dashboardData: dashboardDetails,
  templateData: templateDetails,
  profileData: profileDetail,

  customerData: customerDetails,
  dfMaster: dfMasterSlice,
  DeliveryChallanData: DeliveryChallan,
  eWayBillData: EwayBill,
  assetTrackerData: assetsTrackerDetails,

  companyData: companyDetails,
  employeeData: employeeDetails,
  documentData: documentDetails,

  distributorData: distributorDetails,
  distributorDocumentData: distributorDocumentDetails,
  cfaData: cfaDetails,
  vrsData: vrsDetails,
};

export const store = configureStore({
  reducer: reducers,
});