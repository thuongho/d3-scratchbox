import React, { useState } from 'react';
import { render } from 'react-dom';

import BouncingBall from './BouncingBall';
import SwipeBall from './SwipeBall';

import './App.css';

function App() {
  const [ballLeft, setBallLeft] = useState(true);

  const ballJump = () => setBallLeft((ballLeft) => !ballLeft);

  return (
    <div className='App'>
      <svg width='800' height='600' onClick={ballJump}>
        <BouncingBall max_h={600} />
        <SwipeBall x={ballLeft ? 15 : 250} y={ballLeft ? 15 : 250} />
      </svg>
    </div>
  );
}

export default App;
