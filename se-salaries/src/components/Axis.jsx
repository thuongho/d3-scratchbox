import React from 'react';
import { useD3 } from 'd3blackbox';
import * as d3 from 'd3';

const Axis = ({ x, y, scale, type = 'Bottom' }) => {
  // get reference to DOM element so React can interact with it
  const gRef = useD3((anchor) => {
    // axis generator based on type and scale
    const axis = d3[`axis${type}`](scale);

    // select anchor element and call axis generator on it
    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={gRef} />;
};

export default Axis;
