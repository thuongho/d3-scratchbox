import React from 'react';
import { render } from 'react-dom';

import BouncingBall from './BouncingBall';

import './App.css';

function App() {
  return (
    <div className='App'>
      <svg width='800' height='600'>
        <BouncingBall max_h={600} />
      </svg>
    </div>
  );
}

export default App;
