import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SwipeBall = ({ x, y }) => {
  const [realX, setRealX] = useState(x);
  const [realY, setRealY] = useState(y);
  const circleRef = useRef();

  useEffect(() => {
    let el = d3.select(circleRef.current);
    // name the transition
    el.transition('box-x')
      .duration(600)
      .ease(d3.easeBounceOut)
      .attr('cx', x)
      .on('end', () => setRealX(x));

    // this makes the transition run parallel
    el.transition('box-y')
      .ease(d3.easeCubicInOut)
      .attr('cy', y)
      .on('end', () => setRealY(y));
  }, [x, y]);

  return <circle ref={circleRef} cx={realX} cy={realY} r='10' />;
};

export default SwipeBall;
