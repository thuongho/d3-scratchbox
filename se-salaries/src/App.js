import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import './styles.css';

import { loadAllData } from './utils/DataHandling';
import Preloader from './components/Preloader';
import CountyMap from './components/CountyMap';
import Histogram from './components/Histogram';
import { Title, Description } from './components/Meta';
import MedianLine from './components/MedianLine';
import Controls from './components/Controls';

function App() {
  // define what's in component state in advance to set expectations
  const [datasets, setDatasets] = useState({
    techSalaries: [],
    medianIncomes: [],
    countyNames: [],
    usTopoJSON: null,
    USStateNames: null,
    medianIncomesByUSState: {},
    medianIncomesByCounty: {}
  });

  // Filtering support
  const [salariesFilter, setSalariesFilter] = useState(() => () => true);
  const [filteredBy, setFilteredBy] = useState({
    USState: '*',
    year: '*',
    jobTitle: '*'
  });

  // get states after data is loaded
  const {
    techSalaries,
    medianIncomes,
    countyNames,
    usTopoJSON,
    USStateNames,
    medianIncomesByUSState,
    medianIncomesByCounty
  } = datasets;

  const loadData = async () => {
    try {
      const datasets = await loadAllData();
      setDatasets(datasets);
      // console.log('datasets', datasets);
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
   * @returns {Object} - object with countyID and the diff in median vs household income
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

  /**
   * Method to pass the filter function and filteredBy dictionary
   * from arguments to App state by updating the state
   * Use as callbacks in Controls
   * @function updateDataFilter
   * @param {Object} filter - state salariesFilter
   * @param {Object} filteredBy - state filteredBy
   * @returns null
   */
  const updateDataFilter = (filter, filteredBy) => {
    setFilteredBy(filteredBy);
    setSalariesFilter(() => filter);
  };

  useEffect(() => {
    // when component mounts, it will fetch data and we set the state to have it rerender
    loadData();
  }, []);

  /**
   * Data filtered by filter controls
   */
  const filteredSalaries = techSalaries.filter(salariesFilter),
    filteredSalariesMap = _.groupBy(filteredSalaries, 'countyID'),
    countyValues = countyNames
      .map((county) => countyValue(county, filteredSalariesMap))
      .filter((d) => !_.isNull(d));

  // Render

  if (filteredSalaries.length < 1) {
    return <Preloader />;
  }

  /**
   * @type {?String} zoom - US State selected
   * @type {Number} medianHousehold - median income of US
   */
  let zoom = null,
    medianHousehold = medianIncomesByUSState['US'][0].medianIncome;

  if (filteredBy.USState !== '*') {
    zoom = filteredBy.USState;
    medianHousehold = d3.mean(
      medianIncomesByUSState[zoom],
      (d) => d.medianIncome
    );
  }

  return (
    <div className='App container'>
      <Title data={filteredSalaries} filteredBy={filteredBy} />
      <Description
        data={filteredSalaries}
        allData={techSalaries}
        filteredBy={filteredBy}
        medianIncomesByCounty={medianIncomesByCounty}
      />
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
        // Opaque white background for Histogram to fix zoom
        <rect
          width={500}
          height={500}
          x={500}
          y={10}
          style={{ fill: 'white' }}
        />
        <Histogram
          bins={10}
          width={500}
          height={500}
          x={500}
          y={10}
          data={filteredSalaries}
          axisMargin={83}
          bottomMargin={5}
          value={(d) => d.base_salary}
        />
        <MedianLine
          data={filteredSalaries}
          x={500}
          y={10}
          width={600}
          height={500}
          bottomMargin={5}
          median={medianHousehold}
          value={(d) => d.base_salary}
        />
      </svg>
      <Controls data={techSalaries} updateDataFilter={updateDataFilter} />
    </div>
  );
}

export default App;
