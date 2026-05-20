import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";
export default function RevenueLineChart({ data }) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Revenue Trend
      </Typography>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `R${v}`} />
          <Tooltip formatter={(v) => `R ${v.toFixed(2)}`} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2E75B6"
            strokeWidth={3}
            dot={{ fill: "#1F4E79", r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
