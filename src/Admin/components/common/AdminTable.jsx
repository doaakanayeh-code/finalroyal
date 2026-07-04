import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
} from "@mui/material";

export default function AdminTable({
  columns,
  rows,
  RowComponent,
  loading = false,
  emptyMessage = "No Data",
  ...rowProps
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "28px",
        overflow: "hidden",
        border: "1px solid #F2F2F2",
      }}
    >
      {loading ? (
        <Box
          sx={{
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#FCECEF" }} />
        </Box>
      ) : rows.length === 0 ? (
        <Box
          sx={{
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#888",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {emptyMessage}
        </Box>
      ) : (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "center"}
                    sx={{
                      background: "#d18c96",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      textAlign: "center",
                      borderBottom: "none",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <RowComponent key={row.id} row={row} {...rowProps} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
