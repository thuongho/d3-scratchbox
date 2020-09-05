import React, { Component } from 'react';
import * as d3 from 'd3';

import Axis from './Axis';

class Scatterplot extends Component {
  xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width]);

  yScale = d3.scaleLinear().domain([0, 1]).range([this.props.height, 0]);

  render() {
    const { x, y, height, data } = this.props;

    return (
      <g transform={`translate(${x}, ${y})`}>
        {data.map(([x, y]) => {
          return (
            <circle
              key={`${x}-${y}`}
              cx={this.xScale(x)}
              cy={this.yScale(y)}
              r='5'
            />
          );
        })}
        <Axis x={0} y={0} type='Left' scale={this.yScale} label='Y' />
        <Axis x={0} y={height} type='Bottom' scale={this.xScale} label='X' />
      </g>
    );
  }
}

export default Scatterplot;
