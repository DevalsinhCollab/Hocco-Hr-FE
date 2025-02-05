import DashboardScreen from "../pages/Dashboard/DashboardScreen";
import Employees from "../pages/Employees/Employees";
import Documents from "../pages/Documents/Documents";
import Templates from "../pages/Templates/Templates";
import AddTemplate from "../pages/Templates/AddTemplate";
import EmployeeForm from "../pages/Employees/EmployeeForm";
import Customers from "../dfPages/Customers/Customers"
import DFMaster from "../dfPages/DFMaster/DFMaster"
import AssetsTracker from "../dfPages/AssestTracker/AssestTracker"
import Agreements from "../dfPages/Agreements/Agreements"
import DeliveryChallan from "../dfPages/DeliveryChallan/DeliveryChallan"
import DCTable from "../dfPages/DeliveryChallan/DCTable"
import AadharData from "../dfPages/Aadhar/AadharData"
import Distributor from "../distributorPages/Distributor/Distributor";
import Cfa from "../distributorPages/Cfa/Cfa";
import Vrs from "../distributorPages/Vrs/Vrs";
import DistributorDocuments from "../distributorPages/DistributorDocuments/DistributorDocuments";
import CustomerDetails from "../dfPages/Customers/CustomerDetails";

function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(2, length);
}

export const routesArray = [
  // Common Routes
  {
    id: generateRandomId(),
    link: "/dashboard",
    component: DashboardScreen,
    role: ["AHR", "HR", "A", "Dis", ""],
  },
  {
    id: generateRandomId(),
    link: "/templates",
    component: Templates,
    role: ["AHR", "HR", "A", ""],
  },
  {
    id: generateRandomId(),
    link: "/templates/add",
    component: AddTemplate,
    role: ["AHR", "HR", "A", ""],
  },
  {
    id: generateRandomId(),
    link: "/templates/edit/:id",
    component: AddTemplate,
    role: ["AHR", "HR", ""],
  },

  // Df Routes
  {
    id: generateRandomId(),
    link: "/customers",
    component: Customers,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/customerDetails/:id",
    component: CustomerDetails,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/assetsmaster",
    component: DFMaster,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/assetstracker",
    component: AssetsTracker,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/agreements",
    component: Agreements,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/deliverychallan/add",
    component: DeliveryChallan,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/deliverychallan",
    component: DCTable,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    link: "/aadharData",
    component: AadharData,
    role: ["A"],
  },
 

  // Hr Routes
  {
    id: generateRandomId(),
    link: "/dashboard",
    component: DashboardScreen,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/employees",
    component: Employees,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/documents",
    component: Documents,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/signed",
    component: Documents,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/unsigned",
    component: Documents,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/completed",
    component: Documents,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/employee/add",
    component: EmployeeForm,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    link: "/employee/edit/:id",
    component: EmployeeForm,
    role: ["AHR", "HR"],
  },

  //  Distributor Routes
  {
    id: generateRandomId(),
    link: "/distributor",
    component: Distributor,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    link: "/cfa",
    component: Cfa,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    link: "/vrs",
    component: Vrs,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    link: "/disDocuments",
    component: DistributorDocuments,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    link: "/nearExpiry",
    component: DistributorDocuments,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    link: "/expired",
    component: DistributorDocuments,
    role: ["Dis"],
  },
];
