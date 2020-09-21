import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Ball from './Ball';

const BouncingBall = ({ max_h }) => {
  // use state for y position
  // use state for vY vertical velocity
  const [ball, setBall] = useState({
    y: 0,
    vy: 0.1
  });

  const gameLoop = () => {
    setBall((ball) => {
      let { y, vy } = ball;

      if (y > max_h) {
        vy = -vy;
      }

      return {
        y: y + vy,
        vy: vy + 0.1
      };
    });
  };

  // use an effect to start/stop a timer
  useEffect(() => {
    // write game loop
    const t = d3.timer(gameLoop);
    // component unmounts
    return () => t.stop();
  }, []);

  return (
    <g transform='translate(0, 20)'>
      <Ball x={40} y={ball.y} />
    </g>
  );
};

export default BouncingBall;
