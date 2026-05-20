import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth/useAuthContext";
import { getDashboardStats } from "../api/orderApi";
import OrdersBarChart from "../components/charts/OrdersBarChart";
import DiscountPieChart from "../components/charts/DiscountPieChart";
import RevenueLineChart from "../components/charts/RevenueLineChart";
function StatCard({ icon, label, value, color }) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, borderRadius: 2, borderLeft: `4px solid ${color}` }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
        <Box>
          <Typography color="text.secondary" variant="body2">
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Auto refresh every 30 seconds
  });
  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          background: "linear-gradient(135deg, #1F4E79 0%, #2E75B6 100%)",
          borderRadius: 3,
          color: "white",
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={1}>
          Order Processing Engine
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85 }} mb={3}>
          Smart discount engine for your e-commerce platform
        </Typography>
        {!user && (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: "white", color: "primary.main" }}
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ borderColor: "white", color: "white" }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Live Statistics
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        stats && (
          <>
            {/* Stat Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                  icon={<ShoppingCartIcon fontSize="inherit" />}
                  label="Total Orders"
                  value={stats.totalOrders}
                  color="#1F4E79"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                  icon={<AttachMoneyIcon fontSize="inherit" />}
                  label="Total Revenue"
                  value={`R ${(stats.totalRevenue ?? 0).toFixed(2)}`}
                  color="#2E7D32"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                  icon={<LocalOfferIcon fontSize="inherit" />}
                  label="Total Discounts Given"
                  value={`R ${(stats.totalDiscount ?? 0).toFixed(2)}`}
                  color="#E65100"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard
                  icon={<TrendingUpIcon fontSize="inherit" />}
                  label="Avg Order Value"
                  value={`R ${(stats.averageOrderValue ?? 0).toFixed(2)}`}
                  color="#6A1B9A"
                />
              </Grid>
            </Grid>
            {/* Charts */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <OrdersBarChart data={stats.ordersPerDay} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DiscountPieChart data={stats.discountBreakdown} />
              </Grid>
              <Grid size={12}>
                <RevenueLineChart data={stats.ordersPerDay} />
              </Grid>
            </Grid>
          </>
        )
      )}
    </Box>
  );
}
