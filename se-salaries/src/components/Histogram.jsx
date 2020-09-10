import React from 'react';
import * as d3 from 'd3';

const Histogram = ({
  bins,
  width,
  height,
  x,
  y,
  data,
  axisMargin,
  bottomMargin,
  value
}) => {
  // histogram generator
  const histogram = d3
    .histogram()
    // thresholds specifies how many bins we want
    .thresholds(bins)
    // value specifies the value accessor function
    .value(value); // in this case it returns base_salary

  // feed data into histogram generator
  const bars = histogram(data),
    // count how many values in each bin to configure scales
    counts = bars.map((d) => d.length);

  // horizontal scale used to calculate bar sizes
  const widthScale = d3
    .scaleLinear()
    // map min and max of count to range
    .domain([d3.min(counts), d3.max(counts)])
    // range of 0 to width less a margin
    .range([0, width - axisMargin]);

  // vertical scale
  const yScale = d3
    .scaleLinear()
    // get the max of all the bars x coord cuz vertical chart
    // map 0 and max to range
    .domain([0, d3.max(bars, (d) => d.x1)])
    // goes from 0 to max height less margin
    .range([height - y - bottomMargin, 0]);

  return (
    <g className='bars'>
      {bars.map((bar) => (
        <HistogramBar
          percent={(bar.length / data.length) * 100}
          x={axisMargin}
          y={yScale(bar.x1)}
          width={widthScale(bar.length)}
          height={yScale(bar.x0) - yScale(bar.x1)}
          key={`histogram-bar-${bar.x0}`}
        />
      ))}
    </g>
  );
};

export default Histogram;
