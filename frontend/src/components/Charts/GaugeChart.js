import React from 'react';
import css from './ChartContainer.module.less';

const GaugeChart = ({
  value,
  max,
  chart_width = "50%",
  chart_height = "100%",
  chart_top = "0%",
  chart_left = "5%",
  text_width = "40%",
  text_height = "100%",
  text_top = "30%",
  text_left = "55%",
  fontSize = "1rem"
}) => {
  const percentage = Math.min((value / max) * 100, 100); // 현재 속도를 백분율로 변환
  const angle = (percentage / 100) * 180 - 90; // 0~180도 사이의 각도 계산

  return (
    <div className={css.chartContainer} >
      {/* SVG */}
      <div
        style={{
          width: chart_width,
          height: chart_height,
          position: 'absolute',
          top: chart_top,
          left: chart_left,
        }}
      >
        <svg
          viewBox="-100 -100 200 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* 배경 아크 */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C49F" />
              <stop offset="50%" stopColor="#FFBB28" />
              <stop offset="100%" stopColor="#FF8042" />
            </linearGradient>
          </defs>
          <path
            d="M -100 0 A 80 80 0 0 1 100 0"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="30"
          />
          {/* 움직이는 막대기 */}
          <line
            x1="0"
            y1="0"
            x2={80 * Math.cos((Math.PI / 180) * (angle - 90))}
            y2={80 * Math.sin((Math.PI / 180) * (angle - 90))}
            stroke="#333"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* 텍스트 레이어 */}
      <div
        style={{
          position: 'absolute',
          width: text_width,
          height: text_height,
          top: text_top,
          left: text_left,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: fontSize, fontWeight: 'bold', color: '#000' }}>Network</div>
        <div style={{ fontSize: fontSize, fontWeight: 'bold', color: '#E74C3C' }}>
          {value.toFixed(2)} Mbps
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
