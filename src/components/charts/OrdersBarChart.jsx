import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Paper, Typography } from "@mui/material";
export default function OrdersBarChart({ data }) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Orders Last 7 Days
      </Typography>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(val, name) =>
              name === "revenue" ? `R ${val.toFixed(2)}` : val
            }
          />
          <Legend />
          <Bar
            dataKey="count"
            name="Orders"
            fill="#1F4E79"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="revenue"
            name="Revenue (R)"
            fill="#2E75B6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
