import { Card, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function StatCard({
  title,
  value,
  icon,
  color = "#C98994",
  active = false,
  onClick,
}) {
  return (
    <Card
      elevation={0}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      sx={{
        p: 3,
        borderRadius: "22px",
        border: active ? `2px solid ${color}` : "1px solid #ECECEC",
        backgroundColor: active ? alpha(color, 0.08) : "#fff",
        boxShadow: active
          ? `0 10px 25px ${alpha(color, 0.25)}`
          : "0 8px 20px rgba(0,0,0,.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: ".25s",
        minHeight: 130,
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 12px 30px ${alpha(color, 0.25)}`,
        },
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "#8B8B8B",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 38,
            fontWeight: 700,
            color: active ? color : "#444",
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: alpha(color, active ? 0.25 : 0.15),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          "& svg": {
            color: color,
            fontSize: 30,
          },
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
