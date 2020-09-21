import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Axis = ({ x, y, pos, scale }) => {
  const gRef = useRef();

  const d3Render = () => {
    d3.select(gRef.current).call(d3[`axis${pos}`](scale));
  };

  useEffect(() => {
    d3Render();
  }, [pos, scale]);

  return <g ref={gRef} transform={`translate(${x}, ${y})`} />;
};

export default Axis;
