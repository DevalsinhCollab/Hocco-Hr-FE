import { useDispatch, useSelector } from "react-redux";
import DashCard from "../../components/DashCard/DashCard";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getDashboardCount } from "../../features/dashboardSlice";
import EmployeeIcon from "../../../public/Images/Employee.png"
import DocumentIcon from "../../../public/Images/Document.png"
import SignedIcon from "../../../public/Images/Signed.png"
import UnsignedIcon from "../../../public/Images/Unsigned.png"
import ProgressIcon from "../../../public/Images/Progress.png"
import CompletedIcon from "../../../public/Images/Completed.png"
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const DashboardScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const { employeeCount, documentCount, signedCount, unSignedCount, inProgressCount, completedCount } = useSelector((state) => state.dashboardData)
  const { employees, totalCount } = useSelector((state) => state.employeeData)

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerClassName: 'red-header',
      width: 250,
    },
    {
      field: "empCode",
      headerName: "Employee Code",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: 'red-header',
      width: 300,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: 'red-header',
      width: 200,
    },
    {
      field: "company",
      headerName: "Company Name",
      headerClassName: 'red-header',
      width: 250,
      renderCell: ({ row }) => {
        return row && row.company && row.company.name || ""
      }
    },
    {
      field: "adhar",
      headerName: "Adhar",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "birth",
      headerName: "Birth",
      headerClassName: 'red-header',
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      headerClassName: 'red-header',
      width: 150,
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
    {
      title: "In Progress",
      count: inProgressCount,
      icon: ProgressIcon,
      link: "/documents",
      borderColor: "#ffe9f1"
    },
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


            <Box>
              <DataGrid
                rows={employees}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(employees &&
                    employees.length > 0 &&
                    employees.initialState),
                  pagination: {
                    ...(employees &&
                      employees.length > 0 &&
                      employees.initialState &&
                      employees.initialState?.pagination),
                    paginationModel: {
                      pageSize: pageSize,
                    },
                  },
                }}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onPaginationModelChange={handlePaginationModelChange}
                rowsPerPageOptions={[10]}
                getRowId={(e) => e._id}
              />
            </Box>
          </div>

          <div className="right-side">
            <h1>Hello there right side</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
