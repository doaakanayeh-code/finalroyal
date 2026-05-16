import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { MenuContext } from "../Context/MenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendarCheck,
  faUsers,
  faClipboardList,
  faChartLine,
  faMoneyBillTrendUp,
  faComments,
  faRightFromBracket,
  faUserGear
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const { t, i18n } = useTranslation();
  const menu = useContext(MenuContext);
  const isOpen = menu?.isOpen;
  const location = useLocation();
  const isAr = i18n.language === 'ar';

  const links = [
    { title: t("sidebar.dashboard"), path: "/admin/dashboard", icon: faChartLine },
    { title: t("sidebar.users"), path: "/admin/users", icon: faUsers },
    { title: t("sidebar.providers"), path: "/admin/provider", icon: faUserGear },
    { title: t("sidebar.bookings"), path: "/admin/booking", icon: faCalendarCheck },
    { title: t("sidebar.reports"), path: "/admin/reports", icon: faClipboardList },
    { title: t("sidebar.financial_follow"), path: "/admin/financial_Follow", icon: faMoneyBillTrendUp },
    { title: t("sidebar.comments"), path: "/admin/comments", icon: faComments },
    { title: t("sidebar.home"), path: "/admin/Home", icon: faHouse },
    { title: t("sidebar.logout"), path: "/admin/logout", icon: faRightFromBracket },
  ];

  return (
    <Box
      className="sidebar"
      sx={{
        width: isOpen ? "240px" : "0px",
        transition: "0.4s ease",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: isAr ? "auto" : 0,
        right: isAr ? 0 : "auto",
        height: "100vh",
        pt: 4,
        px: isOpen ? 2 : 0,
        zIndex: 1300,
        background: "#F3EBE5",
        borderTopRightRadius: isAr ? "0" : "40px",
        borderTopLeftRadius: isAr ? "40px" : "0",
        borderBottomRightRadius: isAr ? "0" : "120px",
        borderBottomLeftRadius: isAr ? "120px" : "0",
        boxShadow: isAr ? "-10px 0 30px rgba(0,0,0,0.08)" : "10px 0 30px rgba(0,0,0,0.08)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "flex-start", mt: 2,
          "& a": {
            display: "flex",
            alignItems: "center",
            gap: "14px",
            textDecoration: "none",
            color: "#5C4033",
            fontSize: "1rem",
            fontWeight: 600,
            transition: "0.3s",
            width: "100%",
            borderRadius: "16px",
            padding: "12px 18px",
            flexDirection: isAr ? 'row' : 'row', 
            "&:hover": {
              backgroundColor: "#E6D8CF",
              transform: isAr ? "translateX(-6px)" : "translateX(6px)",
            },
            "&.active": { backgroundColor: "#DCC8BB" },
          },
        }}
      >
        <Box sx={{ mb: 5, px: 1 }} />
        {links.map((link) => (
          <Link key={link.path} to={link.path} className={location.pathname === link.path ? "active" : ""}>
            <FontAwesomeIcon icon={link.icon} style={{ width: '20px' }} />
            {link.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}