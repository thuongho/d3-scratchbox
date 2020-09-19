import React from 'react';

import Toggle from './Toggle';

/**
 * Renders a row of controls and ensures only one at a time is selected
 * @function ControlRow
 * @param {Object} data
 * @param {String[]} toggleNames - set of toggle names
 * @param {String} picked - which entry is picked right now
 * @param {Function} updateDataFilter - callback to update the filter
 * @returns rendered DOM elements
 */
const ControlRow = ({ data, toggleNames, picked, updateDataFilter }) => {
  /**
   * Calls data filter update and passes in the new value
   * Tells if we want to unselect
   * @function makePick
   * @param {String} picked - currently selected entry
   * @param {*} newState
   */
  const makePick = (picked, newState) => {
    updateDataFilter(picked, !newState);
  };
  let capitalize;

  return (
    <div className='row'>
      <div className='col-md-12'>
        {toggleNames.map((name) => (
          <Toggle
            label={capitalize ? name.toUpperCase() : name}
            name={name}
            key={name}
            value={picked === name}
            onClick={makePick}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlRow;
