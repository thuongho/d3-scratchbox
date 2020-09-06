import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Text = styled.text`
  fill: black;
  font-family: sans-serif;
  font-size: 10px;
`;

const Axis = ({ x, y, type, scale, label }) => {
  const gRef = useRef();

  const d3Render = () => {
    d3.select(gRef.current).call(d3[`axis${type}`](scale));
  };

  useEffect(() => {
    d3Render();
  }, [scale, type]);

  const labelPos = () => {
    switch (type) {
      case 'Top':
        return { x: scale.range()[1] + 20, y: 0 };
      case 'Right':
        return { x: 20, y: 0 };
      case 'Bottom':
        return { x: scale.range()[1] + 25, y: 25 };
      case 'Left':
        return { x: -25, y: 0 };
      default:
        return;
    }
  };

  return (
    <g ref={gRef} transform={`translate(${x}, ${y})`}>
      <Text {...labelPos()}>{label}</Text>
    </g>
  );
};

export default Axis;
