import React, { useContext, useState } from "react";

import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

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
  faEnvelope,
  faRightFromBracket,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import Logout from "./Logout";

import "./styles/sidebar.css";

export default function SideBar() {
  const { t, i18n } = useTranslation();

  const menu = useContext(MenuContext);
  const isOpen = menu?.isOpen;

  const location = useLocation();

  const isAr = i18n.language === "ar";

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleActualLogout = () => {
    setOpenLogoutModal(false);
    console.log("تم تسجيل الخروج");
  };

  const links = [
    {
      title: t("sidebar.dashboard"),
      path: "/admin/dashboard",
      icon: faChartLine,
    },
    {
      title: t("sidebar.users"),
      path: "/admin/users",
      icon: faUsers,
    },
    {
      title: t("sidebar.providers"),
      path: "/admin/provider",
      icon: faUserGear,
    },
    {
      title: "Messages",
      path: "/admin/messages",
      icon: faEnvelope,
    },
    {
      title: t("sidebar.bookings"),
      path: "/admin/booking",
      icon: faCalendarCheck,
    },
    {
      title: t("sidebar.reports"),
      path: "/admin/reports",
      icon: faClipboardList,
    },
    {
      title: t("sidebar.financial_follow"),
      path: "/admin/financial_Follow",
      icon: faMoneyBillTrendUp,
    },
    {
      title: t("sidebar.comments"),
      path: "/admin/comments",
      icon: faComments,
    },
    {
      title: t("sidebar.home"),
      path: "/admin/Home",
      icon: faHouse,
    },
    {
      title: t("sidebar.logout"),
      path: "#",
      icon: faRightFromBracket,
      isLogout: true,
    },
  ];

  return (
    <>
      <aside
        className={`sidebar ${isOpen ? "open" : "closed"} ${
          isAr ? "rtl" : "ltr"
        }`}
      >
        <div className="sidebar-links">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.isLogout ? "#" : link.path}
              className={
                location.pathname === link.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
              onClick={(e) => {
                if (link.isLogout) {
                  e.preventDefault();
                  setOpenLogoutModal(true);
                }
              }}
            >
              <FontAwesomeIcon icon={link.icon} className="sidebar-icon" />

              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </aside>

      <Logout
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={handleActualLogout}
        isAr={isAr}
      />
    </>
  );
}
