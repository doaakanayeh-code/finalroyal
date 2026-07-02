import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import UserFilter from "../../components/users/UserFilter";
import UserStatistics from "../../components/users/UserStatistics";
import UsersTable from "../../components/users/UsersTable";
import AddUserDialog from "../../components/users/AddUserDialog";

import {
  getUsers,
  getStatistics,
  filterUsers,
  exportUsers,
} from "../../services/usersService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState({});

  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const [filterType, setFilterType] = useState(null);

  const loadUsers = async () => {
    try {
      let data;

      // إذا في بحث
      if (search.trim() !== "") {
        data = await filterUsers({
          search,
          status:
            filterType === "active"
              ? "active"
              : filterType === "blocked"
                ? "blocked"
                : "",
          deleted: filterType === "deleted",
        });
      }

      // بدون بحث
      else if (filterType === null) {
        data = await getUsers();
      }

      // فلترة بالبطاقات
      else {
        data = await filterUsers({
          search: "",
          status:
            filterType === "active"
              ? "active"
              : filterType === "blocked"
                ? "blocked"
                : "",
          deleted: filterType === "deleted",
        });
      }

      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };
  const loadStatistics = async () => {
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, filterType]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const handleExport = async () => {
    try {
      const response = await exportUsers();

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "Users.xlsx";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setSnackbarError(false);
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
      setSnackbarError(true);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container
      maxWidth="xl"
      onClick={() => {
        if (filterType !== null) {
          setFilterType(null);
        }
      }}
    >
      {" "}
      <Box py={4}>
        {/* Header */}
        <Box mb={2}>
          <Typography
            sx={{
              fontSize: "58px",
              fontWeight: 700,
              color: "#7C5664",
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.3,
            }}
          >
            User Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6E6A6A",
              fontSize: "22px",
              mb: 3,
            }}
          >
            Manage users, monitor their activity and control access easily.
          </Typography>
        </Box>

        {/* Statistics + Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <UserStatistics
              statistics={statistics}
              activeFilter={filterType}
              onFilterChange={setFilterType}
            />{" "}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAdd(true)}
              sx={{
                minWidth: 180,
                height: 54,
                borderRadius: "12px",
                backgroundColor: "#C98994",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "16px",
                boxShadow: "0 8px 20px rgba(201,137,148,.25)",
                "&:hover": {
                  backgroundColor: "#B87482",
                },
              }}
            >
              Add User
            </Button>

            <Button
              variant="contained"
              startIcon={<DownloadRoundedIcon />}
              onClick={handleExport}
              sx={{
                minWidth: 180,
                height: 54,
                borderRadius: "12px",
                backgroundColor: "#2E7D32",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "16px",
                boxShadow: "0 8px 20px rgba(46,125,50,.25)",
                "&:hover": {
                  backgroundColor: "#256628",
                },
              }}
            >
              Export Excel
            </Button>
          </Box>
        </Box>

        {/* Filter */}
        <Box mb={4}>
          <UserFilter search={search} setSearch={setSearch} />
        </Box>

        {/* Users Table */}
        <UsersTable
          users={users}
          deleted={filterType === "deleted"}
          reloadUsers={loadUsers}
          reloadStatistics={loadStatistics}
        />

        {/* Add User */}
        <AddUserDialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          reloadUsers={loadUsers}
          reloadStatistics={loadStatistics}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={snackbarError ? "error" : "success"}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
          >
            {snackbarError
              ? "Failed to export users."
              : "Users exported successfully."}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
