import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import css from './ChartContainer.module.less';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart = ({ label, input }) => {
  const data = Object.entries(input).map(([key, value]) => ({
    name: key,
    value,
  }));

  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  const usage = label == "cpu"
    ? 100 - input.idle
    : 100 - input.unused;

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="30%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <text
            x="80%"
            y="40%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '1rem', fontWeight: 'bold' }}
          >
            {label}
          </text>
          <text
            x="80%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '1rem', fontWeight: 'bold' }}
          >
            {`${usage.toFixed(2)}%`}
          </text>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
};

export default PieChart;