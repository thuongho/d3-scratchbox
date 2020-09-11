import React, { useState } from 'react';

import ControlRow from './ControlRow';

/**
 * Builds filter function and filteredBy dictionary based on user choices
 */
const Controls = ({ data, updateDataFilter }) => {
  /**
   * States
   * ----------
   * year defaults to *
   * always true year filter
   */
  const [filteredBy, setFilteredBy] = useState({ year: '*' });
  const [filterFunctions, setFilter] = useState({ year: () => true });

  /**
   * Method that triggers the callback updateDataFilter from the App to rerender
   * Called by updateYearFilter on state filter updates
   * It also updates location hash
   * @function reportUpdateUpTheChain
   */
  const reportUpdateUpTheChain = () => {
    window.location.hash = [filteredBy.year].join('-');

    /**
     * Function that takes in a dictionary and returns a new function
     * @function filter
     * @param {Object} d - dictionary of filters
     * @returns {Function} year filter function
     */
    const filter = (d) => filterFunctions.year(d);

    updateDataFilter(filter, filteredBy);
  };

  /**
   * Callback function passed into ControlRow
   * When a user picks a year, their action triggers this function
   * @function updateYearFilter
   * @param {String} year
   * @param {Function} reset - reset the filter back to defaults
   */
  const updateYearFilter = (year, reset) => {
    /**
     * A function that checks if the data matches the selected year
     * @function yearFilter
     * @param {Object} d - data object
     * @return {Boolean} match - return true for elements to keep and false for discarded
     */
    let yearFilter = (d) => d.submit_date.getFullYear() === year;

    /**
     * Reset to defaults
     */
    if (reset || !year) {
      yearFilter = () => true;
      year = '*';
    }

    /**
     * Update state filters
     */
    setFilteredBy((filteredBy) => {
      return { ...filteredBy, year };
    });
    setFilter((filterFunctions) => {
      return { ...filterFunctions, year: yearFilter };
    });
  };

  /**
   * Build a Set of distinct full years array from the dataset
   */
  const years = new Set(data.map((d) => d.submit_date.getFullYear()));

  return (
    <div>
      <ControlRow
        data={data}
        toggleNames={Array.from(years.values())}
        picked={filteredBy.year}
        updateDataFilter={updateYearFilter}
      />
    </div>
  );
};

export default Controls;
