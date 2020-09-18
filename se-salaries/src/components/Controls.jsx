import React, { useState, useEffect } from 'react';

import ControlRow from './ControlRow';

/**
 * Builds filter function and filteredBy dictionary based on user choices
 */
const Controls = ({ data, updateDataFilter }) => {
  /**
   * States
   * ----------
   * state defaults to *
   * filter callback returns always true
   */
  const [filteredBy, setFilteredBy] = useState({
    year: '*',
    jobTitle: '*',
    USState: '*'
  });
  const [filterFunctions, setFilter] = useState({
    year: () => true,
    jobTitle: () => true,
    USState: () => true
  });

  /**
   * Method that triggers the callback updateDataFilter from the App to rerender
   * Called by the state's updateFilter on state filter updates
   * It also updates location hash
   * @function reportUpdateUpTheChain
   */
  const reportUpdateUpTheChain = () => {
    window.location.hash = [
      filteredBy.year,
      filteredBy.jobTitle,
      filteredBy.USState
    ].join('-');

    /**
     * Function that takes in a dictionary and returns a new function
     * @function filter
     * @param {Object} d - dictionary of filters
     * @returns {Function} year, USState, jobTitle filter functions
     */
    console.log('filterFunctions', filterFunctions);
    const filter = (d) =>
      filterFunctions.year(d) &&
      filterFunctions.USState(d) &&
      filterFunctions.jobTitle(d);

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
    console.log('year', year);
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
      console.log('yearFilter', yearFilter);
      return { ...filterFunctions, year: yearFilter };
    });
  };

  const updateJobTitleFilter = (jobTitle, reset) => {
    /**
     * A function that checks if the data matches the selected job title
     * @function jobTitleFilter
     * @param {Object} d - data object
     * @return {Boolean} match - return true for elements to keep and false for discarded
     */
    let jobTitleFilter = (d) => d.clean_job_title === jobTitle;

    /**
     * Reset to defaults
     */
    if (reset || !jobTitle) {
      jobTitleFilter = () => true;
      jobTitle = '*';
    }

    /**
     * Update state filters
     */
    setFilteredBy((filteredBy) => {
      return { ...filteredBy, jobTitle };
    });
    setFilter((filterFunctions) => {
      return { ...filterFunctions, jobTitle: jobTitleFilter };
    });
  };

  const updateUSStateFilter = (USState, reset) => {
    /**
     * A function that checks if the data matches the selected US State
     * @function USStateFilter
     * @param {Object} d - data object
     * @return {Boolean} match - return true for elements to keep and false for discarded
     */
    let USStateFilter = (d) => d.clean_job_title === USState;

    /**
     * Reset to defaults
     */
    if (reset || !USState) {
      USStateFilter = () => true;
      USState = '*';
    }

    /**
     * Update state filters
     */
    setFilteredBy((filteredBy) => {
      return { ...filteredBy, USState };
    });
    setFilter((filterFunctions) => {
      return { ...filterFunctions, USState: USStateFilter };
    });
  };

  useEffect(() => {
    // Trigger the updatedDataFilter callback to update the App
    // reportUpdateUpTheChain();
  }, [filteredBy, filterFunctions]);

  /**
   * Build a Set of distinct arrays from the dataset
   * Set for full years, job titles, and US States
   */
  const years = new Set(data.map((d) => d.submit_date.getFullYear())),
    jobTitles = new Set(data.map((d) => d.clean_job_title)),
    USStates = new Set(data.map((d) => d.USState));

  return (
    <div>
      <ControlRow
        data={data}
        toggleNames={Array.from(years.values())}
        picked={filteredBy.year}
        updateDataFilter={updateYearFilter}
      />
      <ControlRow
        data={data}
        toggleNames={Array.from(jobTitles.values())}
        picked={filteredBy.jobTitle}
        updateDataFilter={updateJobTitleFilter}
      />
      <ControlRow
        data={data}
        toggleNames={Array.from(USStates.values())}
        picked={filteredBy.USState}
        updateDataFilter={updateUSStateFilter}
      />
    </div>
  );
};

export default Controls;
