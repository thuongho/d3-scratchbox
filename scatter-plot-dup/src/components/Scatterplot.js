import React from 'react';
import * as d3 from 'd3';

import Axis from './Axis';

const Scatterplot = ({ x, y, width, height, data, datapoint }) => {
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[0])])
    // .domain([0, 1])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    // .domain([0, 1])
    .range([height, 0]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {data.map(([x, y]) => datapoint({ x: xScale(x), y: yScale(y) }))}
      <Axis x={0} y={0} pos='Left' scale={yScale} />
      <Axis x={0} y={height} pos='Bottom' scale={xScale} />
    </g>
  );
};

export default Scatterplot;
