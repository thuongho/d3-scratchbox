import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Scatterplot from './components/Scatterplot';
import Datapoint from './components/Datapoint';

import './App.css';

function App() {
  const [dataset, setDataset] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: 500,
    height: 500
  });

  const { width, height } = dimensions;

  useEffect(() => {
    // get some datapoints
    const data = d3.range(100).map((_) => [Math.random(), Math.random()]);
    setDataset(data);
  }, []);

  return (
    <div className='App'>
      <svg width='1000' height='600'>
        <Scatterplot
          x={40}
          y={40}
          width={width}
          height={height}
          data={dataset}
          datapoint={({ x, y }) => (
            <Datapoint key={`dp-${x}-${y}`} x={x} y={y} />
          )}
        />
      </svg>
    </div>
  );
}

export default App;
