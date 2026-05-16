import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
  Typography,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { Link, useLocation } from "react-router-dom";
import { MenuContext } from "../Context/MenuContext";
import { useContext } from "react";
  import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCalendarCheck,
  faCrown,
  faGlobe, // استيراد أيقونة العالم هنا
} from "@fortawesome/free-solid-svg-icons";

import "flag-icons/css/flag-icons.min.css";

// ... (Search Styles تبقى كما هي)
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  border: "1px solid rgba(0,0,0,0.05)",
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.6) },
  width: "220px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#888",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "0.95rem",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export default function PrimarySearchAppBar({ mode, setMode, isDashboard = false }) {
  const menu = useContext(MenuContext);
  const location = useLocation();

  // أضفنا t هنا لترجمة النصوص
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = newLang === 'ar' ? "'Cairo', sans-serif" : "'serif'";
  };

  // الروابط الآن ديناميكية وتتغير مع اللغة
  const navLinks = [
    { name: t('navbar.home'), path: "/" },
    { name: t('navbar.services'), path: "/services" },
    { name: t('navbar.about'), path: "/Onboarding" },
    { name: t('navbar.contact'), path: "/contact" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "background.paper", color: "text.primary", boxShadow: "none", borderBottom: "1px solid rgba(0,0,0,0.08)", zIndex: 1400 }}>
        <Toolbar sx={{ minHeight: "85px !important", px: 4, display: "flex", justifyContent: "space-between" }}>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: "220px" }}>
            {isDashboard && (
              <IconButton edge="start" color="inherit" onClick={() => menu.setIsOpen((prev) => !prev)}>
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FontAwesomeIcon icon={faCrown} style={{ fontSize: "1.3rem" }} />
              <Typography variant="h6" sx={{ fontWeight: "800", fontSize: "1.3rem", fontFamily: "serif", letterSpacing: "0.5px" }}>
                Royal Moment
              </Typography>
            </Box>
            {isDashboard && (
              <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem", ml: 3, color: "#d18c96" }}>
                {t('navbar.dashboard')}
              </Typography>
            )}
          </Box>

          {!isDashboard && (
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 5, "& a": { textDecoration: "none", color: "inherit", fontWeight: "600", fontSize: "1.05rem", position: "relative", pb: "8px", transition: "0.3s", opacity: 0.8, "&.active": { opacity: 1, "&::after": { content: '""', position: "absolute", bottom: 0, left: "10%", width: "80%", height: "3px", backgroundColor: "#d18c96", borderRadius: "10px" } } } }}>
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={location.pathname === link.path ? "active" : ""}>
                  {link.name}
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isDashboard && (
              <Search>
                <SearchIconWrapper><SearchIcon fontSize="small" /></SearchIconWrapper>
                <StyledInputBase placeholder={t('navbar.search')} />
              </Search>
            )}
             <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")} color="inherit">
              <FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} size="sm" />
            </IconButton>

            {isDashboard && (
              <IconButton color="inherit">
                <Badge badgeContent={4} sx={{ "& .MuiBadge-badge": { backgroundColor: "#d18c96", color: "white" } }}><NotificationsNoneIcon /></Badge>
              </IconButton>
            )}

            {!isDashboard && (
              <IconButton color="inherit">
                <Badge badgeContent={3} sx={{ "& .MuiBadge-badge": { backgroundColor: "#d18c96", color: "white" } }}>
                  <FontAwesomeIcon icon={faCalendarCheck} size="sm" />
                </Badge>
              </IconButton>
            )}
            

            <Box onClick={toggleLanguage} sx={{ display: "flex", alignItems: "center", gap: 0.8, cursor: "pointer", ml: 1, px: 1.5, py: 0.5, borderRadius: "8px", transition: "0.3s", "&:hover": { backgroundColor: alpha(mode === "dark" ? "#fff" : "#000", 0.05) } }}>
              <FontAwesomeIcon icon={faGlobe} style={{ fontSize: "1.1rem", color: "#d18c96" }} />
              <Typography sx={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "uppercase", userSelect: "none" }}>
              </Typography>
            </Box>

            {isDashboard && <Avatar sx={{ width: 40, height: 40, bgcolor: "#d18c96", fontWeight: "bold" }}>A</Avatar>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}