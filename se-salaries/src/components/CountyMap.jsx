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
  const projection = d3
    .geoAlbersUsa()
    .scale(1280)
    // move to center of drawing area
    .translate([width / 2, height / 2])
    // play around with scale to get nice result
    .scale(width * 1.3);

  // geoPath takes a projection and generates the d attribute of <path> elements in SVG
  const geoPath = d3.geoPath().projection(projection);
  // scaleQuantize is a D3 scale
  // this one splits a domain into 9 quantiles and assigns them specific values from the range
  // use to pick color from an array
  const quantize = d3.scaleQuantize().range(d3.range(9));

  if (zoom && usTopoJSON) {
    const us = usTopoJSON,
      // get list of all US state features in geo data
      USStatePaths = topojson.feature(us, us.objects.states).features,
      // find the one we're zooming on
      id = _.find(USStateNames, { code: zoom }).id;

    // tweak scale to make map bigger (creates zooming effect)
    projection.scale(width * 4.5);

    // use centroid to calculate the zoomed state's center point coords
    const centroid = geoPath.centroid(_.find(USStatePaths, { id })),
      translate = projection.translate();

    // translate projection onto new coords
    // translate helps align the center point of our zoom US state with the center of the drawing
    projection.translate([
      translate[0] - centroid[0] + width / 2,
      translate[1] - centroid[1] + height / 2
    ]);
  }

  if (values) {
    // update quantize scale with new values
    quantize.domain([
      // quantile lets us offset the scale to produce more interesting map
      d3.quantile(values, 0.15, (d) => d.value),
      d3.quantile(values, 0.85, (d) => d.value)
    ]);
  }

  // TopoJSON is a geographical data format based on JSON
  if (!usTopoJSON) return null;
  return;
};

export default CountyMap;
