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

export default function GenericTable({ 
  title = "Schedule", 
  columns = [], 
  rows = [], 
  renderCustomCell, 
  statusColors = {} 
}) {

  const getStatusColor = (status) => {
    if (statusColors[status]) return statusColors[status];
    
    switch (status) {
      case "Available":
      case "Active":
      case "Confirmed":
        return "success";
      case "Busy":
      case "Pending":
        return "warning";
      case "Offline":
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

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
          {title}
        </Typography>

        <Chip
          label={`${rows.length} Items`}
          sx={{
            bgcolor: "#ECFDF5",
            color: "#D18C96",
            fontWeight: "bold",
          }}
        />
      </Box>

      <TableContainer sx={{ height: "calc(100vh - 240px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "right"}
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: "#D18C96",
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

          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#F8FAFC" },
                }}
              >
                {columns.map((column) => {
                  if (renderCustomCell && renderCustomCell(column.id, row)) {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {renderCustomCell(column.id, row)}
                      </TableCell>
                    );
                  }

                  if (column.id === "mainName" || column.id === "doctor") {
                    const nameText = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "#D18C96" }}>
                            {nameText ? nameText.charAt(0) : "U"}
                          </Avatar>
                          <Typography sx={{ fontWeight: 600, color: "#0F172A" }}>
                            {nameText}
                          </Typography>
                        </Box>
                      </TableCell>
                    );
                  }

                  if (column.id === "status") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Chip
                          label={row.status}
                          color={getStatusColor(row.status)}
                          sx={{ fontWeight: "bold", borderRadius: "10px" }}
                        />
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={column.id} align={column.align}>
                      <Typography sx={{ color: "#475569", fontWeight: 500 }}>
                        {row[column.id]}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}