import { useDispatch, useSelector } from "react-redux";
import DashCard from "../../components/DashCard/DashCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDashboardCount } from "../../features/dashboardSlice";
import EmployeeIcon from "../../../public/Images/Employee.png"
import DocumentIcon from "../../../public/Images/Document.png"
import SignedIcon from "../../../public/Images/Signed.png"
import UnsignedIcon from "../../../public/Images/Unsigned.png"
import ProgressIcon from "../../../public/Images/Progress.png"
import CompletedIcon from "../../../public/Images/Completed.png"
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getLatestDocuments, getPendingDocuments } from "../../features/DocumentSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircleIcon from "@mui/icons-material/Circle";
import { EmployeeStatusColorHelper, EmployeeStatusDotColorHelper } from "../../constants/Employee-const";
import moment from "moment/moment";

const DashboardScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { employeeCount, documentCount, signedCount, unSignedCount, inProgressCount, completedCount } = useSelector((state) => state.dashboardData)
  const { latestDocuments, pendingDocuments } = useSelector((state) => state.documentData)

  const openPdf = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("No valid URL provided.");
    }
  };

  const columns = [
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

  const dashCards = [
    {
      title: "Total Employees",
      count: employeeCount,
      icon: EmployeeIcon,
      link: "/employees",
      borderColor: "#fde8ed"
    },
    {
      title: "Documents",
      count: documentCount,
      icon: DocumentIcon,
      link: "/documents",
      borderColor: "#e4e3fe"
    },
    {
      title: "Signed",
      count: signedCount,
      icon: SignedIcon,
      link: "/signedDocs",
      borderColor: "#ffdfd2"
    },
    {
      title: "Unsigned",
      count: unSignedCount,
      icon: UnsignedIcon,
      link: "/unSignedDocs",
      borderColor: "#bcdaf6"
    },
    // {
    //   title: "In Progress",
    //   count: inProgressCount,
    //   icon: ProgressIcon,
    //   link: "/documents",
    //   borderColor: "#ffe9f1"
    // },
    {
      title: "Completed",
      count: completedCount,
      icon: CompletedIcon,
      link: "/completedDocs",
      borderColor: "#cee2f4 "
    },
  ]

  useEffect(() => {
    dispatch(getDashboardCount())
    dispatch(getLatestDocuments())
    dispatch(getPendingDocuments())
  }, [])


  return (
    <>
      <div className="home-content">
        <div className="overview-boxes">
          <div className="left-side">
            <div className="upperDiv">
              {dashCards &&
                dashCards.map((item, index) => (
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
                  <h4 className="m-0" style={{ color: "#1c1b6c", fontWeight: "bold" }}>{t("Latest Document")}</h4>
                  <Button variant="outlined" onClick={() => navigate("/documents")}>Visit</Button>
                </div>
                <DataGrid
                  rows={latestDocuments}
                  columns={columns}
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
                  <h4 className="m-0" style={{ color: "#1c1b6c", fontWeight: "bold" }}>{t("Pending Document")}</h4>
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
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;