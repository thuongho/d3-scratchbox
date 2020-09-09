import React from 'react';
import * as d3 from 'd3';
// Topojson-client translate geo datasets into GeoJSON
import * as topojson from 'topojson-client';
import _ from 'lodash';

const CountyMap = ({
  usTopoJSON,
  USStateNames,
  values,
  x,
  y,
  width,
  height,
  zoom
}) => {

  // geographical projections map a sphere to a flat surface
  // geoAlbersUsa maps specifically USA
  const projection = d3.geoAlbersUsa().scale(1280);
  // geoPath takes a projection and generates the d attribute of <path> elements in SVG
  const geoPath = d3.geoPath().projection(projection);
  // scaleQuantize is a D3 scale
  // this one splits a domain into 9 quantiles and assigns them specific values from the range
  // use to pick color from an array
  const quantize = d3.scaleQuantize().range(d3.range(9));

  // TopoJSON is a geographical data format based on JSON
  if (!usTopoJSON) return null;
  return ()
};

export default CountyMap;
