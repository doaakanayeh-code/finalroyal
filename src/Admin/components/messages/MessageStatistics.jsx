import Grid from "@mui/material/Grid";

import MailRoundedIcon from "@mui/icons-material/MailRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";

import StatCard from "../common/StatCard";

export default function MessageStatistics({
  statistics = {},
  activeFilter,
  onFilterChange,
}) {
  const stats = [
    {
      title: "Total Messages",
      value: statistics.total ?? 0,
      icon: <MailRoundedIcon />,
      color: "#C98994",
      filter: "all",
    },
    {
      title: "Pending Messages",
      value: statistics.pending ?? 0,
      icon: <HourglassTopRoundedIcon />,
      color: "#F59E0B",
      filter: "pending",
    },
    {
      title: "Replied Messages",
      value: statistics.replied ?? 0,
      icon: <MarkEmailReadRoundedIcon />,
      color: "#22C55E",
      filter: "replied",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} md={4} key={stat.title}>
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            active={activeFilter === stat.filter}
            onClick={() => onFilterChange?.(stat.filter)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
