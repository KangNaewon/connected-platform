import { AreaChart as RechartsAreaChart, Area, CartesianGrid, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import css from './ChartContainer.module.less';

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#387908",
];

const AreaChart = ({ label, data }) => {
  const keys = Object.keys(data[0]);

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer>
        <RechartsAreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <Tooltip />
          {keys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
              stackId="1"
              name={key}
            />
          ))}
          <text
            x="50%"
            y="95%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '1rem', fontWeight: 'bold' }}
          >
            {label}
          </text>
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
