import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Text = styled.text`
  fill: black;
  font-family: sans-serif;
  font-size: 10px;
`;

const Axis = ({ x, y, type, scale, label }) => {
  // Get reference to DOM so React can interact with it
  const gRef = useRef();

  /**
   * Render method that gets the referenced DOM and uses d3
   * to render the updated axis position and scale (size)
   * Use this method with React to update axis when component renders
   * @function d3Render
   * @returns null
   */
  const d3Render = () => {
    d3.select(gRef.current).call(d3[`axis${type}`](scale));
  };

  useEffect(() => {
    d3Render();
  }, [scale, type]);

  /**
   * Method that returns the x y coords depending on the type position
   * @function labelPos
   * @return {?Object}
   */
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
