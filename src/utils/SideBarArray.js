import DashboardIcon from "../../public/Images/Dashboard_side.png"
import EmployeeIcon from "../../public/Images/Employee_side.png"
import DocumentIcon from "../../public/Images/Document_side.png"

export function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(0, length);
}

export const sideBarArray = [
  {
    id: generateRandomId(),
    title: "Dashboard",
    link: "/",
    icon: DashboardIcon,
  },
  {
    id: generateRandomId(),
    title: "Employees",
    link: "/employees",
    icon: EmployeeIcon,
  },
  {
    id: generateRandomId(),
    title: "Templates",
    link: "/templates",
    icon: "bx bx-note",
  },
  {
    id: generateRandomId(),
    title: "Documents",
    link: "/documents",
    icon: DocumentIcon,
  },
  {
    id: generateRandomId(),
    title: "Signed",
    link: "/signed",
    icon: DocumentIcon,
  },
  {
    id: generateRandomId(),
    title: "Unsigned",
    link: "/unsigned",
    icon: DocumentIcon,
  },
  {
    id: generateRandomId(),
    title: "In Progress",
    link: "/inProgress",
    icon: DocumentIcon,
  },
  {
    id: generateRandomId(),
    title: "Completed",
    link: "/completed",
    icon: DocumentIcon,
  },
];