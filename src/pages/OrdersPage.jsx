import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { getAllOrders } from "../api/orderApi";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Orders</Typography>
        <Button variant="contained" onClick={() => navigate("/create-order")}>
          New Order
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white" }}>Order ID</TableCell>
                <TableCell sx={{ color: "white" }}>Customer ID</TableCell>
                <TableCell sx={{ color: "white" }}>Total</TableCell>
                <TableCell sx={{ color: "white" }}>Discount</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>R {order.totalAmount?.toFixed(2)}</TableCell>
                  <TableCell>R {order.discountAmount?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip label={order.status ?? "Processed"} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/orders/${order.id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
