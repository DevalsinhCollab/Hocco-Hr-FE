import DashboardActiveIcon from "../../public/Images/Dash_active.png"
import DashboardIcon from "../../public/Images/Dash_inactive.png"
import EmployeeActiveIcon from "../../public/Images/Employee_active.png"
import EmployeeIcon from "../../public/Images/Employee_inactive.png"
import DocumentActiveIcon from "../../public/Images/Document_active.png"
import DocumentIcon from "../../public/Images/Document_inactive.png"
import TemplateActiveIcon from "../../public/Images/Template_active.png"
import TemplateIcon from "../../public/Images/Template_inactive.png"
import StatusActiveIcon from "../../public/Images/Status_active.png"
import StatusIcon from "../../public/Images/Status_inactive.png"
import SignedActiveIcon from "../../public/Images/Signed_active.png"
import SignedIcon from "../../public/Images/Signed_inactive.png"
import UnsignedActiveIcon from "../../public/Images/Unsigned_active.png"
import UnsignedIcon from "../../public/Images/Unsigned_inactive.png"
import CompletedActiveIcon from "../../public/Images/Completed_active.png"
import CompletedIcon from "../../public/Images/Completed_inactive.png"

export function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(0, length);
}

export const sideBarArray = [
  {
    id: generateRandomId(),
    title: "Dashboard",
    link: "/dashboard",
    activeIcon: DashboardActiveIcon,
    icon: DashboardIcon,
  },
  {
    id: generateRandomId(),
    title: "Employees",
    link: "/employees",
    activeIcon: EmployeeActiveIcon,
    icon: EmployeeIcon,
  },
  {
    id: generateRandomId(),
    title: "Templates",
    link: "/templates",
    icon: "bx bx-note",
    activeIcon: TemplateActiveIcon,
    icon: TemplateIcon
  },
  {
    id: generateRandomId(),
    title: "Documents",
    link: "/documents",
    activeIcon: DocumentActiveIcon,
    icon: DocumentIcon,
  },
  {
    id: generateRandomId(),
    title: "Status",
    activeIcon: StatusActiveIcon,
    icon: StatusIcon,
    submenu: [
      {
        id: generateRandomId(),
        title: "Signed",
        link: "/signed",
        activeIcon: SignedActiveIcon,
        icon: SignedIcon,
      },
      {
        id: generateRandomId(),
        title: "Unsigned",
        link: "/unsigned",
        activeIcon: UnsignedActiveIcon,
        icon: UnsignedIcon,
      },
      {
        id: generateRandomId(),
        title: "Completed",
        link: "/completed",
        activeIcon: CompletedActiveIcon,
        icon: CompletedIcon,
      },
    ],
  },
];