import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import Preloader from './components/Preloader';
import { loadAllData } from './DataHandling';

function App() {
  // define what's in component state in advance to set expectations
  const [techSalaries, setTechSalaries] = useState([]);
  const [medianIncomes, setMedianIncomes] = useState([]);
  const [countyNames, setCountyNames] = useState([]);

  const loadData = async () => {
    try {
      const data = await loadAllData();

      const { techSalaries, medianIncomes, countyNames } = data;

      setTechSalaries(techSalaries);
      setMedianIncomes(medianIncomes);
      setCountyNames(countyNames);
    } catch (e) {
      console.error('No data available.', e);
    }
  };

  useEffect(() => {
    // when component mounts, it will fetch data and we set the state to have it rerender
    loadData();
  }, []);

  if (techSalaries.length < 1) {
    return <Preloader />;
  } else {
    return (
      <div className='App container'>
        <h1>Loaded {techSalaries.length} salaries</h1>
      </div>
    );
  }
}

export default App;
