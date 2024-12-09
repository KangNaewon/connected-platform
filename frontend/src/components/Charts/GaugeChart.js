import React from 'react';
import css from './ChartContainer.module.less';

const GaugeChart = ({ value, max }) => {
  const percentage = (value / max) * 100; // 현재 속도를 백분율로 변환
  const angle = (percentage / 100) * 180; // 0~180도 사이의 각도 계산

  return (
    <div className={css.chartContainer} style={{ position: 'relative' }}>
      {/* SVG */}
      <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* 배경 아크 */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C49F" />
            <stop offset="50%" stopColor="#FFBB28" />
            <stop offset="100%" stopColor="#FF8042" />
          </linearGradient>
        </defs>
        <path
          d="M 10 140 A 140 140 0 0 1 290 140"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="20"
        />
        {/* 움직이는 막대기 */}
        <line
          x1="150"
          y1="140"
          x2={150 + 120 * Math.cos((Math.PI / 180) * (angle - 90))}
          y2={140 + 120 * Math.sin((Math.PI / 180) * (angle - 90))}
          stroke="#333"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      {/* 텍스트 레이어 */}
      <div
        style={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000' }}>Network Speed</div>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FF8042' }}>
          {value.toFixed(2)} Mbps
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
