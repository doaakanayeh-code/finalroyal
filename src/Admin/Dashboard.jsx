import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Container,
  Paper
} from "@mui/material";

// الأيقونات
import GroupsIcon from "@mui/icons-material/Groups";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventIcon from "@mui/icons-material/Event";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function EnhancedBalancedDashboard() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const eventStatsCards = [
    { id: 1, title: t("dashboard.organizers"), value: "24", icon: <GroupsIcon />, color: "#3B82F6", bg: "#EFF6FF" },
    { id: 2, title: t("dashboard.total_attendance"), value: "1,450", icon: <ConfirmationNumberIcon />, color: "#EC4899", bg: "#FDF2F8" },
    { id: 3, title: t("dashboard.events"), value: "12", icon: <EventIcon />, color: "#10B981", bg: "#ECFDF5" },
    { id: 4, title: t("dashboard.halls"), value: "8", icon: <LocationCityIcon />, color: "#8B5CF6", bg: "#F5F3FF" },
    { id: 5, title: t("dashboard.categories"), value: "5", icon: <CategoryIcon />, color: "#F59E0B", bg: "#FFFBEB" },
    { id: 6, title: t("dashboard.sales"), value: "$12.8K", icon: <AccountBalanceWalletIcon />, color: "#14B8A6", bg: "#F0FDFA" },
  ];

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 6, direction: isAr ? 'rtl' : 'ltr' }}>
      <Container maxWidth="lg">
        
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, color: "#0F172A", textAlign: 'center' }}>
          {t("dashboard.royal_stats")}
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
          {eventStatsCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <Box sx={{ 
                  width: 75, height: 75, borderRadius: "20px", 
                  bgcolor: card.bg, color: card.color, 
                  display: "flex", alignItems: "center", justifyContent: "center", mb: 2 
                }}>
                  {React.cloneElement(card.icon, { sx: { fontSize: 38 } })}
                </Box>
                <Typography sx={{ color: "#64748B", fontSize: "1.1rem", fontWeight: 600 }}>{card.title}</Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0F172A" }}>{card.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 5, borderRadius: "35px", height: "100%", boxShadow: "0 15px 50px rgba(0,0,0,0.05)", textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>{t("dashboard.beneficiaries_dist")}</Typography>
              <Box sx={{ 
                width: 240, height: 240, borderRadius: "50%", margin: "0 auto", mb: 4,
                background: "conic-gradient(#3B82F6 0% 40%, #10B981 40% 70%, #F59E0B 70% 100%)",
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Box sx={{ width: '70%', height: '70%', bgcolor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Typography variant="h4" fontWeight="bold">100%</Typography>
                </Box>
              </Box>
              <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
                 <Typography sx={{ color: "#3B82F6", fontWeight: "bold" }}>● {t("dashboard.children")}</Typography>
                 <Typography sx={{ color: "#10B981", fontWeight: "bold" }}>● {t("dashboard.students")}</Typography>
                 <Typography sx={{ color: "#F59E0B", fontWeight: "bold" }}>● {t("dashboard.families")}</Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Paper sx={{ p: 3, borderRadius: "25px", bgcolor: "#00796B", color: "white", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography sx={{ opacity: 0.8 }}>{t("dashboard.total_earnings")}</Typography>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>$45,200</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <TrendingUpIcon fontSize="small" />
                        <Typography variant="body2">+12% {t("dashboard.confirmed")}</Typography>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Paper sx={{ p: 3, borderRadius: "25px", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: "#64748B", fontWeight: "bold", mb: 1 }}>{t("dashboard.booking_status")}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#10B981" }}>85%</Typography>
                    <Box sx={{ width: '100%', height: 6, bgcolor: '#E2E8F0', borderRadius: 10, mt: 1 }}>
                      <Box sx={{ width: '85%', height: '100%', bgcolor: '#10B981', borderRadius: 10 }} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Paper sx={{ p: 4, borderRadius: "30px", flexGrow: 1, bgcolor: "#FDEFF0", display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0F172A", mb: 3 }}>{t("dashboard.growth_analysis")}</Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 2, minHeight: 180 }}>
                  {[40, 70, 45, 90, 65, 100, 80, 55, 85].map((h, i) => (
                    <Box key={i} sx={{ 
                      flex: 1, 
                      height: `${h}%`, 
                      bgcolor: i === 5 ? '#00796B' : '#D08787', 
                      borderRadius: '8px 8px 2px 2px',
                      transition: '0.3s',
                      '&:hover': { opacity: 0.8, transform: 'scaleY(1.05)' }
                    }} />
                  ))}
                </Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, color: "#64748B", fontWeight: 600, fontSize: '0.8rem' }}>
                  <Typography>{t("months.jan")}</Typography>
                  <Typography>{t("months.mar")}</Typography>
                  <Typography>{t("months.may")}</Typography>
                  <Typography>{t("months.jul")}</Typography>
                  <Typography>{t("months.sep")}</Typography>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}