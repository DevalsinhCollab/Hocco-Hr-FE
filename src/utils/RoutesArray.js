import DashboardScreen from "../pages/Dashboard/DashboardScreen";
import Employees from "../pages/Employees/Employees";
import Documents from "../pages/Documents/Documents";
import Templates from "../pages/Templates/Templates";
import AddTemplate from "../pages/Templates/AddTemplate";
import SignedDocuments from "../pages/Documents/SignedDocuments";

function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(2, length);
}

export const routesArray = [
  {
    id: generateRandomId(),
    link: "/",
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
    link: "/documents",
    component: Documents,
  },
  {
    id: generateRandomId(),
    link: "/signed",
    component: SignedDocuments,
  },
  {
    id: generateRandomId(),
    link: "/unSignedDocs",
    component: Documents,
  },
  {
    id: generateRandomId(),
    link: "/completedDocs",
    component: Documents,
  },
];
