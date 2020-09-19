import React, { useMemo } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import * as topojson from 'topojson';

const useProjection = ({ width, height, zoom, usTopoJSON, USStateNames }) => {
  return useMemo(() => {
    // geographical projections map a sphere to a flat surface
    // geoAlbersUsa maps specifically USA
    const projection = d3
      .geoAlbersUsa()
      .scale(1280)
      // move to center of drawing area
      .translate([width / 2, height / 2])
      // play around with scale to get nice result
      .scale(width * 1.3);

    // geoPath takes a projection and generates the d attribute of <path> element in SVG
    const geoPath = d3.geoPath().projection(projection);

    if (zoom && usTopoJSON) {
      const us = usTopoJSON,
        // get list of all US state features in geo data (flats - geo space)
        USStatePaths = topojson.feature(us, us.objects.states).features,
        // find the one we're zooming on and get the id
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

    return geoPath;
  }, [width, height, zoom, usTopoJSON, USStateNames]);
};

export default useProjection;
