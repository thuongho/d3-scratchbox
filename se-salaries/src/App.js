import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import './styles.css';

import Preloader from './components/Preloader';
import { loadAllData } from './DataHandling';
import CountyMap from './components/CountyMap';
import Histogram from './components/Histogram';

function App() {
  // define what's in component state in advance to set expectations
  const [datasets, setDatasets] = useState({
    techSalaries: [],
    medianIncomes: [],
    countyNames: [],
    usTopoJSON: null,
    USStateNames: null
  });
  const {
    techSalaries,
    medianIncomes,
    countyNames,
    usTopoJSON,
    USStateNames
  } = datasets;

  const loadData = async () => {
    try {
      const datasets = await loadAllData();
      setDatasets(datasets);
    } catch (e) {
      console.error('No data available.', e);
    }
  };

  /**
   * Method that takes a county entry and a map of tech salaries
   * it then returns the delta between median household income and a single tech salary
   * @function countyValue
   * @param {Object} county
   * @param {Object} techSalariesMap
   * @returns {Object}
   */
  const countyValue = (county, techSalariesMap) => {
    // medianIncomes to get median household salary
    const medianHousehold = medianIncomes[county.id],
      // techsalariesmap to get salaries for specific census area
      salaries = techSalariesMap[county.name];

    if (!medianHousehold || !salaries) return null;

    const median = d3.median(salaries, (d) => d.base_salary);

    return {
      countyID: county.id,
      value: median - medianHousehold.medianIncome
    };
  };

  useEffect(() => {
    // when component mounts, it will fetch data and we set the state to have it rerender
    loadData();
  }, []);

  // Render

  if (techSalaries.length < 1) {
    return <Preloader />;
  }

  const filteredSalaries = techSalaries,
    filteredSalariesMap = _.groupBy(filteredSalaries, 'countyID'),
    countyValues = countyNames
      .map((county) => countyValue(county, filteredSalariesMap))
      .filter((d) => !_.isNull(d));

  let zoom = null;

  return (
    <div className='App container'>
      <h1>Loaded {techSalaries.length} salaries</h1>
      <svg width='1100' height='500'>
        <CountyMap
          usTopoJSON={usTopoJSON}
          USStateNames={USStateNames}
          values={countyValues}
          x={0}
          y={0}
          width={500}
          height={500}
          zoom={zoom}
        />
        <Histogram
          bins={10}
          width={500}
          height={500}
          x='500'
          y='10'
          data={filteredSalaries}
          axisMargin={83}
          bottomMargin={5}
          value={(d) => d.base_salary}
        />
      </svg>
    </div>
  );
}

export default App;
