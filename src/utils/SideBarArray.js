import DashboardActiveIcon from "/Images/Dash_active.png"
import DashboardIcon from "/Images/Dash_inactive.png"
import EmployeeActiveIcon from "/Images/Employee_active.png"
import DocumentActiveIcon from "/Images/Document_active.png"
import DocumentIcon from "/Images/Document_inactive.png"
import TemplateActiveIcon from "/Images/Template_active.png"
import TemplateIcon from "/Images/Template_inactive.png"
import StatusActiveIcon from "/Images/Status_active.png"
import StatusIcon from "/Images/Status_inactive.png"
import SignedActiveIcon from "/Images/Signed_active.png"
import SignedIcon from "/Images/Signed_inactive.png"
import UnsignedActiveIcon from "/Images/Unsigned_active.png"
import UnsignedIcon from "/Images/Unsigned_inactive.png"
import CompletedActiveIcon from "/Images/Completed_active.png"
import CompletedIcon from "/Images/Completed_inactive.png"
import CustomerIcon from "/Images/Customer_inactive.png"
import CustomerActiveIcon from "/Images/Customer_active.png"
import AssetIcon from "/Images/Asset_inactive.png"
import AssetActiveIcon from "/Images/Asset_active.png"
import AssetTrackerIcon from "/Images/Assettracker_inactive.png"
import AssetTrackerActiveIcon from "/Images/Assettracker_active.png"
import AgreementIcon from "/Images/Agreement_inactive.png"
import AgreementActiveIcon from "/Images/Agreement_active.png"
import DeliveryhistoryIcon from "/Images/Deliveryhistory_inactive.png"
import DeliveryhistoryActiveIcon from "/Images/Deliveryhistory_active.png"
import AdharIcon from "/Images/Adhar_inactive.png"
import AdharActiveIcon from "/Images/Adhar_active.png"
import DisIcon from "/Images/Distributor_inactive.png"
import DisActiveIcon from "/Images/Distributor_active.png"
import CfaIcon from "/Images/Cfa_inactive.png"
import CfaActiveIcon from "/Images/Cfa_active.png"
import VrsIcon from "/Images/Vrs_inactive.png"
import VrsActiveIcon from "/Images/Vrs_active.png"

export function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(0, length);
}

export const sideBarArray = [
  // common
  {
    id: generateRandomId(),
    title: "Dashboard",
    link: "/dashboard",
    activeLink: ["/dashboard"],
    activeIcon: DashboardActiveIcon,
    icon: DashboardIcon,
    role: ["AHR", "HR", "A", "Dis"],
  },

  // Df
  {
    id: generateRandomId(),
    title: "Customers",
    link: "/customers",
    activeLink: ["/customers"],
    activeIcon: CustomerActiveIcon,
    icon: CustomerIcon,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    title: "Assets Master",
    link: "/assetsmaster",
    activeLink: ["/assetsmaster"],
    activeIcon: AssetActiveIcon,
    icon: AssetIcon,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    title: "Assets Tracker",
    link: "/assetstracker",
    activeLink: ["/assetstracker"],
    activeIcon: AssetTrackerActiveIcon,
    icon: AssetTrackerIcon,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    title: "Templates",
    link: "/templates",
    activeLink: ["/templates"],
    activeIcon: TemplateActiveIcon,
    icon: TemplateIcon,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    title: "Agreements",
    link: "/agreements",
    activeLink: ["/agreements"],
    activeIcon: AgreementActiveIcon,
    icon: AgreementIcon,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    title: "Delivery Challan",
    link: "/deliverychallan",
    activeLink: ["/deliverychallan", "/deliverychallan/add"],
    activeIcon: DeliveryhistoryActiveIcon,
    icon: DeliveryhistoryIcon,
    role: ["A"],
  },
  {
    id: generateRandomId(),
    title: "Aadhar Data",
    link: "/aadharData",
    activeLink: ["/aadharData"],
    activeIcon: AdharActiveIcon,
    icon: AdharIcon,
    role: ["A"],
  },

  // hr documents
  {
    id: generateRandomId(),
    title: "Employees",
    link: "/employees",
    activeLink: ["/employees"],
    activeIcon: EmployeeActiveIcon,
    activeIcon: DocumentActiveIcon,
    icon: DocumentIcon,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    title: "Documents",
    link: "/documents",
    activeLink: ["/documents"],
    activeIcon: DocumentActiveIcon,
    activeIcon: DocumentActiveIcon,
    icon: DocumentIcon,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    title: "Templates",
    link: "/templates",
    activeLink: ["/templates"],
    activeIcon: TemplateActiveIcon,
    icon: TemplateIcon,
    role: ["AHR", "HR"],
  },
  {
    id: generateRandomId(),
    title: "Status",
    activeIcon: StatusActiveIcon,
    activeLink: [""],
    icon: StatusIcon,
    role: ["AHR", "HR"],
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

  // Distributor

  {
    id: generateRandomId(),
    title: "Distributor",
    link: "/distributor",
    activeLink: ["/distributor"],
    activeIcon: DisActiveIcon,
    icon: DisIcon,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    title: "CFA",
    link: "/cfa",
    activeLink: ["/cfa"],
    activeIcon: CfaActiveIcon,
    icon: CfaIcon,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    title: "VRS",
    link: "/vrs",
    activeLink: ["/vrs"],
    activeIcon: VrsActiveIcon,
    icon: VrsIcon,
    role: ["Dis"],
  },
  {
    id: generateRandomId(),
    title: "Documents",
    link: "/disDocuments",
    activeLink: ["/disDocuments"],
    activeIcon: DocumentActiveIcon,
    icon: DocumentIcon,
    role: ["Dis"],
  },
];