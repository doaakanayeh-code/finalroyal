import React, { useMemo, useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import VerifyEmail from "./Auth/VerifyEmail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./Component/HomePage";
import HeroSection from "./Component/HeroSection";
import Onboarding from "./Onboarding";
import AIAssistant from "./Component/AIAssistant";
import MainComponent from "./Component/MainComponent";
import Contactas from "./Component/Contactas";
import AddServices from "./Allcomponent/AddServices";

// Admin

import AdminProtectedRoute from "./Admin/AdminProtectedRoute";
import Users from "./Admin/pages/dashboard/Users";
import Providers from "./Admin/pages/dashboard/Providers";
import Messages from "./Admin/pages/dashboard/Messages";
import Dashboard from "./Admin/Dashboard";
import DashboardLayout from "./Admin/DashboardLayout";
import "react-toastify/dist/ReactToastify.css";
// import Financial_Follow from "./Admin/Financial_Follow";
// import Reports from "./Admin/Reports";
// import Booking from "./Admin/Booking";
// import Comments from "./Admin/Comments";

import SendNotification from "./Notification/SendNotification";
import Comment from "./Admin/Comment";

import Home from "./Admin/Home";
import LoginPage from "./Admin/Login";
import ServicesDetails from "./Component/ServicesDetails";
import ConfirmBooking from "./Component/ConfirmBooking";
import FinancialContent from "./Admin/FinancialContent";
import { Toaster } from "react-hot-toast";
import Logout from "./Admin/Logout";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Profile from "./Auth/Profile";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Services from "./Component/Services";
import GoogleCallback from "./Auth/GoogleCallback";
import ERR404 from "./Component/404";
import FloralDesigner from "./Component/ServicesDetails/FloralDesigner";
import CakeOption from "./Component/ServicesDetails/CakeOptions";
import GrandHallPage from "./Component/ServicesDetails/GrandHall";
import { ThemeContext } from "./Context/ThemeContext";
import { LanguageContext } from "./Context/LanguageContext";
import Provider from "./Component/Provider";
//import FeaturedWork from "./Component/Ourwork/FeaturedWork";
import ProjectDetails from "./Allcomponent/ProjectDetails";
import AddCakePage from "./Component/AddServices/AddCakePage";
import PlanEvent from "./Component/PlanEvent";

import Cookies from "universal-cookie";
export default function App() {
  const cookies = new Cookies();
  axios.defaults.baseURL = "http://127.0.0.1:8000"; // تأكد من رابط السيرفر الخاص بك
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => {
    const token = cookies.get("Bearer"); // تأكد أن الكوكيز اسمه "Bearer"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  const { mode, setMode } = useContext(ThemeContext);
  const { dir } = useContext(LanguageContext);

  const [identifier, setIdentifier] = useState("");
  const [siteName, setSiteName] = useState("Royal Moment");
  const [siteLogo, setSiteLogo] = useState("/Royal.png");
  const [heroImage, setHeroImage] = useState(null);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/settings")
      .then((response) => {
        if (response.data.success) {
          setSiteName(response.data.settings.site_name || "Royal Moment");
          setSiteLogo(response.data.settings.site_logo || "/Royal.png");
          setHeroImage(response.data.settings.hero_image || null);
        }
      })
      .catch(() => {
        setSiteName("Royal Moment");
        setSiteLogo("/Royal.png");
        setHeroImage(null);
      });
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        direction: dir,
        palette: {
          mode: mode,
          primary: {
            main: "#b97681",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#ffffff",
            paper: mode === "dark" ? "#1e1e1e" : "#F3D5D5",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor:
                  mode === "dark" ? "#121212 !important" : "#ffffff !important",
                margin: 0,
                padding: 0,
              },
            },
          },
        },
      }),
    [mode, dir],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Helmet>
        <title>{siteName}</title>
        <link id="favicon" rel="icon" href={siteLogo} />
      </Helmet>

      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              mode={mode}
              setMode={setMode}
              siteName={siteName}
              siteLogo={siteLogo}
            />
          }
        >
          <Route
            index
            element={
              <>
                <HeroSection heroImage={heroImage} />
                <MainComponent />
              </>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />

          <Route path="register/:type" element={<SignUp />} />

          <Route
            path="forgot-password"
            element={
              <ForgotPassword switchToReset={(val) => setIdentifier(val)} />
            }
          />
          <Route
            path="reset-password"
            element={
              <ResetPassword
                identifier={identifier}
                switchToLogin={() => (window.location.href = "/login")}
              />
            }
          />

          <Route path="logout" element={<Logout />} />
          <Route path="contact" element={<Contactas />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/services" element={<Services />} />
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/ServicesDetails" element={<ServicesDetails />} />
          <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
          <Route path="/AddCakePage" element={<AddCakePage />} />

          <Route path="/AIAssistant" element={<AIAssistant />} />
          <Route path="AddServices" element={<AddServices />} />
          <Route path="/SendNotification" element={<SendNotification />} />
          <Route path="/FloralDesigner" element={<FloralDesigner />} />
          <Route path="/cakeoption" element={<CakeOption />} />
          <Route path="/grandhall" element={<GrandHallPage />} />
          <Route path="/Provider" element={<Provider />} />
          {/* <Route path="/featuredWork" element={<FeaturedWork />} /> */}
          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/plan-event" element={<PlanEvent />} />
          <Route path="verify-email/:id/:hash" element={<VerifyEmail />} />
          <Route path="/*" element={<ERR404 />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/Admin/login" element={<LoginPage />} />

        <Route
          path="/Admin"
          element={
            <AdminProtectedRoute>
              <DashboardLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="provider" element={<Providers />} />
          <Route path="messages" element={<Messages />} />
          <Route path="financial_content" element={<FinancialContent />} />
          <Route path="AIAssistant" element={<AIAssistant />} />
          <Route path="SendNotification" element={<SendNotification />} />
        </Route>
        <Route path="*" element={<ERR404 />} />
      </Routes>
    </ThemeProvider>
  );
}
