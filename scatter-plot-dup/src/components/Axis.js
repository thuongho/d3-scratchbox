import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Axis = ({ x, y, pos, scale }) => {
  const gRef = useRef();

  const d3Render = () => {
    const scaledAxis = d3[`axis${pos}`](scale);
    d3.select(gRef.current).call(scaledAxis);
  };

  useEffect(() => {
    d3Render();
  }, [pos, scale]);

  return <g ref={gRef} transform={`translate(${x}, ${y})`}></g>;
};

export default Axis;
