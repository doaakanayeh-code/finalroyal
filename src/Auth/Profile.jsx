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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";

export default function PerfectProfile() {
  const [tabValue, setTabValue] = useState(0);

  const quickActions = [
    {
      title: "My Tickets",
      count: "05",
      label: "Tickets",
      color: "#ffe0b2",
      icon: "🎫",
    },
    {
      title: "Create Event",
      count: "Share",
      label: "your event",
      color: "#e1bee7",
      icon: "📅",
    },
    {
      title: "Saved Events",
      count: "12",
      label: "Saved",
      color: "#c8e6c9",
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
            backgroundImage:
              'url("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f")',
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
                border: "5px solid #32CD32",
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                right: 5,
                bottom: 5,
                bgcolor: "#00695c",
                color: "white",
                width: 35,
                height: 35,

                "&:hover": {
                  bgcolor: "#004d40",
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
              bgcolor: "#00695c",
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
          <Box
            key={label}
            sx={{
              textAlign: "center",
              minWidth: "80px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#222",
              }}
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

      {/* EVENT CARDS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          mb: 5,
          px: 2,
        }}
      >
        {[1, 2].map((i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              width: 260,
              borderRadius: "24px",
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                height: 180,
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Box sx={{ p: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                25 MAY
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  mt: 0.5,
                }}
              >
                Summer Festival
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Alexandria
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* QUICK ACTIONS */}
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
          <Paper
            key={index}
            elevation={0}
            sx={{
              width: 180,
              p: 2.5,
              bgcolor: item.color,
              borderRadius: "24px",
              height: "150px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Typography>

            <Box>
              <Typography variant="h4">{item.icon}</Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                }}
              >
                {item.count}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                }}
              >
                {item.label}
              </Typography>
            </Box>

            <ArrowForwardIcon
              sx={{
                position: "absolute",
                right: 15,
                bottom: 15,
                opacity: 0.5,
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
