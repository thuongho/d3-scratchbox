import React, { useState } from 'react';
import styled from 'styled-components';

const Circle = styled.circle`
  fill: steelblue;
  fill-opacity: 0.7;
  stroke: steelblue;
  stroke-width: 1.2px;
`;

const Datapoint = ({ x, y, r }) => {
  const [radius, setRadius] = useState(r | 3);

  const handleMouseOver = () => {
    setRadius(10);
  };

  const handleMouseOut = () => {
    setRadius(3);
  };

  return (
    <Circle
      cx={x}
      cy={y}
      r={radius}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  );
};

export default Datapoint;
