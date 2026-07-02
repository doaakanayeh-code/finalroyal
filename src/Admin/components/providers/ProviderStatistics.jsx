import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import StatCard from "../common/StatCard";

export default function ProviderStatistics({
  statistics = {},
  activeFilter,
  onFilterChange,
}) {
  const stats = [
    {
      title: "Total Providers",
      value: statistics.total ?? 0,
      icon: <GroupsRoundedIcon />,
      color: "#C98994",
      filter: "all",
    },
    {
      title: "Active Providers",
      value: statistics.active ?? 0,
      icon: <CheckCircleRoundedIcon />,
      color: "#22C55E",
      filter: "active",
    },
    {
      title: "Blocked Providers",
      value: statistics.blocked ?? 0,
      icon: <BlockRoundedIcon />,
      color: "#EF4444",
      filter: "blocked",
    },
    {
      title: "Deleted Providers",
      value: statistics.deleted ?? 0,
      icon: <DeleteForeverRoundedIcon />,
      color: "#64748B",
      filter: "deleted",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            active={activeFilter === stat.filter}
            onClick={() => onFilterChange(stat.filter)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
