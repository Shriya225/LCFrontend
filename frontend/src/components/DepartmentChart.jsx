import { useGetListQuery } from "../redux/apiSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DepartmentChart = ({ filters }) => {
  
  const { data, isLoading } = useGetListQuery(filters);

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  // Aggregate students per branch
  const counts = {};
  data?.forEach((student) => {
    counts[student.branch] = (counts[student.branch] || 0) + 1;
  });

  // Convert to chart format
  const chartData = Object.entries(counts).map(([branch, count]) => ({
    name: branch,
    value: count,
  }));

  // MIC colors (red, blue, gold, gray)
  const COLORS = ["#0b1e42", "#b40000", "#f5a623", "#888888"];

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <ResponsiveContainer width="60%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
