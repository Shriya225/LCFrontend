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
if (!data || data.length === 0) {
    return (
      <div className="text-center py-5">
       
      </div>
    );
  }
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

  // Updated color palette with better contrast
  const COLORS = ["#0d6efd", "#6f42c1", "#20c997", "#fd7e14", "#e83e8c", "#ffc107"];

  return (
    <div className="mt-4 p-3" style={{"border":"2px solid black"}}>
      <h5 className="text-center mb-3" style={{ color: '#2c3e50', fontWeight: '600' }}>
        Students by Department
      </h5>
      <div style={{ width: "100%", height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={window.innerWidth < 768 ? 80 : 120}
              innerRadius={window.innerWidth < 768 ? 40 : 60}
              dataKey="value"
              label={({ name, percent }) => 
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} students`, 'Count']}
            />
            <Legend 
              layout={window.innerWidth < 768 ? "horizontal" : "vertical"} 
              verticalAlign={window.innerWidth < 768 ? "bottom" : "middle"}
              align="center"
              wrapperStyle={{
                paddingTop: window.innerWidth < 768 ? "10px" : "0",
                fontSize: window.innerWidth < 768 ? "12px" : "14px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentChart;