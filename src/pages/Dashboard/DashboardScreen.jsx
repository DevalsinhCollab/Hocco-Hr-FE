import { useDispatch, useSelector } from "react-redux";
import DashCard from "../../components/DashCard/DashCard";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { dfDashboard, getDashboardCount } from "../../features/dashboardSlice";
import EmployeeIcon from "../../../public/Images/Employee.png"
import DocumentIcon from "../../../public/Images/Document.png"
import SignedIcon from "../../../public/Images/Signed.png"
import UnsignedIcon from "../../../public/Images/Unsigned.png"
import CompletedIcon from "../../../public/Images/Completed.png"
import DfMasterIcon from "../../../public/Images/Df_master.png"
import AgreementIcon from "../../../public/Images/Sent_agreement.png"
import CustomerIcon from "../../../public/Images/Customers.png"
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getLatestDocuments, getPendingDocuments } from "../../features/DocumentSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircleIcon from "@mui/icons-material/Circle";
import { EmployeeStatusColorHelper, EmployeeStatusDotColorHelper } from "../../constants/Employee-const";
import moment from "moment/moment";
import { getLatestCustomers } from "../../features/customerDetailSlice";

const DashboardScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { employeeCount, documentCount, signedCount, unSignedCount, inProgressCount, completedCount, dfCount, customerCount, agreementCount } = useSelector((state) => state.dashboardData)
  const { latestDocuments, pendingDocuments } = useSelector((state) => state.documentData)
  const { latestCustomers } = useSelector((state) => state.customerData)
  const { auth } = useSelector((state) => state.authData);

  const [tableTitle, setTableTitle] = useState("")
  const [sideTableTitle, setSideTableTitle] = useState("")
  const [column, setColumn] = useState(null)
  const [navigateTo, setNavigateTo] = useState("")

  const openPdf = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("No valid URL provided.");
    }
  };

  const documentColumn = [
    {
      field: "",
      headerName: "Actions",
      headerClassName: 'red-header',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Button
              variant="outlined"
              onClick={() => openPdf(params.row.document.Location)}
            >
              <RemoveRedEyeIcon />
            </Button>
          </div>
        );
      },
    },
    {
      field: "empName",
      headerName: "Employee Name",
      width: 250,
      headerClassName: 'red-header',
    },
    {
      field: "empCode",
      headerName: "Employee Code",
      width: 220,
      headerClassName: 'red-header',
    },
    {
      field: "signType",
      headerName: "Sign Type",
      width: 200,
      headerClassName: 'red-header',
      renderCell: ({ row }) => {
        return (
          <>
            <CircleIcon
              sx={{
                fontSize: "15px",
                color: EmployeeStatusDotColorHelper[row.signType],
              }}
            />
            <Button
              color={EmployeeStatusColorHelper[row.signType]}
              sx={{ textTransform: "capitalize" }}
            >
              {row && row.signType}
            </Button>
          </>
        );
      },
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 300,
      headerClassName: 'red-header',
      renderCell: ({ row }) => {
        return row && row.company && row.company.name
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: 'red-header',
    },
    {
      field: "signStatus",
      headerName: "Sign Status",
      width: 200,
      headerClassName: 'red-header',
    },
  ];

  const assetColumn = [
    {
      field: "custCode",
      headerName: "Customer Code",
      width: 150,
      headerClassName: 'red-header',
    },
    {
      field: "assestSerialNumber",
      headerName: "Assets Serial Number",
      width: 250,
      headerClassName: 'red-header',
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: 'red-header',
      renderCell: ({ row }) => {
        return (
          <>
            <CircleIcon
              sx={{
                fontSize: "15px",
                color: EmployeeStatusDotColorHelper[row.signType],
              }}
            />
            <Button
              color={EmployeeStatusColorHelper[row.signType]}
              sx={{ textTransform: "capitalize" }}
            >
              {row && row.signType}
            </Button>
          </>
        );
      },
    },
    {
      field: "barCode",
      headerName: "BarCode",
      width: 290,
      headerClassName: 'red-header',
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 210,
      headerClassName: 'red-header',
    },
  ];


  const dashCards = [
    // DF
    {
      title: "DF Masters",
      count: dfCount,
      icon: DfMasterIcon,
      link: "/assetsmaster",
      borderColor: "#fde8ed",
      role: ["A"],
    },
    {
      title: "Sent Agreements",
      count: agreementCount,
      icon: AgreementIcon,
      link: "/agreements",
      borderColor: "#e4e3fe",
      role: ["A"],
    },
    {
      title: "Total Customers",
      count: customerCount,
      icon: CustomerIcon,
      link: "/customers",
      borderColor: "#ffd2bf",
      role: ["A"],
    },

    // HR
    {
      title: "Total Employees",
      count: employeeCount,
      icon: EmployeeIcon,
      link: "/employees",
      borderColor: "#fde8ed",
      role: ["AHR", "HR"],
    },
    {
      title: "Documents",
      count: documentCount,
      icon: DocumentIcon,
      link: "/documents",
      borderColor: "#e4e3fe",
      role: ["AHR", "HR"],
    },
    {
      title: "Signed",
      count: signedCount,
      icon: SignedIcon,
      link: "/signedDocs",
      borderColor: "#ffdfd2",
      role: ["AHR", "HR"],
    },
    {
      title: "Unsigned",
      count: unSignedCount,
      icon: UnsignedIcon,
      link: "/unSignedDocs",
      borderColor: "#bcdaf6",
      role: ["AHR", "HR"],
    },
    {
      title: "Completed",
      count: completedCount,
      icon: CompletedIcon,
      link: "/completedDocs",
      borderColor: "#cee2f4",
      role: ["AHR", "HR"],
    },

    // Dis
    {
      title: "Total Distributor",
      count: employeeCount,
      icon: EmployeeIcon,
      link: "/employees",
      borderColor: "#fde8ed",
      role: ["Dis"],
    },
    {
      title: "Total CFA",
      count: documentCount,
      icon: DocumentIcon,
      link: "/documents",
      borderColor: "#e4e3fe",
      role: ["Dis"],
    },
    {
      title: "Total VRS",
      count: signedCount,
      icon: SignedIcon,
      link: "/signedDocs",
      borderColor: "#ffdfd2",
      role: ["Dis"],
    },
    {
      title: "Unsigned",
      count: unSignedCount,
      icon: UnsignedIcon,
      link: "/unSignedDocs",
      borderColor: "#bcdaf6",
      role: ["Dis"],
    },
    {
      title: "Signed",
      count: unSignedCount,
      icon: UnsignedIcon,
      link: "/unSignedDocs",
      borderColor: "#bcdaf6",
      role: ["Dis"],
    },
    {
      title: "Completed",
      count: completedCount,
      icon: CompletedIcon,
      link: "/completedDocs",
      borderColor: "#cee2f4",
      role: ["Dis"],
    },
  ]

  useEffect(() => {
    if (auth && auth.userType && ["A"].includes(auth.userType)) {
      dispatch(dfDashboard())
      dispatch(getLatestCustomers())
    } else if (auth && auth.userType && ["AHR", "HR"].includes(auth.userType)) {
      dispatch(getLatestDocuments())
      dispatch(getPendingDocuments())
      dispatch(getDashboardCount())
    }
  }, [auth])


  let filteredDashCards = dashCards.filter((item) =>
    item.role.includes(auth && auth.userType !== undefined && auth.userType)
  );

  useEffect(() => {
    if (auth && auth.userType && ["A"].includes(auth.userType)) {
      setTableTitle("Latest Asset Trackers")
      setSideTableTitle("Latest Customer")
      setNavigateTo("/assetstracker")
      setColumn(assetColumn)
    } else {
      setColumn(documentColumn)
      setSideTableTitle("Pending Documents")
      setNavigateTo("/dashboard")
    }
  }, [auth])

  return (
    <>
      <div className="home-content">
        <div className="overview-boxes">
          <div className="left-side">
            <div className="upperDiv">
              {filteredDashCards &&
                filteredDashCards.map((item, index) => (
                  <DashCard
                    title={t(item.title)}
                    count={item.count}
                    icon={item.icon}
                    link={item.link}
                    index={index}
                    bgColor={item.bgColor}
                    borderColor={item.borderColor}
                  />
                ))}
            </div>

            <div className="m-3 p-3 tableDiv" style={{ border: "2px solid #ffe7eb", borderRadius: "10px", boxShadow: " 0 0 10px 5px #f7f3f4" }}>
              <Box sx={{ height: "auto", width: "100%" }}>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <h4 className="m-0" style={{ color: "#1c1b6c", fontWeight: "bold" }}>{t(tableTitle)}</h4>
                  <Button variant="outlined" onClick={() => navigate(navigateTo)}>Visit</Button>
                </div>
                <DataGrid
                  rows={latestDocuments}
                  columns={assetColumn}
                  getRowId={(e) => e._id}
                  hideFooter
                />
              </Box>
            </div>
          </div>

          <div className="right-side">
            <div className="p-3" style={{ border: "2px solid #ffe7eb", borderRadius: "10px", boxShadow: " 0 0 10px 5px #f7f3f4" }}>
              <Box>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <h4 className="m-0" style={{ color: "#1c1b6c", fontWeight: "bold" }}>{t(sideTableTitle)}</h4>
                </div>

                {pendingDocuments && pendingDocuments.map((item, index) => (
                  <div className="d-flex justify-content-between" style={{ border: "2px solid #f0f0f0", padding: "1rem 1rem", marginBottom: '1rem', borderRadius: "5px" }}>
                    <div>
                      <p style={{ fontSize: "15px" }}>Name:- {item && item.empName}</p>
                      <p style={{ fontSize: "15px" }}>Code:- {item && item.empCode}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", color: "#007c1b" }}>Created At</p>
                      <p style={{ fontSize: "15px", color: "#0058aa" }}>{item && item.createdAt && moment(item.createdAt).format("DD-MMM-YYYY")}</p>
                    </div>
                  </div>
                ))}

                {latestCustomers && latestCustomers.map((item, index) => (
                  <div className="d-flex justify-content-between" style={{ border: "2px solid #f0f0f0", padding: "1rem 1rem", marginBottom: '1rem', borderRadius: "5px" }}>
                    <div>
                      <p style={{ fontSize: "15px" }}>Name:- {item && item.custName}</p>
                      <p style={{ fontSize: "15px" }}>Code:- {item && item.custCode}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", color: "#007c1b" }}>Created At</p>
                      <p style={{ fontSize: "15px", color: "#0058aa" }}>{item && item.createdAt && moment(item.createdAt).format("DD-MMM-YYYY")}</p>
                    </div>
                  </div>
                ))}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;