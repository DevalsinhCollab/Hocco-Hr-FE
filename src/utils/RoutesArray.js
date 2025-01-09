import DashboardScreen from "../pages/Dashboard/DashboardScreen";
import Employees from "../pages/Employees/Employees";
import Documents from "../pages/Documents/Documents";
import Templates from "../pages/Templates/Templates";
import AddTemplate from "../pages/Templates/AddTemplate";
import EmployeeForm from "../pages/Employees/EmployeeForm";
import PDFSigner from "../pages/PdfSigner";

function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(2, length);
}

export const routesArray = [
  {
    id: generateRandomId(),
    link: "/dashboard",
    component: DashboardScreen,
  },
  {
    id: generateRandomId(),
    link: "/employees",
    component: Employees,
  },
  {
    id: generateRandomId(),
    link: "/templates",
    component: Templates,
  },
  {
    id: generateRandomId(),
    link: "/templates/add",
    component: AddTemplate,
  },
  {
    id: generateRandomId(),
    link: "/templates/edit/:id",
    component: AddTemplate,
  },
  {
    id: generateRandomId(),
    link: "/documents",
    component: Documents,
  },
  {
    id: generateRandomId(),
    link: "/signed",
    component: Documents,
  },
  {
    id: generateRandomId(),
    link: "/unsigned",
    component: Documents,
  },
  {
    id: generateRandomId(),
    link: "/completed",
    component: Documents,
  },
  {
    id: generateRandomId(),
    link: "/employee/add",
    component: EmployeeForm,
  },
  {
    id: generateRandomId(),
    link: "/employee/edit/:id",
    component: EmployeeForm,
  },
];
