import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const CircleContainer = styled.circle`
  fill: red;
  opacity: 0.2;
`;

const Datapoint = ({ x, y, r = 5 }) => {
  const circleRef = useRef();
  const [realX, setRealX] = useState(x);
  const [realY, setRealY] = useState(y);
  const [radius, setRadius] = useState(r);

  const handleMouseOver = () => setRadius(10);
  const handleMouseOut = () => setRadius(3);

  useEffect(() => {
    let el = d3.select(circleRef.current);

    const opacity = Math.random().toFixed(1);

    el.transition()
      .duration(5000)
      .ease(d3.easeBounceIn)
      .style('opacity', opacity)
      .on('end', () => {});
  }, [x, y]);

  return (
    <CircleContainer
      ref={circleRef}
      cx={realX}
      cy={realY}
      r={radius}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  );
};

export default Datapoint;
