import * as React from "react";
import { styled } from "@mui/material/styles";
import NotificationBell from "../Notification/NotificationBell";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { Link, useLocation } from "react-router-dom";
import { MenuContext } from "../Context/MenuContext";
import { LanguageContext } from "../Context/LanguageContext"; 
import { ThemeContext } from "../Context/ThemeContext"; 
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCalendarCheck,
  faCrown,
  faGlobe,
  faPlus,
  faHouse,
  faBriefcase,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import "flag-icons/css/flag-icons.min.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "16px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.04)"
      : "#faf7f8",
  transition: "all .25s ease",
  width: "170px",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "#f4eef0",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#999",
  zIndex: 1,
  left: theme.direction === "rtl" ? "unset" : 0,
  right: theme.direction === "rtl" ? 0 : "unset",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1.2, 1.2, 1.2),
    paddingLeft: theme.direction === "rtl" ? "12px" : `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.direction === "rtl" ? `calc(1em + ${theme.spacing(4)})` : "12px",
    width: "100%",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
}));

export default function PrimarySearchAppBar({ isDashboard = false, siteName, siteLogo }) {
  const menu = useContext(MenuContext);
  const { lang, changeLanguage } = useContext(LanguageContext);
  const { mode, toggleTheme } = useContext(ThemeContext); 
  
  const location = useLocation();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "ar" : "en";
    changeLanguage(nextLang);
  };

  const navLinks = [
    { name: t("navbar.home"), path: "/", icon: faHouse },
    { name: t("navbar.services"), path: "/services", icon: faBriefcase },
    { name: t("navbar.about"), path: "/Onboarding", icon: faCircleInfo },
    { name: t("navbar.contact"), path: "/contact", icon: faEnvelope },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          maxWidth: "100%",
          transform: "none",
          margin: "0",
          borderRadius: "0px 0px 24px 24px", 
          border: "none",
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.06)",
          background:
            mode === "dark"
              ? "rgba(17,24,39,0.92)"
              : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(14px)",
          boxShadow:
            mode === "dark"
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 25px rgba(209,140,150,0.08)",
          px: { xs: 2, sm: 5 }, 
          py: 0.5,
          color: "text.primary",
          zIndex: 1400,
        }}
      >
        <Toolbar
          sx={{
            minHeight: "74px !important",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            {isDashboard && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => menu.setIsOpen((prev) => !prev)}
              >
                <MenuIcon />
              </IconButton>
            )}

            {siteLogo ? (
              <Avatar 
                src={siteLogo} 
                alt={siteName} 
               variant="rounded" 
               sx={{ width: 40, height: 40, borderRadius: "8px" }}              />
            ) : (
              <FontAwesomeIcon
                icon={faCrown}
                style={{ fontSize: "1rem", color: "#d18c96" }}
              />
            )}

            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.3rem",
                fontWeight: 600,
                color: mode === "dark" ? "#fff" : "#111",
                letterSpacing: "-1px",
                lineHeight: 1,
              }}
            >
              {siteName || "Royal Moment"}
            </Typography>
          </Box>

          {/* CENTER SECTION */}
          {!isDashboard && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        px: 2.2,
                        py: 1.1,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: active ? 700 : 500,
                        fontSize: "0.95rem",
                        color: active
                          ? "#d18c96"
                          : mode === "dark"
                          ? "rgba(255,255,255,0.72)"
                          : "#555",
                        background: active
                          ? "rgba(209,140,150,0.12)"
                          : "transparent",
                        transition: "all .25s ease",
                        "&:hover": {
                          color: "#d18c96",
                          background: "rgba(209,140,150,0.08)",
                        },
                      }}
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        style={{ fontSize: "0.78rem" }}
                      />
                      {link.name}
                    </Box>
                  </Link>
                );
              })}
            </Box>
          )}

          {/* RIGHT SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            {!isDashboard && (
              <Button
                component={Link}
                to="/register/provider"
                sx={{
                  background:
                    mode === "dark"
                      ? "rgba(17,24,39,0.92)"
                      : "rgba(255,255,255,0.92)",
                  color: mode === "dark" ? "#fff" : "#111",
                  borderRadius: "16px",
                  textTransform: "none",
                  px: 2.5,
                  py: 1.1,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  transition: "all .25s ease",
                  display: "flex",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 25px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{
                    marginRight: lang === "ar" ? "0px" : "8px",
                    marginLeft: lang === "ar" ? "8px" : "0px",
                    fontSize: "0.7rem",
                  }}
                />
                {lang === "ar" ? "انضم كمزود خدمة" : "Become a Provider"}
              </Button>
            )}

            {!isDashboard && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon fontSize="small" />
                </SearchIconWrapper>
                <StyledInputBase placeholder={t("navbar.search")} />
              </Search>
            )}

            <IconButton
              onClick={toggleTheme}
              sx={{
                width: 42,
                height: 42,
                color: mode === "dark" ? "rgba(255,255,255,0.8)" : "#555",
                transition: "all .25s ease",
                "&:hover": {
                  background: "rgba(209,140,150,0.08)",
                  color: "#d18c96",
                },
              }}
            >
              <FontAwesomeIcon
                icon={mode === "dark" ? faSun : faMoon}
                size="sm"
              />
            </IconButton>

            <IconButton
              sx={{
                width: 42,
                height: 42,
                color: mode === "dark" ? "rgba(255,255,255,0.8)" : "#555",
                transition: "all .25s ease",
                "&:hover": {
                  background: "rgba(209,140,150,0.08)",
                  color: "#d18c96",
                },
              }}
            >
              <Badge
                badgeContent={3}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#d18c96",
                    color: "#fff",
                  },
                }}
              >
                <FontAwesomeIcon icon={faCalendarCheck} size="sm" />
              </Badge>
            </IconButton>
            <NotificationBell />

            <IconButton
              onClick={toggleLanguage}
              sx={{
                width: 42,
                height: 42,
                color: mode === "dark" ? "rgba(255,255,255,0.8)" : "#555",
                transition: "all .25s ease",
                "&:hover": {
                  background: "rgba(209,140,150,0.08)",
                  color: "#d18c96",
                },
              }}
            >
              <FontAwesomeIcon icon={faGlobe} size="sm" />
            </IconButton>

            {isDashboard && (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#d18c96",
                  fontWeight: 700,
                }}
              >
                A
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}