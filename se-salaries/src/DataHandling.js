import * as d3 from 'd3';
import _ from 'lodash';

/**
 * Util method to parse each row of the household income data
 * @function cleanIncome
 * @param {Object} d - Data object
 * @returns {Object} - Formatted income data object
 */
const cleanIncome = (d) => ({
  countyName: d['Name'],
  USstate: d['State'],
  medianIncome: Number(d['Median Household Income']),
  lowerBound: Number(d['90% CI Lower Bound']),
  upperBound: Number(d['90% CI Upper Bound'])
});

/**
 * d3 method to parse date in the format mm/dd/YYYY
 * @function dateParse
 * @param null
 * @returns date string in the format mm/dd/YYYY
 */
const dateParse = d3.timeParse('%m/%d/%Y');

/**
 * Util method to clean salary data
 * @function cleanSalary
 * @param {Object} d - Data object
 * @returns {Object} - Formatted salary data object
 */
const cleanSalary = (d) => {
  if (!d['base salary'] || Number(d['base salary']) > 300000) {
    return null;
  }

  return {
    employer: d.employer,
    submit_date: dateParse(d['submit date']),
    start_date: dateParse(d['start date']),
    case_status: d['case status'],
    job_title: d['job title'],
    clean_job_title: d['job title'],
    base_salary: Number(d['base salary']),
    city: d['city'],
    USstate: d['state'],
    county: d['county'],
    countyID: d['countyID']
  };
};

/**
 * Util method to clean US State names
 * @function cleanUSStateName
 * @param {Object} d - Data object
 * @returns {Object} - Formatted state name object
 */
const cleanUSStateName = (d) => ({
  code: d.code,
  id: Number(d.id),
  name: d.name
});

/**
 * Util method to clean county data
 * @function cleanCounty
 * @param {Object} d - Data object
 * @returns {Object} - Formatted county object
 */
const cleanCounty = (d) => ({
  id: Number(d.id),
  name: d.name
});

/**
 * Function to fetch all data using d3 and cleaning up the data
 * @function loadAllData
 * @param null
 * @returns {Promise}
 */
export const loadAllData = async () => {
  const datasets = await Promise.all([
    d3.json('data/us.json'),
    d3.csv('data/us-county-names-normalized.csv', cleanCounty),
    d3.csv('data/county-median-incomes.csv', cleanIncome),
    d3.csv('data/h1bs-2012-2016-shortened.csv', cleanSalary),
    d3.tsv('data/us-state-names.tsv', cleanUSStateName)
  ]);
};
