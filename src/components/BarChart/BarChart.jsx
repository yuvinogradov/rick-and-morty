import React from 'react';
import './BarChart.css';

function BarChart({ data }) {
  const colors = ['#ac92eb', '#4fc1e8', '#a0d568', '#ffce54', '#ed5564'];
  // Width of each bar
  const itemWidth = 60;

  // Distance between each bar
  const itemMargin = 50;

  // Normalize data, add color
  const messagedData = data.map((datum, item) => ({
    ...datum,
    episodes: datum.episodes,
    color: colors[item],
  }));

  const mostEpisode = messagedData.reduce((acc, cur) => {
    const { episodes } = cur;
    return episodes > acc ? episodes : acc;
  }, 0);

  const chartHeight = mostEpisode;

  return (
    <div className="BarChart">
      <div className="ChartArea">
        {messagedData.map((datum) => {
          const itemHeight = datum.episodes;
          return (
            <ChartItem
              width={itemWidth + itemMargin}
              space={itemMargin}
              color={datum.color}
              height={chartHeight}
              value={itemHeight}
              text={datum.name}
              key={datum.name}
            />
          );
        })}
      </div>

      <div className="BarChart-legend">
        <Legend data={messagedData} />
      </div>
    </div>
  );
}

function ChartItem({ width, space, color, height, value, text }) {
  return (
    <div className="ChartItem">
      <svg
        viewBox={`0 0 ${width} ${height * 4 + 20}`}
        width={width}
        stroke="#aaa"
        strokeWidth="1px"
        height={height * 4}
        fill={color}
      >
        <rect
          x={space / 2 + 1}
          y={height * 4 - value * 4 + 1}
          width={width - space}
          height={value * 4}
        />
      </svg>
      <div className="ChartItem-value">{value}</div>
      <div className="ChartItem-text">{text}</div>
    </div>
  );
}
function Legend({ data }) {
  return (
    <div className="Legend">
      {data.map((item) => (
        <div className="Legend-item" key={item.color}>
          <div
            className="Legend-bullet"
            style={{
              backgroundColor: item.color,
            }}
          />
          <span className="Legend-name">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
