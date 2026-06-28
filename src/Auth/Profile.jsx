import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Tab,
  Tabs,
  Paper,
  IconButton,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // أيقونة إضافية للـ DashboardCard

// استيراد المكونات الخاصة بك (تأكد من صحة مسار الـ import بناءً على مشروعك)
import CraftCard from "../Allcomponent/CraftCard"; 
import DashboardCard from "../Allcomponent/Card";

export default function PerfectProfile() {
  const [tabValue, setTabValue] = useState(0);

  // البيانات الخاصة بـ Quick Actions لتتوافق مع بروبس الـ CraftCard
  const quickActions = [
    {
      title: "My Tickets",
      desc: "05 Tickets available",
      icon: "🎫",
    },
    {
      title: "Create Event",
      desc: "Share your event now",
      icon: "📅",
    },
    {
      title: "Saved Events",
      desc: "12 Saved items",
      icon: "❤️",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f0f7f7",
        minHeight: "100vh",
        pb: 6,
      }}
    >
      {/* HEADER */}
      <Box sx={{ position: "relative", mb: 12 }}>
        {/* COVER IMAGE */}
        <Box
          sx={{
            height: 280,
            background: "#b97681",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* WAVE */}
          <Box
            sx={{
              position: "absolute",
              bottom: -1,
              left: 0,
              width: "100%",
              lineHeight: 0,
            }}
          >
            <svg
              viewBox="0 0 500 80"
              preserveAspectRatio="none"
              style={{
                display: "block",
                width: "100%",
                height: "90px",
              }}
            >
              <path
                d="M0,40 C150,120 350,0 500,40 L500,80 L0,80 Z"
                style={{
                  fill: "#f0f7f7",
                }}
              />
            </svg>
          </Box>
        </Box>

        {/* AVATAR */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-70px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src="https://i.pravatar.cc/300"
              sx={{
                width: 140,
                height: 140,
                border: "5px solid #b97681",
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                right: 5,
                bottom: 5,
                bgcolor: "#b97681",
                color: "white",
                width: 35,
                height: 35,
                "&:hover": {
                  bgcolor: "#b97681",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        {/* EDIT PROFILE BUTTON */}
        <Box
          sx={{
            position: "absolute",
            right: "8%",
            bottom: "-25px",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "40px",
              bgcolor: "#b97681",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Typography fontWeight="bold">Edit profile</Typography>
          </Paper>
        </Box>
      </Box>

      {/* NAME */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#006064",
          }}
        >
          Loly Azoza
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Event enthusiast
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
          }}
        >
          <LocationOnIcon
            sx={{
              color: "#ef5350",
              fontSize: "1rem",
              mr: 0.5,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Alexandria, Egypt
          </Typography>
        </Box>
      </Box>

      {/* STATS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          mb: 5,
          flexWrap: "wrap",
        }}
      >
        {[
          ["12K", "Followers"],
          ["67", "Following"],
          ["37K", "Likes"],
        ].map(([num, label]) => (
          <Box key={label} sx={{ textAlign: "center", minWidth: "80px" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#222" }}
            >
              {num}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* TABS */}
      <Tabs
        value={tabValue}
        onChange={(e, v) => setTabValue(v)}
        centered
        sx={{
          mb: 5,
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: "10px",
            backgroundColor: "#006064",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            minWidth: 120,
          },
        }}
      >
        <Tab label="Upcoming Events" />
        <Tab label="My Events" />
        <Tab label="Favorites" />
      </Tabs>

      {/* EVENT CARDS باستخدام DashboardCard المخصصة لك */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          mb: 8,
          px: 2,
        }}
      >
        {[1, 2].map((i) => (
          <DashboardCard
            key={i}
            title="Summer Festival"
            icon={<CalendarMonthIcon />}
            bg="#e0f2f1"
            color="#004d40"
            sx={{ width: 280 }}
          >
            {/* هنا نضع الـ children (محتوى الكارت الداخلي كالصورة والتفاصيل) */}
            <Box
              sx={{
                height: 140,
                backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "16px",
                mb: 2,
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "#777" }}>
              25 MAY
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Alexandria, Egypt
            </Typography>
          </DashboardCard>
        ))}
      </Box>

      {/* QUICK ACTIONS باستخدام CraftCard المخصصة لك */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {quickActions.map((item, index) => (
          <Box key={index} sx={{ width: 220 }}>
            <CraftCard
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              onClick={() => console.log(`${item.title} clicked`)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}