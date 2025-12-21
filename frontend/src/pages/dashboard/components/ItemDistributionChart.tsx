import { Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTheme } from "@mui/material/styles";

interface ItemDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

export const ItemDistributionChart = ({ data }: ItemDistributionChartProps) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Item Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent || 0 * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
