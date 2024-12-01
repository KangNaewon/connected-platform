import kind from '@enact/core/kind';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  usable: "#82ca9d",
  used: "#8884d8",
  grid: "#ccc",
};

const AreaChart = kind({
  name: 'AreaChart',

  render: ({data}) => {
    const chartData = data.map((usable, index) => ({
      index,
      usable,
      used: 100 - usable
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
          <XAxis tick={{ fontSize: 12 }} label={{ value: "Memory Usage", position: "insideBottom", fontSize: 14 }} />
          <YAxis tick={{ fontSize: 12 }} label={{ value: "Memory (%)", angle: -90, position: "insideLeft", fontSize: 14 }} />
          <Tooltip />
          <Area type="monotone" dataKey="usable" stroke={COLORS.usable} fill={COLORS.usable} name="Usable Memory" />
          <Area type="monotone" dataKey="used" stroke={COLORS.used} fill={COLORS.used} name="Used Memory" />
        </RechartsAreaChart>
      </ResponsiveContainer>
    );
  }
})

export default AreaChart;