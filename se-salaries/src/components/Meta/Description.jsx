import React from 'react';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import {
  mean as d3mean,
  extent as d3extent,
  deviation as d3deviation
} from 'd3-array';
import S from 'string';

import USStatesMap from '../../utils/USStatesMap';

export const Description = ({
  data,
  allData,
  filteredBy,
  medianIncomesByCounty
}) => {
  /**
   * A number formatter
   * Create a new linear scale that takes in the extent of the data based on base_salary
   * then returns a tick formatter
   * scaleLinear turns 10000 to 10,000
   * @function format
   * @returns {*} - D3 tickFormat
   */
  const format = () => {
    return scaleLinear()
      .domain(d3extent(data, (d) => d.base_salary))
      .tickFormat();
  };

  /**
   * Gets all the data that matches the selected year
   * @function allDataForYear
   * @param {String} year
   * @param {Object[]} [allData] data - default to all data
   * @returns {Object[]} - all the data matching the selected year
   */
  const allDataForYear = (year, data = allData) => {
    return data.filter((d) => d.submit_date.getFullYear() === year);
  };

  /**
   * Gets all the data that matches the selected job title
   * @function allDataForJobTitle
   * @param {String} jobTitle
   * @param {Object[]} [allData] data - default to all data
   * @returns {Object[]} - all the data matching the job title
   */
  const allDataForJobTitle = (jobTitle, data = allData) => {
    return data.filter((d) => d.clean_job_title === jobTitle);
  };

  /**
   * Gets all the data that matches the selected US State
   * @function allDataForUSState
   * @param {String} USState
   * @param {Object[]} [allData] data - default to all data
   * @returns {Object[]} - all the data matching the US State
   */
  const allDataForUSState = (USState, data = allData) => {
    return data.filter((d) => d.USState === USState);
  };

  /**
   * Describes the selected year
   * @function yearsFragment
   * @returns {String} - selected year or none
   */
  const yearsFragment = () => {
    const year = filteredBy.year;
    return year === '*' ? '' : `in ${year}`;
  };

  /**
   * Describes the selected US State
   * @function USStateFragment
   * @returns {String} - selected US State full name or none
   */
  const USStateFragment = () => {
    const USState = filteredBy.USState;
    return USState === '*' ? '' : USStatesMap[USState.toUpperCase()];
  };

  /**
   * Describes against previous year
   * @function previousYearFragment
   * @returns {String} - a string describing the comparison with previous year
   */
  const previousYearFragment = () => {
    const year = filteredBy.year;

    let fragment;

    if (year === '*' || year === 2012) {
      fragment = '';
    } else {
      const { USState, jobTitle } = filteredBy;
      let lastYear = allDataForYear(year - 1);

      if (jobTitle !== '*') {
        lastYear = allDataForJobTitle(jobTitle, lastYear);
      }

      if (USState !== '*') {
        lastYear = allDataForUSState(USState, lastYear);
      }

      if (data.length / lastYear.length > 2) {
        fragment =
          ', ' +
          (data.length / lastYear.length).toFixed() +
          ' times more than the year before';
      } else {
        const percent = ((1 - lastYear.length / data.length) * 100).toFixed();

        fragment =
          ', ' +
          Math.abs(percent) +
          '% ' +
          (percent > 0 ? 'more' : 'less') +
          ' than the year before';
      }
    }

    return fragment;
  };

  /**
   * Describes job title
   * @function jobTitleFragment
   * @returns {String} - a string describing the job title
   */
  const jobTitleFragment = () => {
    const jobTitle = filteredBy.jobTitle;
    let fragment;

    if (jobTitle === '*') {
      fragment = 'H1B work visas';
    } else {
      if (jobTitle === 'other') {
        fragment = 'H1B work visas';
      } else {
        fragment = `H1B work visas for software ${jobTitle}s`;
      }
    }

    return fragment;
  };

  /**
   * Describes the county
   * @function countyFragment
   * @returns {String} - a string describing the job title
   */
  const countyFragment = () => {
    // Group dataset by county
    // Creates a byCounty dictionary based on countyID
    const byCounty = _.groupBy(data, 'countyID'),
      medians = medianIncomesByCounty;

    // Sort counties by income delta
    let ordered = _.sortBy(
      _.keys(byCounty)
        .map((county) => byCounty[county])
        // only counties that are bigger than 1% of the entire dataset
        .filter((d) => d.length / data.length > 0.01),
      // income delta
      (items) => {
        // median tech salary
        const mean = d3mean(items, (d) => d.base_salary);
        // county's median household income
        const { medianIncome } = medians[items[0].countyID][0];
        return mean - medianIncome;
      }
    );

    // top county & median
    let best = ordered[ordered.length - 1],
      countyMedian = medians[best[0].countyID][0].medianIncome;

    // best city
    const byCity = _.groupBy(best, 'city');

    ordered = _.sortBy(
      _.keys(byCity)
        .map((city) => byCity[city])
        .filter((d) => d.length / best.length > 0.01),
      (items) => d3mean(items, (d) => d.base_salary) - countyMedian
    );

    best = ordered[ordered.length - 1];

    const city = S(best[0].city).titleCase().s + `, ${best[0].USstate}`,
      mean = d3mean(best, (d) => d.base_salary);

    const jobFragment = jobTitleFragment()
      .replace('H1B work visas for', '')
      .replace('H1B work visas', '');

    return (
      <span>
        The best city{' '}
        {jobFragment.length ? `for ${jobFragment} on an H1B` : 'for an H1B'}{' '}
        {previousYearFragment() ? 'was' : 'is'} <b>{city}</b> with an average
        salary ${format()(mean - countyMedian)} above the local household
        median. Median household income is a good proxy for cost of living in an
        area. <a href='https://en.wikipedia.org/wiki/Household_income'>[1]</a>.
      </span>
    );
  };

  const mean = d3mean(data, (d) => d.base_salary),
    deviation = d3deviation(data, (d) => d.base_salary);

  const yearsFragmentVal = yearsFragment(),
    USStateFragmentVal = USStateFragment(),
    jobTitleFragmentVal = jobTitleFragment(),
    previousYearFragmentVal = previousYearFragment(),
    countyFragmentVal = countyFragment();

  return (
    <p className='lead'>
      {yearsFragmentVal ? yearsFragmentVal : 'Since 2012'} the{' '}
      {USStateFragmentVal} tech industry{' '}
      {yearsFragmentVal ? 'sponsored' : 'has sponsored'}{' '}
      <b>
        {format()(data.length)} {jobTitleFragmentVal}
      </b>
      {previousYearFragmentVal}. Most of them paid{' '}
      <b>
        ${format()(mean - deviation)} to ${format()(mean + deviation)}
      </b>{' '}
      per year. {countyFragmentVal}
    </p>
  );
};
