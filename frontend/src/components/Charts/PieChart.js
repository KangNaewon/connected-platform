import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import css from './ChartContainer.module.less';
import { useEffect } from 'react';

const COLORS = ['#FFD275', '#7DCE82', '#55A8FD', '#FF7A7A'];

const PieChart = ({
  label,
  input,
  chart_width = '50%',
  chart_height = '90%',
  chart_top = '5%',
  chart_left = '10%',
  outerRadius = "90%",
  innerRadius = "50%",
  cx = "50%",
  cy = "50%",
  text_width = '50%',
  text_height = '90%',
  text_top = '30%',
  text_left = '50%',
  fontSize = "1rem"
}) => {
  const data = Object.entries(input).map(([key, value]) => ({
    name: key,
    value,
  }));

  useEffect(() => {
    const intervalId = setInterval(1000);
    return () => clearInterval(intervalId);
  }, []);

  const usage = label === "cpu"
    ? 100 - input.idle
    : 100 - input.unused;

  return (
    <div className={css.chartContainer} style={{ position: 'relative' }}>
      <div
        style={{
          width: chart_width,
          height: chart_height,
          position: 'absolute',
          top: chart_top,
          left: chart_left,
        }}
      >
        <ResponsiveContainer>
          <RechartsPieChart>
            <Pie
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div style={{
        width: text_width,
        height: text_height,
        position: 'absolute',
        top: text_top,
        left: text_left,
      }}
      >
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize, fontWeight: 'bold' }}
        >
          <div style={{ color: 'black' }}>{label}</div>
          <div style={{ color: '#E74C3C' }}>{`${usage.toFixed(2)}%`}</div>
        </text>
      </div>
    </div>
  );
};

export default PieChart;
