import React from 'react';
// import only what we need from D3's packages
import { scaleLinear } from 'd3-scale';
import { mean as d3mean, extent as d3extent } from 'd3-array';

import USStatesMap from '../../utils/USStatesMap';

/**
 * Dynamic Title that returns 2 types of titles based on user selection
 * Both year and title selected
 * - In {US state}, the average {job title} paid ${mean}/year in {year}
 * Default
 * - {job title} paid ${mean}/year in {state} in {year}
 */
export const Title = ({ data, filteredBy }) => {
  /**
   * Describes the selected year
   * @function yearsFragment
   * @return {String} - selected year or none
   */
  const yearsFragment = () => {
    const year = filteredBy.year;
    return year === '*' ? '' : `in ${year}`;
  };

  /**
   * Describes the selected US State
   * @function USStateFragment
   * @return {String} - selected US State full name or none
   */
  const USStateFragment = () => {
    const USState = filteredBy.USState;
    return USState === '*' ? '' : USStatesMap[USState.toUpperCase()];
  };

  /**
   * Describes the selected job title
   * @function jobTitleFragment
   * @return {String} - selected job title
   */
  const jobTitleFragment = () => {
    const { jobTitle, year } = filteredBy;
    let title = '';

    if (jobTitle === '*') {
      if (year === '*') {
        title = 'The average H1B in tech pays';
      } else {
        title = 'The average tech H1B paid';
      }
    } else {
      title = `Software ${jobTitle}s on an H1B`;

      if (year === '*') {
        title += ' make';
      } else {
        title += ' made';
      }
    }
    return title;
  };

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
   * Returns a formatted mean of the filteredSalaries based on base_salary
   */
  const mean = format()(d3mean(data, (d) => d.base_salary));

  /**
   * Returns a dynamic title base on the selected options
   * @function renderedTitle
   * @param {String} mean - formatted mean value
   * @returns {String} - a meaningful title
   */
  const renderedTitle = (mean) => {
    let title = '';
    const yearsFragmentVal = yearsFragment();
    const USStateFragmentVal = USStateFragment();
    const jobTitleFragmentVal = jobTitleFragment();
    if (yearsFragmentVal && USStateFragmentVal) {
      title = `
        In ${USStateFragmentVal}, ${jobTitleFragmentVal} $${mean}/year ${yearsFragmentVal}
      `;
    } else {
      title = `
        ${jobTitleFragmentVal} $${mean}/year
        ${USStateFragmentVal ? 'in ' + USStateFragmentVal : ''}
        ${yearsFragmentVal}
      `;
    }
    return title;
  };

  return <h2>{renderedTitle(mean)}</h2>;
};
