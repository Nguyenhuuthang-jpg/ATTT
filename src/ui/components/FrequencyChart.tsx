import React, { useState } from 'react';
import { ENGLISH_FREQ } from '../../data/englishFreq';

interface CipherFreq {
  letter: string;
  count: number;
  percent: number;
}

interface FrequencyChartProps {
  cipherFreq: CipherFreq[];
  title?: string;
}

export const FrequencyChart: React.FC<FrequencyChartProps> = ({ cipherFreq, title }) => {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  const maxPercent = Math.max(
    ...cipherFreq.map(f => f.percent),
    ...Object.values(ENGLISH_FREQ)
  );

  const chartHeight = 200;
  const barWidth = 10;
  const gap = 2;
  const groupWidth = barWidth * 2 + gap * 2;
  const totalWidth = groupWidth * 26 + 40; // 40 for margins

  return (
    <div className="frequency-chart-container" id="frequency-chart" aria-label="Biểu đồ tần suất">
      {title && <h3 id="freq-chart-title">{title}</h3>}
      
      <svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${totalWidth} ${chartHeight + 40}`}>
        <g transform="translate(20, 10)">
          {cipherFreq.map((item, index) => {
            const x = index * groupWidth;
            const engPercent = (ENGLISH_FREQ as Record<string, number>)[item.letter] || 0;
            const cipherH = (item.percent / maxPercent) * chartHeight;
            const engH = (engPercent / maxPercent) * chartHeight;

            return (
              <g 
                key={item.letter} 
                transform={`translate(${x}, 0)`}
                onMouseEnter={() => setHoveredLetter(item.letter)}
                onMouseLeave={() => setHoveredLetter(null)}
              >
                {/* English Bar */}
                <rect
                  x={0}
                  y={chartHeight - engH}
                  width={barWidth}
                  height={engH}
                  fill="#22e6c8"
                  aria-label={`Tần suất chuẩn của ${item.letter}: ${engPercent.toFixed(2)}%`}
                />
                {/* Cipher Bar */}
                <rect
                  x={barWidth + gap}
                  y={chartHeight - cipherH}
                  width={barWidth}
                  height={cipherH}
                  fill="#8b7bff"
                  aria-label={`Tần suất mã của ${item.letter}: ${item.percent.toFixed(2)}%`}
                />
                <text
                  x={barWidth + gap / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fill="#eaf2fb"
                  fontSize="12"
                >
                  {item.letter}
                </text>
                
                {hoveredLetter === item.letter && (
                  <g transform={`translate(${barWidth}, -10)`}>
                    <rect x="-40" y="-30" width="80" height="40" fill="rgba(255,255,255,0.9)" rx="4" />
                    <text x="0" y="-15" textAnchor="middle" fill="#000" fontSize="10">
                      Chuẩn: {engPercent.toFixed(1)}%
                    </text>
                    <text x="0" y="0" textAnchor="middle" fill="#000" fontSize="10">
                      Mã: {item.percent.toFixed(1)}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      
      <div className="chart-legend" aria-hidden="true">
        <span style={{ color: '#22e6c8' }}>■ Tiếng Anh (English)</span>
        <span style={{ color: '#8b7bff', marginLeft: '16px' }}>■ Văn bản mã (Cipher text)</span>
      </div>

      <table className="sr-only" aria-label="Bảng dữ liệu tần suất">
        <thead>
          <tr>
            <th>Chữ cái (Letter)</th>
            <th>Tần suất chuẩn (%)</th>
            <th>Tần suất mã (%)</th>
          </tr>
        </thead>
        <tbody>
          {cipherFreq.map(item => (
            <tr key={item.letter}>
              <td>{item.letter}</td>
              <td>{((ENGLISH_FREQ as Record<string, number>)[item.letter] || 0).toFixed(2)}</td>
              <td>{item.percent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
