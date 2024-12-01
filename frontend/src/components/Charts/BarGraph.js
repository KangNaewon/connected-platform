import kind from '@enact/core/kind';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908'];

const BarGraph = kind({
  name: 'BarGraph',

  render: ({data}) => {
    return (
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis tick={{ fontSize: 12 }} label={{ value: "Application", position: "insideBottom", fontSize: 14 }} />
          <YAxis tick={{ fontSize: 12 }} label={{ value: "memory size", angle: -90, position: "insideLeft", fontSize: 14 }} />
          <Tooltip />
          <Bar dataKey="mem_size" fill={COLORS[0]} name="Top 5 Processes" />
        </RechartsBarChart>
      </ResponsiveContainer>
    )
  }
})

export default BarGraph;