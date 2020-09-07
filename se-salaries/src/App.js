import React, { useState } from 'react';
import Preloader from './components/Preloader';
// import './App.css';

function App() {
  const [techSalaries, setTechSalaries] = useState([]);

  if (techSalaries.length < 1) {
    return <Preloader />;
  } else {
    return <div className='App'></div>;
  }
}

export default App;
