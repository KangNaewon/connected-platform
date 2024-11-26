import kind from '@enact/core/kind';
import { LineChart as RechartsLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  grid: "#cccccc",
  cpu: "#8884d8",        
  cpu0: "#82ca9d",       
  cpu1: "#ffc658",       
  cpu2: "#ff7300", 
  cpu3: "#387908", 
}

const LineChart = kind({
  name: 'LineChart',

  render: ({data}) => {
    const dataKeys = ["cpu", "cpu0", "cpu1", "cpu2", "cpu3"];

    return (
      <ResponsiveContainer>
        <RechartsLineChart
          data={data}
          margin={{top: 20, right: 10, left: 10, bottom: 20}}
        >
          <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
          <XAxis tick={{ fontSize: 12 }} label={{ value: "Application", position: "insideBottom", fontSize: 14 }} />
          <YAxis tick={{ fontSize: 12 }} label={{ value: "cpu usage (%)", angle: -90, position: "insideLeft", fontSize: 14 }} />
          <Tooltip />
          <Legend verticalAlign='top' fontSize={12} />

          {dataKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[key] || "#000"}
              name={key}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }
})

export default LineChart;