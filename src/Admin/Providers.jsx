import * as React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";


const columns = [
  {
    id: "doctor",
    label: "Doctor",
    minWidth: 250,
  },

  {
    id: "time",
    label: "Time",
    minWidth: 180,
    align: "center",
  },

  {
    id: "specialization",
    label: "Specialization",
    minWidth: 180,
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    minWidth: 140,
    align: "center",
  },
];



function createData(doctor, time, specialization, status) {
  return {
    doctor,
    time,
    specialization,
    status,
  };
}

const rows = [
  createData(
    "Abd Alrahman Al Rasy",
    "08:00 - 20:00",
    "Cardiology",
    "Available"
  ),

  createData(
    "Aya Bashar",
    "08:00 - 20:00",
    "Dentistry",
    "Busy"
  ),

  createData(
    "Ahmad Al Sar",
    "08:00 - 20:00",
    "Neurology",
    "Available"
  ),

  createData(
    "Mohar Al Hasan",
    "08:00 - 20:00",
    "Surgery",
    "Offline"
  ),

  createData(
    "Rama Khaled",
    "08:00 - 20:00",
    "Pediatrics",
    "Available"
  ),

  createData(
    "Sara Ahmad",
    "08:00 - 20:00",
    "Dermatology",
    "Busy"
  ),
];


export default function Providers() {


  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "success";

      case "Busy":
        return "warning";

      case "Offline":
        return "error";

      default:
        return "default";
    }
  };

  ////////////////////////////////////////////////////////
  // Render
  ////////////////////////////////////////////////////////

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",

        height: "100%",

        overflow: "hidden",

        borderRadius: "30px",

        backgroundColor: "#fff",

        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",

        border: "1px solid #F1F5F9",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,

          borderBottom: "1px solid #E2E8F0",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.3rem",

            fontWeight: "bold",

            color: "#0F172A",
          }}
        >
          Doctors Schedule
        </Typography>

        <Chip
          label={`${rows.length} Doctors`}
          sx={{
            bgcolor: "#ECFDF5",

            color: "#10B981",

            fontWeight: "bold",
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        sx={{
          height: "calc(100vh - 240px)",
        }}
      >
        <Table stickyHeader>
          {/* Head */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,

                    backgroundColor: "#14B8A6",

                    color: "white",

                    fontWeight: "bold",

                    fontSize: "0.95rem",

                    borderBottom: "none",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{
                  transition: "0.3s",

                  "&:hover": {
                    backgroundColor: "#F8FAFC",
                  },
                }}
              >
                {/* Doctor */}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#14B8A6",
                      }}
                    >
                      {row.doctor.charAt(0)}
                    </Avatar>

                    <Typography
                      sx={{
                        fontWeight: 600,

                        color: "#0F172A",
                      }}
                    >
                      {row.doctor}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Time */}
                <TableCell align="center">
                  <Typography
                    sx={{
                      color: "#475569",

                      fontWeight: 500,
                    }}
                  >
                    {row.time}
                  </Typography>
                </TableCell>

                {/* Specialization */}
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontWeight: 500,

                      color: "#334155",
                    }}
                  >
                    {row.specialization}
                  </Typography>
                </TableCell>

                {/* Status */}
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    sx={{
                      fontWeight: "bold",

                      borderRadius: "10px",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}