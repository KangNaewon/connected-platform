import { LineChart as RechartsLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import css from './ChartContainer.module.less';

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#387908",
];

const LineChart = ({ label, data }) => {
  const keys = Object.keys(data[0]);

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[index % COLORS.length]}
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
          <YAxis />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart;