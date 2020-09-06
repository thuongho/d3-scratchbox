import React, { PureComponent } from 'react';
import * as d3 from 'd3';

import Axis from './Axis';

// PureComponent so that React is smarter about calling getDerivedStateFromProps
class Scatterplot extends PureComponent {
  state = {
    xScale: d3.scaleLinear().domain([0, 1]).range([0, this.props.width]),
    yScale: d3.scaleLinear().domain([0, 1]).range([this.props.height, 0])
  };

  // this lifecycle method gets called whenever React renders Scatterplot
  static getDerivedStateFromProps(props, state) {
    let { xScale, yScale } = state;

    xScale.range([0, props.width]);
    yScale.range([0, props.height]);

    return { ...state, xScale, yScale };
  }

  render() {
    const { x, y, height, data, datapoint } = this.props;
    const { xScale, yScale } = this.state;

    return (
      <g transform={`translate(${x}, ${y})`}>
        {data.map(([x, y]) => datapoint({ x: xScale(x), y: yScale(y) }))}
        <Axis x={0} y={0} type='Left' scale={yScale} label='Y' />
        <Axis x={0} y={height} type='Bottom' scale={xScale} label='X' />
      </g>
    );
  }
}

export default Scatterplot;
