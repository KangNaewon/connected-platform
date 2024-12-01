import kind from '@enact/core/kind';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, XAxis, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908', '#d0ed57', '#8dd1e1'];

const PieChart = kind({
  name: 'PieChart',

  render: ({data}) => {
    const categories = ['user', 'nice', 'system', 'idle', 'iowait', 'irq', 'softirq'];

    const chartData = categories.map((name, index) => ({
      name,
      value: data[index] || 0,
    }));

    const renderLabel = ({name, x, y}) => (
      <text x={x} y={y} textAnchor='middle' dominantBaseline='central' style={{fontSize:'1rem'}}>
        {name}
      </text>
    )

    return (
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="50%"
            outerRadius="60%"
            label={renderLabel}
            minAngle={20}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    )
  }
})

export default PieChart;