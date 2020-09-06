import React, { useState } from 'react';
import * as d3 from 'd3';
import Scatterplot from './Scatterplot';
import Datapoint from './Datapoint';
import './App.css';

const App = () => {
  const [dimensions, setDimension] = useState({ width: 300, height: 200 });
  // add data so that it doesn't render with data change
  const [data, setData] = useState(
    d3.range(100).map((_) => [Math.random(), Math.random()])
  );

  const onClick = () => {
    setDimension({
      width: dimensions.width * 0.8,
      height: dimensions.height * 0.8
    });
  };

  return (
    <div className='App'>
      <svg width='800' height='800' onClick={onClick}>
        <Scatterplot
          x={50}
          y={50}
          height={dimensions.height}
          width={dimensions.width}
          data={data}
          datapoint={({ x, y }) => <Datapoint key={`${x}-${y}`} x={x} y={y} />}
        />
        <Scatterplot
          x={50}
          y={330}
          height={dimensions.height}
          width={dimensions.width}
          data={data}
          datapoint={({ x, y }) => (
            <Datapoint key={`${x}-${y}`} x={x} y={y} r={10} />
          )}
        />
      </svg>
    </div>
  );
};

export default App;
