import { useDispatch, useSelector } from "react-redux";
import DashCard from "../../components/DashCard/DashCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDashboardCount } from "../../features/dashboardSlice";

const DashboardScreen = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const { employeeCount, documentCount, signedCount, unSignedCount, inProgressCount, completedCount } = useSelector((state) => state.dashboardData)

  const dashCards = [
    {
      title: "Employees",
      count: employeeCount,
      icon: "bx bx-group cart",
      link: "/employees",
    },
    {
      title: "Documents",
      count: documentCount,
      icon: "bx bx-group cart",
      link: "/documents",
    },
    {
      title: "Signed",
      count: signedCount,
      icon: "bx bx-group cart",
      link: "/signedDocs",
      role: ["HR", "AHR"],
    },
    {
      title: "Unsigned",
      count: unSignedCount,
      icon: "bx bx-group cart",
      link: "/unSignedDocs",
    },
    {
      title: "In Progress",
      count: inProgressCount,
      icon: "bx bx-group cart",
      link: "/documents",
    },
    {
      title: "Completed",
      count: completedCount,
      icon: "bx bx-group cart",
      link: "/completedDocs",
    },
  ]

  useEffect(() => {
    dispatch(getDashboardCount())
  }, [])

  return (
    <>
      <div className="home-content">
        <div className="overview-boxes">
          {dashCards &&
            dashCards.map((item, index) => (
              <DashCard
                title={t(item.title)}
                count={item.count}
                icon={item.icon}
                link={item.link}
                index={index}
              />
            ))}
          {/* <DashCard
            title={t("Sent Agreements")}
            count={allAgreements.length}
            icon={"bx bx-file cart"}
            link={"/agreements"}
          />
          <DashCard
            title={t("Customers")}
            count={customers.length}
            icon={"bx bx-group cart"}
            link={"/customers"}
          /> */}

          {/* <DashCard
            title={"DF Stores"}
            count={0}
            icon={"bx bx-file cart"}
            link={"/team"}
          /> */}
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
