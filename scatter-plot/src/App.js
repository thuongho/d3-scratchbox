import React from 'react';
import * as d3 from 'd3';
import Scatterplot from './Scatterplot';
import Datapoint from './Datapoint';
import './App.css';

const data = d3.range(100).map((_) => [Math.random(), Math.random()]);
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 300,
      height: 200
    };
  }

  onClick = () => {
    this.setState({
      width: this.state.width * 0.8,
      height: this.state.height * 0.8
    });
  };

  render() {
    const { width, height } = this.state;
    return (
      <div className='App'>
        <svg width='800' height='800' onClick={this.onClick}>
          <Scatterplot
            x={50}
            y={50}
            height={height}
            width={width}
            data={data}
            datapoint={({ x, y }) => (
              <Datapoint key={`${x}-${y}`} x={x} y={y} />
            )}
          />
          <Scatterplot
            x={50}
            y={330}
            height={height}
            width={width}
            data={data}
            datapoint={({ x, y }) => (
              <Datapoint key={`${x}-${y}`} x={x} y={y} r={10} />
            )}
          />
        </svg>
      </div>
    );
  }
}

export default App;
