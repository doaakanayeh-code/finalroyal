import { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ProviderFilter from "../../components/providers/ProviderFilter";
import ProviderStatistics from "../../components/providers/ProviderStatistics";
import ProvidersTable from "../../components/providers/ProvidersTable";
import AddProviderDialog from "../../components/providers/AddProviderDialog";

import {
  getProviders,
  getProviderStatistics,
  filterProviders,
} from "../../services/providersService";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [statistics, setStatistics] = useState({});

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);

  const loadProviders = async () => {
    try {
      let data;

      if (search.trim() !== "") {
        data = await filterProviders({
          search,
          status:
            filterType === "active"
              ? "active"
              : filterType === "blocked"
                ? "blocked"
                : "",
          deleted: filterType === "deleted",
        });
      } else if (filterType === null) {
        data = await getProviders();
      } else {
        data = await filterProviders({
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

      setProviders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await getProviderStatistics();
      setStatistics(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProviders();
  }, [search, filterType]);

  useEffect(() => {
    loadStatistics();
  }, []);

  return (
    <Container
      maxWidth="xl"
      onClick={() => {
        if (filterType !== null) {
          setFilterType(null);
        }
      }}
    >
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
            Provider Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6E6A6A",
              fontSize: "22px",
              mb: 3,
            }}
          >
            Manage providers, monitor their activity and control access easily.
          </Typography>
        </Box>

        {/* Statistics + Add */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <ProviderStatistics
              statistics={statistics}
              activeFilter={filterType}
              onFilterChange={setFilterType}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
            sx={{
              minWidth: 180,
              height: 54,
              mt: 1,
              borderRadius: "12px",
              backgroundColor: "#C98994",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "16px",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 20px rgba(201,137,148,.25)",
              "&:hover": {
                backgroundColor: "#B87482",
              },
            }}
          >
            Add Provider
          </Button>
        </Box>

        {/* Search */}
        <Box mb={4}>
          <ProviderFilter search={search} setSearch={setSearch} />
        </Box>

        {/* Table */}
        <ProvidersTable
          providers={providers}
          deleted={filterType === "deleted"}
          reloadProviders={loadProviders}
          reloadStatistics={loadStatistics}
        />

        {/* Add Dialog */}
        <AddProviderDialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          reloadProviders={loadProviders}
          reloadStatistics={loadStatistics}
        />
      </Box>
    </Container>
  );
}
