import React from 'react';
import * as d3 from 'd3';
import Scatterplot from './Scatterplot';
import './App.css';

function App() {
  const data = d3.range(100).map((_) => [Math.random(), Math.random()]);

  return (
    <div className='App'>
      <svg width='800' height='800'>
        <Scatterplot x={50} y={50} height={300} width={300} data={data} />
      </svg>
    </div>
  );
}

export default App;
