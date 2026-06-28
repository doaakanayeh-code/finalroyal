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
import GroupsIcon from "@mui/icons-material/Groups";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventIcon from "@mui/icons-material/Event";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// استيراد الكرت المعدل
import DashboardCard from "../Allcomponent/Card"; 

export default function Dashboard() {
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

        {/* كروت الإحصائيات العلوية */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
          {eventStatsCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <DashboardCard 
                title={card.title}
                icon={card.icon}
                color={card.color}
                bg={card.bg}
              >
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0F172A" }}>
                  {card.value}
                </Typography>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>

        {/* القسم السفلي */}
        <Grid container spacing={4}>
          
          {/* كرت توزيع المستفيدين (الدائرة البيانية) */}
          <Grid item xs={12} md={5}>
            <DashboardCard title={t("dashboard.beneficiaries_dist")}>
              <Box sx={{ 
                width: 240, height: 240, borderRadius: "50%", margin: "0 auto", mb: 4, mt: 2,
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
            </DashboardCard>
          </Grid>

          {/* كروت الأرباح وتحليل النمو */}
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

              {/* كرت تحليل النمو - تم إصلاح اختفاء الأعمدة هنا */}
              <DashboardCard 
                title={t("dashboard.growth_analysis")} 
                sx={{ bgcolor: "#FDEFF0", alignItems: "stretch" }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 180, width: '100%', mt: 2 }}>
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
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, color: "#64748B", fontWeight: 600, fontSize: '0.8rem', width: '100%' }}>
                  <Typography>{t("months.jan")}</Typography>
                  <Typography>{t("months.mar")}</Typography>
                  <Typography>{t("months.may")}</Typography>
                  <Typography>{t("months.jul")}</Typography>
                  <Typography>{t("months.sep")}</Typography>
                </Stack>
              </DashboardCard>

            </Stack>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}