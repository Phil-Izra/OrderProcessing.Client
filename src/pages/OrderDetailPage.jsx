import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import { getOrderById } from "../api/orderApi";

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) return null;

  return (
    <Box>
      <Button onClick={() => navigate("/orders")} sx={{ mb: 2 }}>
        ← Back to Orders
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Order Detail
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><strong>Order ID:</strong> {order.id}</Typography>
        <Typography><strong>Customer ID:</strong> {order.customerId}</Typography>
        <Typography><strong>Total Amount:</strong> R {order.totalAmount?.toFixed(2)}</Typography>
        <Typography><strong>Discount Applied:</strong> R {order.discountAmount?.toFixed(2)}</Typography>
        <Typography><strong>Final Amount:</strong> R {order.finalAmount?.toFixed(2)}</Typography>
      </Paper>

      <Typography variant="h6" fontWeight={700} mb={2}>Items</Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Product</TableCell>
              <TableCell sx={{ color: "white" }}>Qty</TableCell>
              <TableCell sx={{ color: "white" }}>Unit Price</TableCell>
              <TableCell sx={{ color: "white" }}>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items?.map((item, i) => (
              <TableRow key={i} hover>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>R {item.unitPrice?.toFixed(2)}</TableCell>
                <TableCell>R {(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
