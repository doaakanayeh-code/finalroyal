import { Paper, TextField, InputAdornment, Button, Box } from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function UserFilter({ search, setSearch }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "22px",
        border: "1px solid #ECECEC",
        boxShadow: "0 8px 22px rgba(0,0,0,.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, Email or Phone..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#C98994" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 58,
              borderRadius: "18px",
              backgroundColor: "#fff",

              "& fieldset": {
                borderColor: "#E8E8E8",
              },

              "&:hover fieldset": {
                borderColor: "#C98994",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#C98994",
                borderWidth: "2px",
              },
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<SearchRoundedIcon />}
          sx={{
            height: 58,
            px: 4,
            borderRadius: "18px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 700,
            minWidth: 150,
            backgroundColor: "#C98994",
            boxShadow: "0 8px 20px rgba(201,137,148,.25)",

            "&:hover": {
              backgroundColor: "#B87482",
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
}
